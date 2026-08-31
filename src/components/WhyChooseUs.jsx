"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description: "Point-of-care hemoglobin analyzers designed to deliver lab-quality results in less than 15 seconds.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description: "Certified testing strips selected for high batch consistency and reliable anemia screening.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description: "We help healthcare campaigns select the right diagnostic systems with complete compatibility checks.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description: "Responsive client consultation and operational support for hemoglobin testing devices and cuvettes.",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">

        {/* Section Title */}
        <SectionTitle
          badge="What Sets Our Testing Supply Apart"
          title="Precision Hemoglobin Sourcing"
          description="We focus on point-of-care hemoglobin systems, accurate blood testing consumables, and reliable client service."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((item, index) => (
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
              className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:-translate-y-2 transition-all duration-300 card-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-4 text-slate-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-7">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}