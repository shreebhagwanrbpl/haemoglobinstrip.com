"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { db, doc, collection, getDoc, getDocs, addDoc, onSnapshot } from "@/lib/firestore-shim";

import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  User,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Zap,
  Truck,
  ChevronRight,
  Headphones,
  Building2,
  Navigation
} from "lucide-react";

import CTASection from "@/components/CTASection";

export default function ContactPage({ city: initialCity = "" }) {
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] = useState(null);
  const [contactInfo, setContactInfo] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const pathname = usePathname();
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const staticRoutes = ["about", "services", "items", "contact", "products"];
  const currentDistrictSlug =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!form.name.trim()) {
      return toast.error("Please enter your full name / contact person");
    }

    if (!phoneRegex.test(form.phone.trim())) {
      return toast.error("Please enter a valid 10-digit Indian mobile number");
    }

    if (!emailRegex.test(form.email.trim())) {
      return toast.error("Please enter a valid business email address");
    }

    if (!form.message.trim()) {
      return toast.error("Please enter your requirement or message");
    }

    try {
      setSubmitting(true);

      const targetDistrict = districtData?.district || initialCity || (currentDistrictSlug ? currentDistrictSlug.toUpperCase() : "General");

      await addDoc(
        collection(
          db,
          "websitesQueries",
          "haemoglobinstripcom",
          "contactQueries"
        ),
        {
          ...form,
          district: targetDistrict,
          pageSource: pathname || "/contact",
          createdAt: new Date(),
        }
      );

      toast.success("Enquiry submitted successfully! Our technical sales team will contact you shortly.");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Failed to submit enquiry. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamic District fetch based on URL slug or props
  useEffect(() => {
    const loadDistrict = async () => {
      const slug = currentDistrictSlug || (initialCity ? initialCity.toLowerCase().replace(/\s+/g, "-") : "");
      if (!slug) {
        setDistrictData(null);
        return;
      }

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "haemoglobinstripcom",
            "districts",
            slug
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.error("District fetch error:", err);
      }
    };

    loadDistrict();
  }, [currentDistrictSlug, initialCity]);

  // Load general contact information from Firestore
  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "haemoglobinstripcom",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(snap.data().contactInfo || []);
        }
      } catch (err) {
        console.error("Contact fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const getContactField = (labels) => {
    const found = contactInfo.find((x) =>
      labels.some((l) => x.label?.toLowerCase() === l.toLowerCase())
    );
    return found ? found.value : "";
  };

  const phone = getContactField(["phone", "phone number", "mobile", "mobile number"]);
  const email = getContactField(["email", "email address"]) || "mail@rajbiosis.com";
  const defaultAddress =
    getContactField(["address", "office address", "address/office address"]) ||
    "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, Ajmer-Delhi Bypass Rd, Jaipur, Rajasthan 302021, India";
  const hours =
    getContactField(["working hours", "hours", "work hours"]) ||
    "Mon - Sat (10AM - 6PM)";

  // Dynamic District details
  const effectiveCity = districtData?.district || initialCity || "";
  const dynamicAddress = districtData
    ? `${districtData.district}, ${districtData.state}, India`
    : defaultAddress;

  let phoneValues = [];
  if (Array.isArray(phone)) {
    phoneValues = phone.map((p) => String(p).trim());
  } else if (phone !== null && phone !== undefined && phone !== "") {
    phoneValues = String(phone).split(/[\n,]+/).map((p) => p.trim());
  }
  if (phoneValues.length === 0) {
    phoneValues = ["8318368383"];
  }

  // Google Maps Dynamic URL generation
  const { mapEmbedUrl, googleMapsSearchUrl, mapTitle } = useMemo(() => {
    if (districtData) {
      const query = `${districtData.district}, ${districtData.state}, India`;
      return {
        mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`,
        googleMapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
        mapTitle: `Supply & Distribution Coverage: ${districtData.district}, ${districtData.state}`
      };
    } else {
      const query = "RAJ BIOSIS PRIVATE LIMITED, Jaipur";
      return {
        mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
        googleMapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
        mapTitle: "RAJ BIOSIS PRIVATE LIMITED - Central Headquarters"
      };
    }
  }, [districtData]);

  if (loading) {
    return (
      <div className="site3-static">
        <section className="py-20 bg-sky-50 text-slate-900 border-b border-slate-200">
          <div className="container-custom text-center">
            <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-slate-200 rounded-xl animate-pulse mx-auto" />
          </div>
        </section>
        <section className="section-padding bg-slate-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="h-10 w-64 bg-slate-200 rounded-xl animate-pulse mb-8" />
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-24 bg-slate-200 rounded-2xl animate-pulse mb-5"
                  />
                ))}
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-slate-200 rounded-xl animate-pulse mb-4"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="site3-static">
      <Toaster position="top-right" />

      {/* 1. LIGHT THEMED CONTACT BANNER (Matching Website Colors: Sky Blue & White) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50/70 py-14 lg:py-20 border-b border-slate-200/80">
        {/* Ambient Glowing Background Lights in Website Colors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/35 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-4">
            <Link href="/" className="hover:text-sky-900 transition">Home</Link>
            <ChevronRight size={13} />
            <span className="text-slate-600">Contact Us</span>
          </div>

          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-sky-100/90 text-sky-800 border border-sky-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm mb-4">
              <Headphones size={15} className="text-sky-600" />
              <span>Direct Manufacturer & Supplier Support • Pan-India</span>
            </div>

            {/* Banner Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {effectiveCity
                ? `Contact Raj Biosis in ${effectiveCity}`
                : "Connect with Our Biomedical Experts"}
            </h1>

            {/* Banner Subtitle */}
            <p className="mt-4 text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              Looking for Mission Hb Strips, hemoglobin meters, diagnostic analyzers, reagents, or bulk institutional healthcare supply? Our technical support and sales team are ready to assist you.
            </p>

            {/* 3 Quick Assurance Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
              <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Fast Quotes</h4>
                  <p className="text-[11px] text-slate-500">In 2-4 Business Hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                  <Truck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Direct Logistics</h4>
                  <p className="text-[11px] text-slate-500">Pan-India Express Dispatch</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-200/90 p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Genuine</h4>
                  <p className="text-[11px] text-slate-500">OEM Batch Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT SECTION (Cards + Streamlined Form) */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Contact Information & Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3.5">
                  <Sparkles size={14} className="text-sky-600" />
                  <span>Healthcare Enquiry Desk</span>
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Let’s Start a Conversation
                </h2>

                <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
                  Reach out to us for institutional healthcare supplies, diagnostic instruments, hemoglobin testing strips, and bulk quotations.
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="space-y-4 pt-2">
                {/* Phone Card */}
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Phone & WhatsApp Support
                    </h4>
                    <div className="text-slate-600 mt-1 flex flex-col text-sm font-medium">
                      {phoneValues.map((num, idx) => (
                        <a
                          key={idx}
                          href={`tel:${num.replace(/\s+/g, "")}`}
                          className="hover:text-sky-700 transition"
                        >
                          {num}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Business Email ID
                    </h4>
                    <p className="text-slate-600 mt-1 text-sm font-medium">
                      <a href={`mailto:${email}`} className="hover:text-sky-700 transition">
                        {email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {effectiveCity ? `Supply Network: ${effectiveCity}` : "Office / Supply Location"}
                    </h4>
                    <p className="text-slate-600 mt-1 text-sm font-medium leading-relaxed">
                      {dynamicAddress}
                    </p>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                    <Clock3 size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Working Hours
                    </h4>
                    <p className="text-slate-600 mt-1 text-sm font-medium">
                      {hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Streamlined Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/50">
                
                {/* Form Header */}
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {effectiveCity ? `Enquire for ${effectiveCity}` : "Send Us Your Requirement"}
                  </h3>

                  <p className="text-slate-500 text-sm sm:text-base mt-1.5">
                    Fill out the form below with your required testing supplies, models, or institutional quantity.
                  </p>
                </div>

                {/* Streamlined Form Elements (Clean 4 fields only) */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Contact Person & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Contact Person / Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <input
                          type="text"
                          name="name"
                          placeholder="e.g. Dr. Rajesh Kumar"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                        Phone / WhatsApp Mobile <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="10-digit mobile number"
                          maxLength={10}
                          value={form.phone}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          className="w-full bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Business Email ID */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                      Business Email ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                      <input
                        type="email"
                        name="email"
                        placeholder="name@hospital-or-lab.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                      Requirement Details / Specifications / Quantity <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Please specify test strips quantity, analyzer model, institution requirements or questions..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-sky-600 focus:bg-white text-slate-900 text-sm rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-sky-500/20 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-98 disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Your Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message / Request Quote</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    🔒 Your contact information is kept strictly confidential and used only for enquiry coordination.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DYNAMIC LOCATION GOOGLE MAP SECTION */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container-custom">
          {/* Map Header with Highlight Pin & Direct Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-sm shrink-0">
                <Navigation size={22} className="text-sky-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{mapTitle}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    {effectiveCity ? `${effectiveCity} Network` : "Central Facility"}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                  {dynamicAddress}
                </p>
              </div>
            </div>

            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md border border-sky-400/30 transition-all self-start sm:self-auto cursor-pointer active:scale-98"
            >
              <span>Open in Google Maps</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Full Color Google Maps Embed */}
          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl relative bg-slate-100">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="450"
              loading="lazy"
              className="border-0 w-full"
              title="Dynamic Location Map"
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}
