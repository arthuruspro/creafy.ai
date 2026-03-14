"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#17b26a" />
    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XMarkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#e5e7eb" />
    <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" fill="currentColor" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* ═══════════════════════════════════════════
   TYPING ANIMATION
   ═══════════════════════════════════════════ */

function useTypingAnimation(words: string[]) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display === word) setTimeout(() => setDeleting(true), 1800);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display === "") {
          setDeleting(false);
          setWordIdx((p) => (p + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [display, deleting, wordIdx, words]);

  return display;
}

/* ═══════════════════════════════════════════
   TOP PROMO BANNER
   ═══════════════════════════════════════════ */

function TopBanner() {
  return (
    <div className="bg-[#1a1a1a] text-white py-2.5 px-4 text-center text-sm flex items-center justify-center gap-3 relative z-50">
      <span className="text-[13px]">Create your ad for $1</span>
      <a href="#" className="btn-white-pill text-[12px] !py-1.5 !px-4">Try Now</a>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════ */

function Navbar() {
  return (
    <nav className="bg-[#F6F6F8] sticky top-0 z-40">
      <div className="container-main flex items-center justify-center h-[60px]">
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {["Features", "Pricing", "Languages"].map((item) => (
            <a key={item} href={item === "Pricing" ? "#pricing" : "#"} className="text-[14px] text-[#555] hover:text-[#1a1a1a] transition-colors font-medium">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   VIDEO CARD (with mute/unmute toggle)
   ═══════════════════════════════════════════ */

function VideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[9/16] w-[41vw] md:w-[220px] shrink-0">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10 transition-colors hover:bg-black/70"
      >
        {muted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function Hero() {
  const typed = useTypingAnimation(["Agency", "App", "TikTok", "DTC", "SaaS"]);

  return (
    <section className="pt-4 md:pt-8 pb-6 bg-[#F6F6F8]">
      <div className="container-main text-center">
        {/* Main headline */}
        <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
          Create winning Ads{" "}
          <span className="gradient-text">with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] md:text-[17px] text-[#444] mb-8">
          Write your script → Pick an actor → Generate video
        </p>

        {/* CTA */}
        <a href="#" className="inline-flex items-center gap-2 btn-dark text-[16px] px-10 py-4 w-full max-w-[340px] md:w-auto md:max-w-none">
          <SparkleIcon className="w-4 h-4" />
          Create your first ad
        </a>
      </div>

      {/* Video Carousel (horizontal scroll on mobile, 4 videos) */}
      <div className="mt-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 md:justify-center md:px-0 w-max md:w-full md:max-w-3xl md:mx-auto">
          {["/dp1.mp4", "/dp2.mp4", "/dp3.mp4", "/dp4.mp4"].map((src, i) => (
            <VideoCard key={i} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BETTER VIDEO ADS (arcads hero section)
   ═══════════════════════════════════════════ */

function BetterVideoAds() {
  return (
    <section className="py-20 bg-white">
      <div className="container-main text-center">
        <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
          The fastest way to create{" "}
          <span className="gradient-text">AI videos</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#888] max-w-3xl mx-auto mb-14 leading-relaxed">
          No tools, no timeline, no production headaches. Just 3 steps from idea to ad, in under 2 minutes.
        </p>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              step: "Step 1",
              title: "Write your script",
              img: "/step1a.png",
            },
            {
              step: "Step 2",
              title: "Choose an actor",
              img: "/step2a.png",
            },
            {
              step: "Step 3",
              title: "Launch your ad",
              img: "/step3a.png",
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#f8f8fa] rounded-2xl overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-[#5C7DEE] rounded-b-2xl">
                <h3 className="text-[22px] font-bold text-white flex items-center gap-2">
                  <span className="bg-[#FFD233] text-[#1a1a1a] text-[13px] font-extrabold px-2.5 py-1 rounded-md">{card.step}</span>
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   AI ACTORS
   ═══════════════════════════════════════════ */

function AIActors() {
  return (
    <section className="py-20 bg-[#f8f8fa]">
      <div className="container-main text-center">
        <h2 className="text-[28px] md:text-[42px] font-extrabold text-[#1a1a1a] mb-3 tracking-tight">
          The most realistic and captivating{" "}
          <span className="gradient-text">AI Actors</span>
        </h2>
        <p className="text-[16px] text-[#888] mb-8">
          The best AI UGC library with 1,000+ AI Actors
        </p>
        <a href="#" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5 mb-14">
          <SparkleIcon className="w-4 h-4" />
          Create your first ad
        </a>

        {/* Actors Showcase */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden">
            <img src="/ooo4.webp" alt="AI Actors showcase" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT IN HAND
   ═══════════════════════════════════════════ */

function ProductInHand() {
  return (
    <section className="py-20 bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-[13px] text-[#667eea] font-semibold mb-3 uppercase tracking-wider">Avatar holding your product</p>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] mb-4 tracking-tight leading-[1.15]">
              Create your own <span className="text-[#5C7DEE]">AI Actor</span>
            </h2>
            <p className="text-[16px] text-[#888] leading-relaxed mb-8">
              Generate a face and make them hold your product, show your app, and wear your clothes.
            </p>
            <a href="#" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5">
              <SparkleIcon className="w-4 h-4" />
              Create your first ad
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-3">
            {["/ooo5.webp", "/ooo6.webp"].map((src, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={src} alt={`Product in hand ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EMOTION CONTROL
   ═══════════════════════════════════════════ */

function EmotionControl() {
  const emotions = [
    { label: "Neutral", emoji: "😐" },
    { label: "Happy", emoji: "😊" },
    { label: "Surprised", emoji: "😮" },
    { label: "Laughing", emoji: "😂" },
    { label: "Serious", emoji: "😤" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] mb-4 tracking-tight leading-[1.15]">
              Emotion control
            </h2>
            <p className="text-[16px] text-[#888] leading-relaxed">
              You have full emotion control. Just write how you want it.
            </p>
          </div>

          {/* Emotion images */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "/ooo8.webp", label: "Surprised" },
              { src: "/ooo9.webp", label: "Laughing" },
              { src: "/ooo10.webp", label: "Neutral" },
            ].map((item, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl relative overflow-hidden">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="bg-black/60 text-white text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-14 bg-[#fafafa] border-t border-gray-100">
      <div className="container-main">
        <p className="text-[12px] text-[#999]">&copy; 2026 Creafy.ai</p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

function TopNav() {
  return (
    <nav className="py-4 bg-[#F6F6F8]">
      <div className="container-main flex items-center justify-between">
        <span className="flex items-center gap-2 text-[22px] font-extrabold text-[#1a1a1a] tracking-tight">
          <span className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white text-[16px] font-extrabold">C</span>
          creafy
        </span>
        <a href="#" className="text-[14px] font-medium text-[#555] hover:text-[#1a1a1a] transition-colors">Log in</a>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <main>
      <TopNav />
      <Hero />
      <BetterVideoAds />
      <ProductInHand />
      <AIActors />
    </main>
  );
}
