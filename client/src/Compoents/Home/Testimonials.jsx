import React, { memo, useMemo } from "react";

// Static testimonial data — use useMemo to avoid recreating the array on every render
const useCardsData = () =>
  useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1603415526960-f7e0328e1b9c?w=200&q=60",
        name: "Rohit Sharma",
        handle: "@rohitdev",
        date: "March 12, 2025",
        text: "The AI resume builder helped me optimize my resume for ATS and get more interview calls.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=60",
        name: "Ananya Verma",
        handle: "@ananyawrites",
        date: "April 5, 2025",
        text: "Clean design, smart suggestions, and very easy to use. Highly recommended!",
      },
      {
        image:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=60",
        name: "Aman Gupta",
        handle: "@amangupta",
        date: "May 18, 2025",
        text: "AI-powered content suggestions made my resume much stronger within minutes.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=60",
        name: "Sneha Patel",
        handle: "@snehacodes",
        date: "June 2, 2025",
        text: "ATS-friendly templates and smooth UI. Loved the overall experience.",
      },
    ],
    []
  );

// Memoized testimonial card to avoid unnecessary re-renders
const TestimonialCard = memo(({ card }) => {
  return (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition w-72 shrink-0 bg-white mb-20">
      <div className="flex gap-3">
        <img className="size-11 rounded-full" src={card.image} alt={card.name} />
        <div>
          <p className="font-medium">{card.name}</p>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm py-4 text-gray-700">{card.text}</p>

      <div className="flex justify-between text-xs text-slate-500">
        <span>Posted on X</span>
        <span>{card.date}</span>
      </div>
    </div>
  );
});

const Testimonials = () => {
  const cardsData = useCardsData(); // useMemo ensures array is stable across renders

  return (
    <>
      <div className="text-center mb-12 mt-30">
        <h1 className="text-4xl font-bold max-w-[740px] mx-auto">
          Trusted by <span className="text-orange-600">30k+</span> job seekers worldwide
        </h1>
      </div>

      <div className="overflow-hidden">
        <div className="flex marquee-inner">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
        <div className="flex marquee-reverse">
          {[...cardsData, ...cardsData].map((card, index) => (
            <TestimonialCard key={index} card={card} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
