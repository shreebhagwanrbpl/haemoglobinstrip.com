"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Microscope, TestTube2, Activity, PackageCheck, Wrench, ShieldCheck, Award, ClipboardCheck } from "lucide-react";
import { db, doc, getDoc } from "@/lib/firestore-shim";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

const ICON_MAP = [
  <Wrench key="0" size={30} className="text-sky-600" />,
  <Microscope key="1" size={30} className="text-sky-600" />,
  <Activity key="2" size={30} className="text-sky-600" />,
  <PackageCheck key="3" size={30} className="text-sky-600" />,
  <TestTube2 key="4" size={30} className="text-sky-600" />,
  <ShieldCheck key="5" size={30} className="text-sky-600" />,
];

const DEFAULT_SERVICES = [
  { title: "Clinical Analyzer Calibration & Comprehensive AMC Services", description: "Certified calibration services with documented traceability reports, preventive maintenance visits, and complete AMC solutions tailored for high-throughput diagnostic facilities." },
  { title: "Laboratory Modernization, Expansion & Automation Planning", description: "Upgrading legacy diagnostic departments with automated high-throughput chemistry, hematology, and immunology systems optimized for maximum specimen turnaround speed." },
  { title: "Analyzer Implementation & Continuous Technical Application Support", description: "On-demand application specialist assistance, protocol optimization, new assay configuration, and operator refresher workshops for clinical laboratory teams." },
  { title: "Cold-Chain Reagent Logistics & Standardized Multi-Level Controls", description: "Temperature-monitored distribution of multi-analyte controls, calibrators, and diagnostic kits ensuring maximum stability, shelf-life, and precise diagnostic reproducibility." },
];

export default function ServicesPreview() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            WEBSITE_ID,
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          const d = snap.data();
          if (Array.isArray(d.services) && d.services.length > 0) {
            setServicesData(d.services.slice(0, 4));
          }
        }
      } catch (err) {
        console.error("Services preview fetch error:", err);
      }
    };
    loadServices();
  }, []);

  const displayList = (servicesData.length > 0 ? servicesData : DEFAULT_SERVICES).map((srv, idx) => ({
    icon: ICON_MAP[idx % ICON_MAP.length],
    title: srv.title || srv.name,
    description: srv.desc || srv.description || ""
  }));

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <SectionTitle
          badge="Procurement Assistance"
          title="Support across the full product range"
          description="From one laboratory item to a multi-category purchase list, our enquiry process is structured around what the buyer actually needs."
          center
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">
          {displayList.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.1 }} viewport={{ once: true }}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

