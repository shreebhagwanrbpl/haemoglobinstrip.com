"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList } from "lucide-react";

export default function CTASection() {
  const pathname = usePathname();
  const parts = pathname?.split("/").filter(Boolean) || [];
  const staticRoutes = ["about", "services", "products", "contact", "items", "enquiry"];
  const district = parts.length && !staticRoutes.includes(parts[0]) ? parts[0] : "";
  const link = (path) => district ? `/${district}${path}` : path;

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[42px] bg-gradient-to-r from-sky-700 to-cyan-600 p-10 lg:p-20 text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[110px]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-white/15 px-5 py-2 rounded-full text-sm font-semibold mb-5">Product Enquiry</span>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">Have a multi-item biomedical requirement?</h2>
              <p className="mt-6 text-white/80 text-lg leading-8 max-w-xl">Send the products, models, categories or applications you are looking for. We can help organise the enquiry around the requirement rather than a single product.</p>
            </div>
            <div className="flex lg:justify-end">
              <div className="bg-white text-slate-900 rounded-[32px] p-8 max-w-md w-full shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6"><ClipboardList size={30} /></div>
                <h3 className="text-2xl font-bold">Start with your list</h3>
                <p className="mt-3 text-slate-600 leading-7">A product name, model number, category or simple requirement is enough to begin an enquiry.</p>
                <Link href={link("/contact")} className="mt-8 flex w-full bg-sky-700 !text-white px-6 py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all items-center justify-center gap-2">
                  Send Requirement <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
