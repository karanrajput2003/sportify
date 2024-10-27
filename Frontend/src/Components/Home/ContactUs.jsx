import React from 'react';

function ContactUs() {
  return (
    <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32"> {/* Updated background color for a fresh look */}
      <div className="container px-4 md:px-6 grid gap-8 items-center">
        <div className="grid gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-[#FFDD57]">
            Get in Touch
          </h2>
          <p className="text-[#7B6E58] text-lg md:text-xl">
            Have any questions or want to learn more about our sports events? We’d love to hear from you!
          </p>
        </div>
        <form className="mx-auto max-w-md space-y-4">
          <input
            className="flex h-12 rounded-md border border-[#FFDD57] bg-[#1B1F3B] px-3 py-2 text-sm placeholder-[#8D6E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4C41] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Name"
            required
            type="text"
          />
          <input
            className="flex h-12 rounded-md border border-[#FFDD57] bg-[#1B1F3B] px-3 py-2 text-sm placeholder-[#8D6E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4C41] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Email"
            required
            type="email"
          />
          <textarea
            className="flex min-h-[100px] rounded-md border border-[#FFDD57] w-96 bg-[#1B1F3B] px-3 py-2 text-sm placeholder-[#8D6E63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4C41] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Message"
            rows="5"
            required
          ></textarea>
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4C41] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FFDD57] text-[#000000] hover:bg-[#FFDD57] h-12 px-4 py-2 w-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;
