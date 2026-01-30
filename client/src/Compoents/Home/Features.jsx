import React from "react";

const Features = () => {
  const featuresData = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500 size-8 mt-4"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      ),
      title: "Instant Resume Creation",
      description:
        "Generate professional, job-ready resumes in minutes using AI.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500 size-8 mt-4"
        >
          <path d="M7 10v12" />
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
      ),
      title: "ATS-Optimized Templates",
      description:
        "Designed to pass ATS and impress recruiters.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-500 size-8 mt-4"
        >
          <path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <circle cx="17.5" cy="17.5" r="3.5" />
        </svg>
      ),
      title: "Smart Customization",
      description:
        "Tailor content, skills, and layout to match any job role instantly.",
    },
  ];

  return (
    <div id="features">
      <div className="text-center mt-8 ">
        <p className="font-medium text-white px-10 py-1.5 rounded-full bg-orange-600 border border-orange-800 w-max mx-auto">
          Features
        </p>

        <h2 className="text-3xl font-semibold mt-4 text-orange-600">
          Built for Job Seekers
        </h2>

        <p className="mt-2 max-w-xl mx-auto">
          Everything you need to create resumes recruiters actually notice.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 mt-10 px-6 mb-5">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`hover:-translate-y-0.5 transition duration-300 ${
              index === 1
                ? "p-px rounded-[13px] bg-gradient-to-br from-[#9544FF] to-[#223B60]"
                : ""
            }`}
          >
            <div className="p-6 rounded-xl space-y-4 border border-slate-800 bg-slate-950 max-w-80 w-full">
              {feature.icon}
              <h3 className="text-base font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 line-clamp-2 pb-4">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
