"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const scenarios = [
    { title: "Laboratory setup", text: "A buyer may need instruments, consumables and supporting accessories together rather than sourcing every item separately." },
    { title: "Routine replenishment", text: "Regular users can enquire about recurring diagnostic supplies, reagents, controls and other frequently used products." },
    { title: "Institutional projects", text: "Hospitals and healthcare programmes can share consolidated lists covering different departments and applications." },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle badge="Who We Serve" title="Designed for different purchasing situations" description="The catalogue supports varied healthcare procurement needs instead of being tied to one product family." center />
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {scenarios.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.1 }} viewport={{ once: true }} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 card-shadow">
              <div className="text-sky-700 font-semibold text-sm uppercase tracking-wider mb-4">Use case 0{index + 1}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-slate-600 leading-8 mt-4">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
