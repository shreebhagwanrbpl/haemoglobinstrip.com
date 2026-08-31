"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  const pathname = usePathname();

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "haemoglobinstripcom", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const pathParts = pathname?.split("/").filter(Boolean) || [];
  const staticRoutes = ["about", "services", "items", "contact"];
  const districtSlug =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };


  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-slate-950">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Homepage.png"
          alt="Raj Biosis Banner"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent" />
      </div>

      {/* Main Container */}
      <div
        className="
          container-custom
          relative
          z-10
          py-12
          lg:py-14
          grid
          lg:grid-cols-[minmax(0,1.65fr)_minmax(140px,0.35fr)]
          gap-8
          items-center
        "
      >
        {/* Left Content */}
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-500/30 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            <ShieldCheck size={18} />
            Trusted Biomedical Systems
          </div>

          {/* Title */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-bold
              leading-[1.08]
              text-white
              w-full
              max-w-5xl
            "
          >
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 bg-white/10 rounded w-[90%]"></div>
                <div className="h-12 bg-white/10 rounded w-[80%]"></div>
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />
                    <span className="text-2xl sm:text-3xl lg:text-4xl text-sky-400 font-semibold">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-5 space-y-3 max-w-4xl">
              <div className="h-4 bg-white/10 rounded w-full"></div>
              <div className="h-4 bg-white/10 rounded w-[90%]"></div>
              <div className="h-4 bg-white/10 rounded w-[75%]"></div>
            </div>
          ) : (
            <p className="mt-5 text-slate-300 text-lg lg:text-xl leading-7 lg:leading-8 w-full max-w-4xl">
              {heroData.description}

              {city && (
                <>
                  {" "}across <strong>{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-7">
            {loading ? (
              <>
                <div className="animate-pulse h-12 w-44 bg-white/10 rounded-lg"></div>
                <div className="animate-pulse h-12 w-36 bg-white/10 rounded-lg"></div>
              </>
            ) : (
              <>
                <Link href={makeLink("/items")}>
                  <button className="primary-btn flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white border-none shadow-lg shadow-sky-600/30">
                    {heroData.button1Text || "Explore Products"}
                    <ArrowRight size={18} />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="secondary-btn bg-white/10 hover:bg-white/20 text-black border border-white/20">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 lg:gap-12 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-white">10+</h3>
              <p className="text-slate-400">Years Experience</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">500+</h3>
              <p className="text-slate-400">Products Delivered</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">100%</h3>
              <p className="text-slate-400">Quality Assurance</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side Spacer */}
        <div className="hidden lg:block h-[350px]" />
      </div>
    </section>
  );
}