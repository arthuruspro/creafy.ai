"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */

const SparkleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" fill="currentColor" />
  </svg>
);

/* ═══════════════════════════════════════════
   VIDEO CARD (with mute/unmute toggle)
   ═══════════════════════════════════════════ */

function VideoCard({ src, id }: { src: string; id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail !== id && videoRef.current) {
        videoRef.current.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener("creafy-unmute", handler);
    return () => window.removeEventListener("creafy-unmute", handler);
  }, [id]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !muted;
      if (!newMuted) {
        window.dispatchEvent(new CustomEvent("creafy-unmute", { detail: id }));
      }
      videoRef.current.muted = newMuted;
      setMuted(newMuted);
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[9/16] w-[41vw] md:w-[220px] shrink-0 cursor-pointer select-none"
      onClick={toggleMute}
      role="button"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: "none" }}
      />
      {/* Mute/Unmute indicator — Apple-style glass */}
      <div
        className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center z-10 transition-all shadow-lg pointer-events-none"
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" fillOpacity="0.85" />
            <path d="M16 9.5L21 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M21 9.5L16 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" fillOpacity="0.85" />
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.07 4.93a10 10 0 010 14.14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function Hero() {
  return (
    <section className="pt-8 md:pt-12 pb-6 bg-[#F6F6F8]">
      <div className="container-main text-center">
        {/* Main headline */}
        <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
          Create winning Ads{" "}
          <span className="gradient-text">with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] md:text-[21px] text-[#444] mb-8">
          Write your script → Pick an actor → Generate video
        </p>

        {/* CTA */}
        <a href="/pricing" className="inline-flex items-center gap-2 btn-dark text-[16px] px-10 py-4 w-full max-w-[340px] md:w-auto md:max-w-none">
          <SparkleIcon className="w-4 h-4" />
          Create your first ad
        </a>
      </div>

      {/* Video Carousel (horizontal scroll on mobile, 4 videos) */}
      <div className="mt-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 md:justify-center md:px-0 w-max md:w-full md:max-w-3xl md:mx-auto">
          {["/dp1.mp4", "/dp2.mp4", "/dp3.mp4", "/dp4.mp4"].map((src, i) => (
            <VideoCard key={i} src={src} id={`hero-${i}`} />
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
          <span className="gradient-text">video ads</span>
        </h2>
        <p className="text-[16px] md:text-[20px] text-[#888] max-w-3xl mx-auto mb-14 leading-relaxed">
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
                  <span className="bg-[#1a1a1a] text-white text-[13px] font-extrabold px-2.5 py-1 rounded-md">{card.step}</span>
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
        <p className="text-[16px] md:text-[18px] text-[#888] mb-8">
          The best AI UGC library with 1,000+ AI Actors
        </p>
        <a href="/pricing" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5 mb-14">
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
            <p className="text-[16px] md:text-[18px] text-[#888] leading-relaxed mb-8">
              Generate a face and make them hold your product, show your app, and wear your clothes.
            </p>
            <a href="/pricing" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5">
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
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-12 bg-[#1a1a1a]">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-0">
          {/* Brand */}
          <div>
            <span className="flex items-center gap-2 text-[20px] font-extrabold text-white tracking-tight mb-3">
              <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1a1a1a] text-[18px] font-extrabold">C</span>
              creafy
            </span>
            <p className="text-[13px] text-[#888] max-w-[240px] leading-relaxed">
              Create winning video ads with AI actors in under 2 minutes.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[13px] font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Examples", "Languages"].map((item) => (
                  <li key={item}>
                    <span className="text-[13px] text-[#888] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Contact", "Careers"].map((item) => (
                  <li key={item}>
                    <span className="text-[13px] text-[#888] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Refund Policy"].map((item) => (
                  <li key={item}>
                    <span className="text-[13px] text-[#888] hover:text-white transition-colors cursor-pointer">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#333] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[12px] text-[#666]">&copy; 2026 Creafy.ai. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[12px] text-[#666] hover:text-white transition-colors cursor-pointer">support@creafy.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

function TopNav() {
  return (
    <nav className="pt-6 pb-4 bg-[#F6F6F8]">
      <div className="container-main flex items-center justify-between">
        <span className="flex items-center gap-2 text-[22px] font-extrabold text-[#1a1a1a] tracking-tight">
          <span className="w-9 h-9 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white text-[20px] font-extrabold">C</span>
          creafy
        </span>
        <span className="text-[14px] font-medium text-[#555] hover:text-[#1a1a1a] transition-colors cursor-pointer">Log in</span>
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
      {/* Trusted by brands */}
      <section className="py-16 bg-white">
        <div className="container-main text-center">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#1a1a1a] mb-8">
            Trusted by 300+ brands making <span className="text-[#5C7DEE]">$100M+</span> in sales
          </h2>
        </div>
        <img
          src="/empresas.png"
          alt="Trusted brands"
          className="w-full md:w-3/5 md:mx-auto h-auto"
        />
      </section>

      <AIActors />
      <Footer />
    </main>
  );
}
