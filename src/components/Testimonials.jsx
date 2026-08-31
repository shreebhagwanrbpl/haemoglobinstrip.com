"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Community Health Lead",
      review:
        "The Mission Hb meters and strips we ordered have greatly simplified point-of-care anemia screening in our field camps.",
    },
    {
      name: "Amit Sharma",
      role: "Diagnostics Lab Head",
      review:
        "Highly reliable hemoglobin test strips with excellent calibration support. Uptime of our screening devices is near 100%.",
    },
    {
      name: "Neha Verma",
      role: "Blood Bank Supervisor",
      review:
        "Fast delivery of microcuvettes and control solutions. Excellent point-of-care diagnostics partner.",
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        <SectionTitle
          badge="User Feedback"
          title="Trusted by Health Workers"
          description="Used by community health workers, blood donor banks, and diagnostic technicians."
          center
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              viewport={{
                once: true,
              }}
              className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 card-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 text-xl mb-5">
                ★★★★★
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-8 italic">
                "{item.review}"
              </p>

              {/* User */}
              <div className="mt-8">
                <h4 className="font-semibold text-lg">
                  {item.name}
                </h4>

                <p className="text-slate-500">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}