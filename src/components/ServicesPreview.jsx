"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Hemoglobin Test Strips",
      description:
        "Supplying point-of-care Hb testing strips and microcuvettes.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Anemia Screening Kits",
      description:
        "Providing comprehensive anemia testing kits for rural camps and maternal health programs.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Point-of-Care Hb Meters",
      description:
        "Sourcing rapid digital Hb monitors that deliver results in 15 seconds.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Meter Calibration",
      description:
        "Device testing, calibration verification, and controls supply for digital Hb systems.",
    }
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">

        {/* Title */}
        <SectionTitle
          badge="Hb Testing Support Services"
          title="Biomedical Diagnostics, Service & Support"
          description="We connect healthcare organizations with practical diagnostic technologies, laboratory systems, and equipment support."
          center
        />

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {services.map(
            (service, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={
                    service.description
                  }
                />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}