"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

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
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "haemoglobinstripcom",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { fetchFullCatalog } = await import("@/lib/data-fetcher");
        const allProducts = await fetchFullCatalog();
        const uniqueCats = Array.from(new Set(allProducts.map(p => p.category).filter(Boolean)));
        uniqueCats.sort((a, b) => {
          if (a === "Other Products") return 1;
          if (b === "Other Products") return -1;
          return a.localeCompare(b);
        });
        setCategories(uniqueCats.slice(0, 5));
      } catch (err) {
        console.error("Error fetching footer categories:", err);
      }
    };
    loadCategories();
  }, []);

  const getContactField = (labels) => {
    const found = contactInfo.find(
      (x) => labels.some(l => x.label?.toLowerCase() === l.toLowerCase())
    );
    return found ? found.value : "";
  };

  const phone = getContactField(["phone", "phone number", "mobile", "mobile number"]);
  const email = getContactField(["email", "email address"]);
  const address = getContactField(["address", "office address", "address/office address"]);

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  let phoneValues = [];
  if (Array.isArray(phone)) {
    phoneValues = phone.map(p => String(p).trim());
  } else if (phone !== null && phone !== undefined && phone !== "") {
    phoneValues = String(phone).split(/[\n,]+/).map(p => p.trim());
  }

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

            <div className="lg:col-span-3">
              <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-5 bg-slate-200 rounded animate-pulse mb-4" />
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mb-6" />
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-5 bg-slate-200 rounded animate-pulse mb-4" />
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mb-6" />
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-5 bg-slate-200 rounded animate-pulse mb-4" />
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse mb-6" />
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-5 bg-slate-200 rounded animate-pulse mb-4" />
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-5 bg-slate-200 rounded animate-pulse mb-4" />
              ))}
            </div>

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-custom py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Logo & Description */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-sky-700">
              Raj
              <span className="text-slate-900">
                {" "}Biosis
              </span>
            </h2>

            <p className="mt-5 text-slate-600 leading-7">
              Delivering trusted diagnostic
              and biomedical solutions with
              innovation, quality, and
              precision healthcare support.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/rajbiosispvtltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-sky-600 hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1H13c-2.8 0-5 2.2-5 5v2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rajbiosisindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-600 hover:text-white transition-all duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 0.1 5.7.2 4.8.4 4.1.7c-.8.3-1.4.7-2 1.3C1.4 2.7 1 3.3.7 4.1c-.3.7-.5 1.6-.6 2.9C0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.4 1.3 2 .6.6 1.3 1 2 1.3.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.4-.7 2-1.3.6-.6 1-1.3 1.3-2 .3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.4-1.3-2-.6-.6-1.3-1-2-1.3-.7-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11c0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4c.8 0 1.4.6 1.4 1.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column (narrower col-span) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">

              <Link href={makeLink("/")} className="hover:text-sky-700 transition">
                Home
              </Link>

              <Link href={makeLink("/about")} className="hover:text-sky-700 transition">
                About
              </Link>

              <Link href={makeLink("/services")} className="hover:text-sky-700 transition">
                Services
              </Link>

              <Link href={makeLink("/items")} className="hover:text-sky-700 transition">
                Products
              </Link>

              <Link href={makeLink("/contact")} className="hover:text-sky-700 transition">
                Contact
              </Link>

            </div>
          </div>

          {/* Dynamic Categories Column (narrower col-span) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">
              {categories.map((cat) => {
                const catSlug = cat.replace(/\s+/g, "-").toLowerCase();
                return (
                  <Link key={cat} href={makeLink(`/items#${catSlug}`)} className="hover:text-sky-700 transition">
                    {cat}
                  </Link>
                );
              })}
              {categories.length === 0 && <p className="text-slate-400 text-sm">N/A</p>}
            </div>
          </div>

          {/* Services Column (narrower col-span) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5">
              Services
            </h3>

            <div className="flex flex-col gap-3 text-slate-600">
              <p>Hemoglobin Test Strips</p>
              <p>Anemia Screening Kits</p>
              <p>Point-of-Care Hb Meters</p>
              <p>Meter Calibration Support</p>
            </div>
          </div>

          {/* Contact Info (col-span-3) */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-5">
              Contact Info
            </h3>

            <div className="space-y-4 text-slate-600">

              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 text-sky-700 flex-shrink-0"
                />
                <p>{dynamicAddress}</p>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-1 text-sky-700 flex-shrink-0"
                />
                <div className="flex flex-col">
                  {phoneValues.map((num, idx) => (
                    <a key={idx} href={`tel:${num}`} className="hover:text-sky-700 transition">
                      {num}
                    </a>
                  ))}
                  {phoneValues.length === 0 && <p>N/A</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-sky-700 flex-shrink-0"
                />
                <a href={`mailto:${email}`} className="hover:text-sky-700 transition">
                  {email}
                </a>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">

          <p>
            © 2026  Raj Biosis.
            All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for
            modern diagnostics.
          </p>

        </div>

      </div>
    </footer>
  );
}