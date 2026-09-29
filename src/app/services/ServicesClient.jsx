"use client";

import { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Search,
  ListChecks,
  Truck,
  Wrench,
  MessageSquareText,
  Microscope,
  Activity,
  ShieldCheck,
  Award
} from "lucide-react";
import { db, doc, getDoc } from "@/lib/firestore-shim";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

const ICON_MAP = [
  <Wrench key="0" size={30} className="text-sky-600" />,
  <Microscope key="1" size={30} className="text-sky-600" />,
  <Activity key="2" size={30} className="text-sky-600" />,
  <Truck key="3" size={30} className="text-sky-600" />,
  <ShieldCheck key="4" size={30} className="text-sky-600" />,
  <Award key="5" size={30} className="text-sky-600" />,
  <ClipboardCheck key="6" size={30} className="text-sky-600" />,
  <ListChecks key="7" size={30} className="text-sky-600" />,
];

const DEFAULT_SERVICES = [
  { title: "Clinical Analyzer Calibration & Comprehensive AMC Services", description: "Certified calibration services with documented traceability reports, preventive maintenance visits, and complete AMC solutions tailored for high-throughput diagnostic facilities." },
  { title: "Laboratory Modernization, Expansion & Automation Planning", description: "Upgrading legacy diagnostic departments with automated high-throughput chemistry, hematology, and immunology systems optimized for maximum specimen turnaround speed." },
  { title: "Analyzer Implementation & Continuous Technical Application Support", description: "On-demand application specialist assistance, protocol optimization, new assay configuration, and operator refresher workshops for clinical laboratory teams." },
  { title: "Cold-Chain Reagent Logistics & Standardized Multi-Level Controls", description: "Temperature-monitored distribution of multi-analyte controls, calibrators, and diagnostic kits ensuring maximum stability, shelf-life, and precise diagnostic reproducibility." },
  { title: "Genuine Parts Inventory & Comprehensive Fault Remediation", description: "Well-stocked regional warehouses containing critical wear-and-tear spares to guarantee fast turnaround times and restore analyzer functionality without delay." },
  { title: "ISO & NABL Compliance Consultation for Medical Laboratories", description: "Documentation guidance, standard operating procedure (SOP) formulation, traceability certification, and audit preparation to meet national clinical lab standards." },
];

export default function ServicesClient({ city = "" }) {
  const [servicesData, setServicesData] = useState([]);
  const [pageTitle, setPageTitle] = useState("Support that follows the requirement");
  const [pageDesc, setPageDesc] = useState("Whether the request is for a single product or several categories, the process begins with understanding what the buyer needs.");

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
            setServicesData(d.services);
          }
          if (d.title) setPageTitle(d.title);
          if (d.description) setPageDesc(d.description);
        }
      } catch (err) {
        console.error("Services fetch error:", err);
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
    <>
      <PageBanner
        title="Biomedical Procurement Support"
        subtitle={`Practical assistance for equipment, diagnostic products, reagents, consumables and other healthcare requirements${city ? ` in ${city}` : ""}.`}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="What We Help With"
            title={pageTitle}
            description={pageDesc}
            center
          />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
            {displayList.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <SectionTitle badge="Typical Workflow" title="From product need to procurement enquiry" description="A straightforward route for professional buyers." center />
          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              ["01", "Share the requirement", "Send a product name, category, model, application or consolidated list."],
              ["02", "Review the details", "Clarify specifications, quantity, compatibility points and other relevant information."],
              ["03", "Proceed with the enquiry", "Use the confirmed requirement for quotation, availability and supply coordination."],
            ].map(([step, title, desc]) => (
              <div key={step} className="bg-white rounded-[30px] p-8 card-shadow border border-slate-100">
                <span className="text-5xl font-bold text-sky-100">{step}</span>
                <h3 className="text-2xl font-semibold mt-5">{title}</h3>
                <p className="text-slate-600 mt-4 leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

