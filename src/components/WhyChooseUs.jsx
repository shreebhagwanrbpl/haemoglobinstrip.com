"use client";

import { motion } from "framer-motion";
import { Boxes, FileCheck2, SearchCheck, Truck } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    { icon: <Boxes size={30} />, title: "Broad Product Coverage", description: "One catalogue can cover routine laboratory supplies, diagnostic products, instruments, monitoring devices and supporting accessories." },
    { icon: <SearchCheck size={30} />, title: "Specification-Led Selection", description: "Compare the practical details that matter before ordering, including application, format, compatibility and operating requirements." },
    { icon: <FileCheck2 size={30} />, title: "Clear Requirement Handling", description: "Share a single item or a multi-product list and receive assistance in organising the requirement for quotation or procurement." },
    { icon: <Truck size={30} />, title: "Supply Coordination", description: "We help coordinate product enquiries for clinics, laboratories, hospitals, institutions and other healthcare buyers." },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionTitle
          badge="A Wider Biomedical Catalogue"
          title="Built around the buyer's complete requirement"
          description="The catalogue is designed for healthcare procurement across multiple product families rather than a single test, device or specialty."
          center
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {features.map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.1 }} viewport={{ once: true }} className="bg-slate-50 p-8 rounded-[28px] border border-slate-100 hover:-translate-y-2 transition-all duration-300 card-shadow">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-7">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
