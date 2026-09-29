"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers3,
  Sparkles,
  ArrowRight,
  VolumeX,
  Volume2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { WEBSITE_ID } from "@/lib/catalog-utils";
import { db, doc, collection, getDoc, getDocs, addDoc, onSnapshot } from "@/lib/firestore-shim";


// Default high-definition media items when admin hasn't uploaded custom slides yet
const DEFAULT_HERO_MEDIA = [
  {
    id: "default-img-1",
    type: "image",
    url: "/Homepage.png",
    name: "Biomedical & Diagnostic Instruments"
  },
  {
    id: "default-img-2",
    type: "image",
    url: "https://5.imimg.com/data5/SELLER/Default/2024/4/407501376/TZ/YO/UF/14123088/acon-quick-check-plus-hemoglobin-hb-test-strips-500x500.jpeg",
    name: "Hemoglobin & Diagnostic Test Strips"
  },
  {
    id: "default-video-1",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    name: "Laboratory Diagnostics Overview"
  },
  {
    id: "default-img-3",
    type: "image",
    url: "/about.png",
    name: "Biochemistry & Hematology Analyzers"
  }
];

export default function HeroSection({ city = "" }) {
  const pathname = usePathname();
  const parts = pathname?.split("/").filter(Boolean) || [];
  const staticRoutes = ["about", "services", "items", "contact", "products"];
  const district = parts.length && !staticRoutes.includes(parts[0]) ? parts[0] : "";

  // Static Localized link helper
  const link = useCallback((path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path.startsWith("/") ? path : `/${path}`}`;
  }, [district]);

  // Dynamic States from Firestore
  const [title, setTitle] = useState("Equipment, diagnostics and supplies for modern healthcare");
  const [description, setDescription] = useState(
    "Explore a broad selection of laboratory instruments, diagnostic systems, test kits, reagents, monitoring devices, consumables and supporting accessories. Product availability and specifications can be discussed for individual or institutional requirements."
  );
  const [btn1Text, setBtn1Text] = useState("Browse Catalogue");
  const [btn2Text, setBtn2Text] = useState("Discuss a Requirement");
  const [mediaList, setMediaList] = useState(DEFAULT_HERO_MEDIA);

  // Carousel & Controls
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Parse Firestore data into standardized media items
  const parseMediaFromData = (d) => {
    const list = [];
    if (Array.isArray(d?.media) && d.media.length > 0) {
      d.media.forEach((item, idx) => {
        const url = typeof item === "string" ? item : item.url;
        const type = item.type || (url?.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ? "video" : "image");
        if (url) {
          list.push({
            id: item.id || `media-${idx}`,
            type,
            url,
            storagePath: item.storagePath || "",
            name: item.name || `Slide ${idx + 1}`,
          });
        }
      });
    } else {
      if (Array.isArray(d?.images) && d.images.length > 0) {
        d.images.forEach((url, idx) => {
          if (url) {
            list.push({
              id: `img-${idx}`,
              type: "image",
              url,
              name: `Image ${idx + 1}`
            });
          }
        });
      } else if (d?.imageUrl || d?.image) {
        const img = d.imageUrl || d.image;
        if (img) {
          list.push({
            id: "img-0",
            type: "image",
            url: img,
            name: "Hero Image"
          });
        }
      }

      if (Array.isArray(d?.videos) && d.videos.length > 0) {
        d.videos.forEach((vUrl, idx) => {
          if (vUrl) {
            list.push({
              id: `vid-${idx}`,
              type: "video",
              url: vUrl,
              name: `Video ${idx + 1}`
            });
          }
        });
      } else if (d?.videoUrl) {
        list.push({
          id: "vid-0",
          type: "video",
          url: d.videoUrl,
          name: "Featured Video"
        });
      }
    }
    return list.length > 0 ? list : DEFAULT_HERO_MEDIA;
  };

  // Firestore Real-time Subscription
  useEffect(() => {
    let unsubscribe = () => { };

    try {
      const docRef = doc(db, "websites", WEBSITE_ID, "pages", "home");

      unsubscribe = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data.title?.trim()) setTitle(data.title.trim());
            if (data.description?.trim()) setDescription(data.description.trim());
            if (data.button1Text?.trim()) setBtn1Text(data.button1Text.trim());
            if (data.button2Text?.trim()) setBtn2Text(data.button2Text.trim());

            const parsed = parseMediaFromData(data);
            setMediaList(parsed);
          }
        },
        (error) => {
          console.error("Error subscribing to home page data:", error);
        }
      );
    } catch (err) {
      console.error("Firestore setup error:", err);
    }

    return () => unsubscribe();
  }, []);

  // Auto-play Carousel (pause if on video slide for longer duration)
  useEffect(() => {
    if (mediaList.length <= 1) return;

    const currentSlide = mediaList[activeSlideIndex];
    const duration = currentSlide?.type === "video" ? 8000 : 5000;

    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % mediaList.length);
    }, duration);

    return () => clearInterval(interval);
  }, [mediaList.length, activeSlideIndex, mediaList]);

  // Adjust active slide safely
  useEffect(() => {
    if (activeSlideIndex >= mediaList.length && mediaList.length > 0) {
      setActiveSlideIndex(mediaList.length - 1);
    } else if (mediaList.length === 0) {
      setActiveSlideIndex(0);
    }
  }, [mediaList.length, activeSlideIndex]);

  const currentMedia = mediaList[activeSlideIndex] || mediaList[0];

  return (
    <section className="hero-section-wrapper relative w-full min-h-[500px] lg:min-h-[540px] flex items-center overflow-hidden bg-slate-950 text-white">
      {/* 1. DYNAMIC BACKGROUND MEDIA CAROUSEL (Images & Videos with Low Opacity Overlay for Vivid Background Photo Visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <AnimatePresence mode="wait">
          {currentMedia?.type === "video" ? (
            <motion.div
              key={`vid-${currentMedia?.url}-${activeSlideIndex}`}
              initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)", x: 25 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)", x: -25 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                src={currentMedia?.url}
                className="w-full h-full object-cover object-center"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
            </motion.div>
          ) : (
            <motion.div
              key={`img-${currentMedia?.url}-${activeSlideIndex}`}
              initial={{ opacity: 0, scale: 1.10, filter: "blur(12px)", x: 30 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)", x: -30 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentMedia?.url || "/Homepage.png"}
                alt={currentMedia?.name || "Hero Banner"}
                fill
                priority
                className="object-cover object-center"
                onError={(e) => {
                  e.target.src = "/Homepage.png";
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIGHTER OVERLAY: Background photos/videos of machines remain sharp and clearly visible! */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />
        <div className="absolute inset-0 bg-radial-at-tl from-sky-500/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. HERO MAIN CONTENT CONTAINER (Spacious, Clean, Uncluttered) */}
      <div className="container-custom relative z-10 py-12 lg:py-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-slate-900/80 text-sky-300 border border-sky-400/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md shadow-md">
              <Layers3 size={15} className="text-sky-400" />
              <span>Biomedical Product Catalogue</span>
            </div>

            {city ? (
              <div className="inline-flex items-center gap-1.5 bg-slate-900/80 text-emerald-300 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Serving {city}</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-slate-900/80 text-indigo-300 border border-indigo-400/40 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md">
                <Sparkles size={13} className="text-indigo-400" />
                <span>Pan-India Healthcare Supply</span>
              </div>
            )}
          </div>

          {/* Dynamic Hero Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.12] text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {title}
            {city && (
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300 font-bold">
                serving {city}
              </span>
            )}
          </h1>

          {/* Dynamic Hero Description */}
          <p className="mt-4 text-slate-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {description}
          </p>

          {/* CTA Action Buttons with FIXED STATIC LINKS & CRYSTAL CLEAR TEXT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mt-7">
            {/* Button 1: Statically links to /items (Browse Catalogue) */}
            <Link href={link("/items")} className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl shadow-xl shadow-sky-900/40 transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>{btn1Text || "Browse Catalogue"}</span>
                <ArrowRight size={18} />
              </button>
            </Link>

            {/* Button 2: Statically links to /contact (Discuss Requirement) -> SOLID WHITE WITH BOLD DARK TEXT */}
            <Link href={link("/contact")} className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm sm:text-base px-7 sm:px-8 py-3.5 rounded-xl shadow-xl border-2 border-white transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>{btn2Text || "Discuss a Requirement"}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. MINIMAL & ELEGANT CAROUSEL CONTROLS (Dots, Arrows & Sound toggle) */}
      {mediaList.length > 1 && (
        <div className="absolute bottom-4 right-4 sm:right-8 z-20 flex items-center gap-2.5 bg-slate-950/70 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 mr-1">
            {mediaList.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlideIndex === idx
                    ? "w-6 bg-sky-400"
                    : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Sound Toggle (if current slide is video) */}
          {currentMedia?.type === "video" && (
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isMuted ? "Unmute Video" : "Mute Video"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          )}

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={() =>
              setActiveSlideIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length)
            }
            className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Previous"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={() =>
              setActiveSlideIndex((prev) => (prev + 1) % mediaList.length)
            }
            className="p-1 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
