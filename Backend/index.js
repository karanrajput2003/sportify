const express = require("express");
const nodemailer = require('nodemailer');
const cors = require("cors");
require('dotenv').config();
const dbConfig = require("./app/config/db.config");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios'); // Make sure axios is imported

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Event = db.events;
const Booking = db.booking; // Make sure Booking model is imported
const Rank = db.rank;

// Connect to MongoDB
db.mongoose
  .connect(`mongodb+srv://karan_admin:${dbConfig.PASS}@cluster0.oq0g1g1.mongodb.net/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: "user" }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'user' to roles collection");
      });
      new Role({ name: "moderator" }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'moderator' to roles collection");
      });
      new Role({ name: "admin" }).save(err => {
        if (err) console.log("error", err);
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Add event admin
app.post('/api/events', async (req, res) => {
  const { logo, eventCategory, eventTitle, aboutEvent, venue, participationType, noOfParticipation, payment, startDate, endDate, judgeId } = req.body;

  // Basic validation
  if (!logo || !eventCategory || !eventTitle || !aboutEvent || !venue || !participationType || !noOfParticipation || !payment || !startDate || !endDate) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the logo is a valid Base64 string
  if (!/^data:image\/[a-zA-Z]+;base64,/.test(logo)) {
      return res.status(400).json({ error: 'Invalid Base64 image format' });
  }

  try {
      const newEvent = new Event({
          logo,
          eventCategory,
          eventTitle,
          aboutEvent,
          venue,
          participationType,
          noOfParticipation,
          payment,
          startDate,
          endDate,
          judgeId,
      });

      await newEvent.save();
      res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
      console.error('Error adding event:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/events', async (req, res) => {
  try {
      const events = await Event.find();
      res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve events', error: error.message });
  }
});

app.get('/judges', async (req, res) => {
  try {
      // Fetch all users who have the judge role
      const role = await Role.findOne({ name: 'moderator' }); // Find the judge role
      if (!role) return res.status(404).json({ message: 'Judge role not found' });

      const judges = await User.find({ roles: role._id }); // Fetch users with the judge role
      res.status(200).json(judges); // Return the filtered judges
  } catch (error) {
      console.error('Error fetching judges:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching event details' });
  }
});

const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
const MERCHANT_ID = "PGTESTPAYUAT86";
const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";
const redirectUrl = "http://localhost:8080/status";
const successUrl = "http://localhost:5173/user/myevents";
const failureUrl = "http://localhost:5173/payment-failure";

// Create Order Route
app.post('/create-order', async (req, res) => {
  const { name, mobileNumber, amount, userId, eventId } = req.body;
  const orderId = uuidv4();

  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId: name,
    mobileNumber: mobileNumber,
    amount: amount * 100,
    merchantTransactionId: orderId,
    redirectUrl: `${redirectUrl}/?id=${orderId}`,
    redirectMode: 'POST',
    paymentInstrument: { type: 'PAY_PAGE' }
  };

  const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
  const keyIndex = 1;
  const string = payload + '/pg/v1/pay' + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const option = {
    method: 'POST',
    url: MERCHANT_BASE_URL,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    },
    data: { request: payload }
  };

  try {
    const newBooking = new Booking({
      userId,
      eventId,
      name,
      mobileNumber,
      amount,
      merchantTransactionId: orderId,
      status: 'PENDING'
    });

    await newBooking.save(); // Save booking data

    const response = await axios.request(option);
    const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;

    res.status(200).json({ msg: "OK", url: redirectUrl });
  } catch (error) {
    console.error("Error in payment:", error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

// Payment Status Route
app.post('/status', async (req, res) => {
  const merchantTransactionId = req.query.id;

  const keyIndex = 1;
  const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  const option = {
    method: 'GET',
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': MERCHANT_ID
    }
  };

  try {
    const response = await axios.request(option);
    const paymentSuccess = response.data.success;

    const status = paymentSuccess ? 'SUCCESS' : 'FAILED';
    await Booking.findOneAndUpdate(
      { merchantTransactionId },
      { status },
      { new: true }
    );

    if (paymentSuccess) {
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (error) {
    console.error("Error in checking payment status:", error);
    res.status(500).json({ error: 'Failed to retrieve payment status' });
  }
});


app.get('/event/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const bookings = await Booking.find({ userId: userId });
      res.status(200).json(bookings);
  } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.get('/event/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
      const bookings = await Booking.find({ eventId: eventId });
      res.status(200).json(bookings);
  } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings' });
  }
});

app.get('/events/:id', async (req, res) => {
  try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get all bookings for an event by eventId
app.get('/bookings/event/:eventId', async (req, res) => {
  try {
    // Fetch bookings for the specified eventId
    const bookings = await Booking.find({ eventId: req.params.eventId });

    // Extract unique userIds from bookings
    const userIds = bookings.map((booking) => booking.userId);
    const uniqueUserIds = [...new Set(userIds)]; // To remove duplicates if any

    // Fetch user details for each userId
    const users = await User.find({ _id: { $in: uniqueUserIds } });

    // Combine booking data with corresponding user data
    const bookingsWithUserData = bookings.map((booking) => {
      const user = users.find((user) => user._id.toString() === booking.userId.toString());
      return {
        ...booking.toObject(),
        user: user ? user.toObject() : null // Include user data or null if not found
      };
    });

    // Send combined data to frontend
    res.json(bookingsWithUserData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking rank by booking ID
app.put('/bookings/:id/rank', async (req, res) => {
  const { rank } = req.body;
  try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });

      booking.rank = rank;
      await booking.save();
      res.json({ message: 'Rank updated successfully', booking });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

// Function to generate a certificate as a PDF
const generateCertificate = (userId, eventDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = new PassThrough();
        const chunks = [];

        // Collect the PDF data
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));

        doc.pipe(stream);

        // Example content - customize as needed
        doc.fontSize(25).text('Certificate of Participation', { align: 'center' });
        doc.moveDown();
        doc.fontSize(16).text(`This certifies that ${userId} has participated in the event: ${eventDetails.title}`, { align: 'center' });
        doc.moveDown();
        doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

        doc.end();
    });
};


app.put('/ranks', async (req, res) => {
  const { eventId, userRanks } = req.body;

  try {
      const errors = [];
      const promises = userRanks.map(async ({ userId, company, rank1, rank2, rank3 }) => {
          const existingRank = await Rank.findOne({ eventId, userId });
          if (existingRank) {
              errors.push({ userId, message: 'Rank already exists for this user.' });
              return null; // Skip updating this user
          }

          // Update the rank for the user if it does not exist
          const newRank = await Rank.create({
              eventId,
              userId,
              company,
              rank1,
              rank2,
              rank3,
          });

          // Generate the certificate for the user after successfully updating the rank
          const certificate = await generateCertificate(userId, { title: `Event ${eventId}` });
          await sendCertificate(userId, certificate); // Send the certificate to the user

          return newRank;
      });

      await Promise.all(promises);

      if (errors.length > 0) {
          return res.status(400).json({ message: 'Some ranks already exist', errors });
      }

      res.status(200).json({ message: 'Ranks updated successfully' });
  } catch (error) {
      console.error('Error updating ranks:', error);
      res.status(500).json({ message: 'Failed to update ranks', error: error.message });
  }
});


// Function to send the certificate to the user
const sendCertificate = async (userId, certificate) => {
  const userEmail = "karanrajput181212@gmail.com" // Function to get the user's email address from the user ID
  console.log(userEmail)
  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'hackathonbandra@gmail.com', // Your email address
          pass: 'ipgj baqa uxiq lpsq', // Your email password
      },
  });

  const mailOptions = {
      from: 'hackathonbandra@gmail.com',
      to: userEmail,
      subject: 'Your Participation Certificate',
      text: 'Congratulations! Here is your certificate for your participation.',
      attachments: [
          {
              filename: 'certificate.pdf', // Name of the certificate file
              content: certificate, // The generated certificate content (assumed to be a Buffer or base64 string)
              contentType: 'application/pdf',
          },
      ],
  };

  return transporter.sendMail(mailOptions);
};

const getUserEmail = async (userId) => {
  try {
      // Fetch the user by ID
      const user = await User.findById(userId);
      if (!user) {
          throw new Error('User not found');
      }
      return user.email; // Assuming the User model has an 'email' field
  } catch (error) {
      console.error('Error fetching user email:', error);
      throw new Error('Failed to fetch user email');
  }
};


app.get('/leaderboard/', async (req, res) => {
  try {
      // const { eventId } = req.params;
      const ranks = await Rank.find().populate('userId', 'name'); // Assuming user has a 'name' field
      
      const leaderboard = ranks.map(rank => {
          let points = 0;
          if (rank.rank1) points += 5;
          if (rank.rank2) points += 3;
          if (rank.rank3) points += 1;

          return {
              userId: rank.userId._id,
              userName: rank.userId.name,
              company: rank.company,
              points
          };
      });

      // Sort leaderboard by points (highest first)
      leaderboard.sort((a, b) => b.points - a.points);

      res.json(leaderboard);
  } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

app.get('/event/:eventId/registrations', async (req, res) => {
  try {
      const { eventId } = req.params;

      // Find all bookings for the given event and populate user details
      const bookings = await Booking.find({ eventId })
          .populate('userId', 'name company') // Populate userId with name and company fields
          .exec();

      // Extract user information from bookings
      const registrations = bookings.map(booking => ({
          userId: booking.userId._id,
          userName: booking.userId.name,
          company: booking.userId.company,
      }));

      res.json(registrations);
  } catch (error) {
      console.error('Error fetching registrations:', error);
      res.status(500).json({ message: 'Error fetching registrations' });
  }
});

app.get("/api/events/:eventId", async (req, res) => {
  try {
      const { eventId } = req.params;
      const event = await Rank.findById(eventId).populate("participants"); // Assuming participants are referenced in Event model

      // Fetch ranks (assumed that rank data is part of participants)
      const ranks = event.participants.map((participant) => ({
          name: participant.name,
          institute: participant.institute,
          rank: participant.rank,
          points: participant.points,
          certificates: participant.certificates,
      }));

      res.status(200).json({ ranks });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/leaderboard/:eventId', async (req, res) => {
  try {
      const { eventId } = req.params;
      const ranks = await Rank.find({ eventId }).populate('userId', 'name'); // Assuming user has a 'name' field
      
      const leaderboard = ranks.map(rank => {
          let points = 0;
          if (rank.rank1) points += 5;
          if (rank.rank2) points += 3;
          if (rank.rank3) points += 1;

          return {
              userId: rank.userId._id,
              userName: rank.userId.name,
              company: rank.company,
              points
          };
      });

      // Sort leaderboard by points (highest first)
      leaderboard.sort((a, b) => b.points - a.points);

      res.json(leaderboard);
  } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});


const twilio = require('twilio');


const accountSid = 'AC555fe570c323a5ff5304504d1cb3d998'; 
const authToken = '1453c498e5d702fa31f72316d00e2487'; 
const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
    const { to, body } = req.body;

    try {
        const message = await client.messages.create({
            body: body,
            from: '+1 803 489 8548',
            to: to,
        });
        res.status(200).json({ success: true, message: message.sid });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});