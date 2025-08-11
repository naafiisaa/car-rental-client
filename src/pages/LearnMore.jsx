import React from "react";

const LearnMore = () => {
  return (
    <section className="bg-base-100 py-12 px-4 text-base-content">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Learn More About Carvia
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-secondary">
          Established in{" "}
          <span className="font-semibold text-primary">2023</span>, Carvia was born from a vision to simplify and
          elevate car rental experiences across Bangladesh. We’ve been helping individuals and businesses travel smarter
          and smoother ever since.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-base-100 shadow-md p-6 rounded-xl border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">Our Mission</h3>
            <p className="text-secondary">
              To make renting a car as easy as booking a cab—while ensuring reliability, affordability, and comfort.
            </p>
          </div>
          <div className="bg-base-100 shadow-md p-6 rounded-xl border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">Our Growth</h3>
            <p className="text-secondary">
              Since launching, we’ve served thousands of customers and expanded to over 10 major cities.
            </p>
          </div>
          <div className="bg-base-100 shadow-md p-6 rounded-xl border-l-4 border-primary">
            <h3 className="text-xl font-semibold text-primary mb-2">What We Value</h3>
            <p className="text-secondary">
              Honesty, transparency, and top-notch service. We treat every ride as a promise to deliver excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;

