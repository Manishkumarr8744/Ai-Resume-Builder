import React, { Suspense } from "react";
import Banner from "../Compoents/Home/Banner";
import Hero from "../Compoents/Home/Hero";
import Features from "../Compoents/Home/Features";
import Footer from "../Compoents/Home/Footer";

const Testimonials = React.lazy(() => import("../Compoents/Home/Testimonials"));
const CallToAction = React.lazy(() => import("../Compoents/Home/CallToAction"));

const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Features />
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div>Loading Call To Action...</div>}>
        <CallToAction />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
