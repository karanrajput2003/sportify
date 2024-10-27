import React from 'react';


function CustomerFeedback() {
  return (
    <section className="bg-[#1B1F3B] py-12 md:py-24 lg:py-32"> {/* Updated background color for a different look */}
      <div className="container px-4 md:px-6 grid gap-8 items-center">
        <div className="grid gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-[#FFDD57]">
            What Our Customers Say
          </h2>
          <p className="text-[#7B6E58] text-lg md:text-xl">
            Hear from our guests about their experiences with our sports events. Each story is unique!
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border bg-white text-[#4E3620] p-6 shadow-md hover:shadow-lg transition-shadow duration-200"> {/* Added hover effect */}
            <div className="flex items-start gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                <img className="aspect-square h-full w-full" alt="Avatar" src="/placeholder-user.jpg" />
              </span>
              <div className="space-y-1">
                <div className="font-semibold">Emily Clark</div>
                <div className="text-sm text-[#7B6E58]">Coffee Enthusiast</div>
              </div>
            </div>
            <p className="mt-4 text-[#5D4037]">
              "Attending the coffee tasting was like embarking on a journey. Every sip revealed a new layer of flavor, and I met some amazing fellow coffee lovers!"
            </p>
          </div>
          <div className="rounded-lg border bg-white text-[#4E3620] p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                <img className="aspect-square h-full w-full" alt="Avatar" src="/placeholder-user.jpg" />
              </span>
              <div className="space-y-1">
                <div className="font-semibold">Robert Lee</div>
                <div className="text-sm text-[#7B6E58]">Aspiring Barista</div>
              </div>
            </div>
            <p className="mt-4 text-[#5D4037]">
              "The workshop was enlightening! I learned so much about brewing methods, and the hands-on experience was invaluable."
            </p>
          </div>
          <div className="rounded-lg border bg-white text-[#4E3620] p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start gap-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border">
                <img className="aspect-square h-full w-full" alt="Avatar" src="/placeholder-user.jpg" />
              </span>
              <div className="space-y-1">
                <div className="font-semibold">Sophia Turner</div>
                <div className="text-sm text-[#7B6E58]">Event Organizer</div>
              </div>
            </div>
            <p className="mt-4 text-[#5D4037]">
              "We hosted our team-building event here, and it was fantastic! Everyone left with a deeper appreciation for coffee and a few new friends."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerFeedback;
