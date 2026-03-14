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
          {["Features", "Affiliate", "Pricing", "Languages"].map((item) => (
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
    <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[9/16] w-[42vw] md:w-[220px] shrink-0">
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
    <section className="pt-10 md:pt-16 pb-6 bg-[#F6F6F8]">
      <div className="container-main text-center">
        {/* Main headline */}
        <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-extrabold text-[#1a1a1a] leading-[1.1] mb-5 tracking-tight">
          Create winning Ads{" "}
          <span className="gradient-text">with AI</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] md:text-[17px] text-[#444] mb-8">
          Write your script -&gt; Pick an avatar -&gt; Generate video
        </p>

        {/* CTA */}
        <a href="#" className="btn-dark text-[16px] px-10 py-4 w-full max-w-[340px] md:w-auto md:max-w-none">
          Create Your Ad For $1
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
          Create better video ads{" "}
          <span className="gradient-text">with AI</span>
        </h2>
        <p className="text-[16px] md:text-[18px] text-[#888] max-w-3xl mx-auto mb-14 leading-relaxed">
          Forget switching between dozens of tools, complex timelines, and slow production. Creafy gives you everything you need to create, refine, and launch video ads with AI.
        </p>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: "Choose your model",
              desc: "Pick the AI model that fits your creative goal. From cinematic video to realistic product visuals.",
              img: "/ooo1.webp",
            },
            {
              title: "Shape your ad",
              desc: "Edit, translate, extend, subtitle, upscale and remix your video using AI tools.",
              img: "/ooo2.webp",
            },
            {
              title: "Start from proven formats",
              desc: "Use ready-made ad presets built for performance marketers.",
              img: "/ooo3.webp",
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#f8f8fa] rounded-2xl overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-2">{card.title}</h3>
                <p className="text-[14px] text-[#888] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CAMPAIGN RESULTS CAROUSEL
   ═══════════════════════════════════════════ */

function CampaignResults() {
  const campaigns = [
    { brand: "Learna", handle: "@learna", badge: "Sponsored", badgeColor: "bg-blue-100 text-blue-700", copy: "Boring textbooks? Learn smarter with AI-powered flashcards", views: "12.6K", viewsChange: "+45%", revenue: "$18.2K", revenueChange: "+120%" },
    { brand: "Glam", handle: "@glamofficial", badge: "ACTIVE", badgeColor: "bg-green-100 text-green-700", copy: "Get that summer glow with our new skincare collection", views: "28K", viewsChange: "+62%", revenue: "$32.1K", revenueChange: "+270%" },
    { brand: "MellowFlow", handle: "@mellowflow", badge: "ACTIVE", badgeColor: "bg-green-100 text-green-700", copy: "Sleep better tonight. Natural supplements, proven results", views: "15.3K", viewsChange: "+38%", revenue: "$10.7K", revenueChange: "+85%" },
    { brand: "Learna", handle: "@learna", badge: "Sponsored", badgeColor: "bg-blue-100 text-blue-700", copy: "Master any subject in half the time with adaptive learning", views: "19.4K", viewsChange: "+52%", revenue: "$24.8K", revenueChange: "+156%" },
    { brand: "Glam", handle: "@glamofficial", badge: "ACTIVE", badgeColor: "bg-green-100 text-green-700", copy: "Transform your skincare routine in just 7 days", views: "22.1K", viewsChange: "+71%", revenue: "$28.5K", revenueChange: "+198%" },
  ];

  return (
    <section className="py-16 bg-[#f8f8fa]">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-5 w-max">
          {campaigns.map((c, i) => (
            <div key={i} className="w-[300px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0">
              {/* Top bar */}
              <div className="p-4 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-[13px]">
                    {c.brand[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{c.brand}</p>
                    <p className="text-[11px] text-[#999]">{c.handle}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${c.badgeColor}`}>
                    {c.badge}
                  </span>
                </div>
                <p className="text-[13px] text-[#555] leading-snug mb-3">{c.copy}</p>
              </div>

              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#f0f0f4] to-[#e8e8ee] flex items-center justify-center">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                  <PlayIcon />
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#999] uppercase font-medium mb-0.5">Views</p>
                  <p className="text-[16px] font-bold text-[#1a1a1a]">{c.views}</p>
                  <p className="text-[11px] font-semibold text-green-500">{c.viewsChange}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#999] uppercase font-medium mb-0.5">Revenue</p>
                  <p className="text-[16px] font-bold text-[#1a1a1a]">{c.revenue}</p>
                  <p className="text-[11px] font-semibold text-green-500">{c.revenueChange}</p>
                </div>
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
          Create Your AI Ad
        </a>

        {/* Actors Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden">
            <img src="/ooo4.webp" alt="AI Actors showcase 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src="/ooo5.webp" alt="AI Actors showcase 2" className="w-full h-full object-cover" />
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
              Create your own AI Actor
            </h2>
            <p className="text-[16px] text-[#888] leading-relaxed mb-8">
              Generate a face and make them hold your product, show your app, and wear your clothes.
            </p>
            <a href="#" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5">
              <SparkleIcon className="w-4 h-4" />
              Create Your AI Ad
            </a>
          </div>

          {/* Images */}
          <div className="grid grid-cols-3 gap-3">
            {["/ooo6.webp", "/ooo7.webp", "/ooo8.webp"].map((src, i) => (
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
   AI VIDEO EDITING
   ═══════════════════════════════════════════ */

function AIVideoEditing() {
  return (
    <section className="py-20 bg-[#f8f8fa]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="grid grid-cols-3 gap-3 order-2 lg:order-1">
            {["/ooo9.webp", "/ooo10.webp", "/ooo11.webp"].map((src, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={src} alt={`AI Video Editing ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] tracking-tight leading-[1.15]">
                AI Video Editing
              </h2>
              <span className="bg-[#667eea] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                Soon!
              </span>
            </div>
            <p className="text-[16px] text-[#888] leading-relaxed mb-8">
              Add B-Rolls, music, captions and transitions in one click.
            </p>
            <a href="#" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5">
              <SparkleIcon className="w-4 h-4" />
              Create Your AI Ad
            </a>
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
            <p className="text-[16px] text-[#888] leading-relaxed mb-8">
              You have full emotion control. Just write how you want it.
            </p>
            {/* Emotion chips */}
            <div className="flex flex-wrap gap-2">
              {emotions.map((e, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[13px] font-medium transition-colors cursor-pointer ${
                    i === 2
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#555] border-gray-200 hover:border-[#999]"
                  }`}
                >
                  <span>{e.emoji}</span>
                  <span>{e.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emotion images */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "/ooo12.webp", label: "Surprised" },
              { src: "/ooo13.webp", label: "Laughing" },
              { src: "/ooo14.webp", label: "Neutral" },
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
   LOCALIZE IN EVERY LANGUAGE
   ═══════════════════════════════════════════ */

function LocalizeLanguages() {
  const languages = [
    { code: "FR", flag: "🇫🇷", name: "French" },
    { code: "EN", flag: "🇬🇧", name: "English" },
    { code: "ES", flag: "🇪🇸", name: "Spanish" },
    { code: "DE", flag: "🇩🇪", name: "German" },
    { code: "IT", flag: "🇮🇹", name: "Italian" },
  ];

  const [selected, setSelected] = useState(0);

  return (
    <section className="py-20 bg-[#f8f8fa]">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Videos */}
          <div className="grid grid-cols-3 gap-3 order-2 lg:order-1">
            {["/ooo15.webp", "/ooo16.webp", "/ooo17.webp"].map((src, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl relative overflow-hidden">
                <img src={src} alt={`Language ${languages[i]?.name}`} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/60 text-white text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {languages[i]?.flag} {languages[i]?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] mb-4 tracking-tight leading-[1.15]">
              Localize in every language
            </h2>
            <p className="text-[16px] text-[#888] leading-relaxed mb-8">
              Accurate translation in more than 30 languages. Reach the world.
            </p>
            {/* Language buttons */}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-medium transition-all ${
                    selected === i
                      ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                      : "bg-white text-[#555] border-gray-200 hover:border-[#999]"
                  }`}
                >
                  <span className="text-[16px]">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BUILD YOUR OWN AI AGENT
   ═══════════════════════════════════════════ */

function BuildAIAgent() {
  return (
    <section className="py-20 bg-white">
      <div className="container-main text-center">
        <h2 className="text-[28px] md:text-[42px] font-extrabold text-[#1a1a1a] mb-3 tracking-tight">
          Build your own AI Agent for marketing
        </h2>
        <p className="text-[16px] text-[#888] mb-8">
          The best AI UGC library with 1,000+ AI Actors
        </p>
        <a href="#" className="inline-flex items-center gap-2 btn-dark px-8 py-3.5 mb-14">
          <SparkleIcon className="w-4 h-4" />
          Create Your AI Ad
        </a>

        {/* 1B Views stat */}
        <div className="mb-16">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-[64px] md:text-[96px] font-extrabold gradient-text leading-none">1B</span>
            <span className="text-[24px] md:text-[32px] font-extrabold text-[#1a1a1a]">views</span>
          </div>
          <p className="text-[16px] text-[#888] mt-2">with ads created with Creafy</p>
        </div>

        {/* Influencer Cards */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 px-4 w-max md:w-full md:justify-center">
            {[
              { handle: "@ameliabeautytips", name: "Health tips", badge: "ACTIVE", likes: "11M", likesChange: "+22%", followers: "12K", followersChange: "+32%" },
              { handle: "@amymorgans", name: "Amy Morgans", badge: "ACTIVE", likes: "5M", likesChange: "+45%", followers: "18K", followersChange: "+195%" },
              { handle: "@myiq_com", name: "My IQ · Boost Your Brain", badge: "ACTIVE", likes: "2M", likesChange: "+3%", followers: "4K", followersChange: "+19%" },
              { handle: "@holmisthename", name: "Stock video", badge: "ACTIVE", likes: "8M", likesChange: "+45%", followers: "12.6K", followersChange: "+45%" },
            ].map((card, i) => (
              <div key={i} className="w-[260px] bg-[#f8f8fa] rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                {/* Profile header */}
                <div className="p-4 pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-[12px]">
                      {card.handle[1].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{card.handle}</p>
                      <p className="text-[11px] text-[#999] truncate">{card.name}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="aspect-square bg-gradient-to-br from-[#e8e8ee] to-[#d0d0d8] flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center">
                    <PlayIcon />
                  </div>
                </div>

                {/* Stats */}
                <div className="p-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-[#999] uppercase font-medium mb-0.5">Likes</p>
                    <p className="text-[16px] font-bold text-[#1a1a1a]">{card.likes}</p>
                    <p className="text-[11px] font-semibold text-green-500">{card.likesChange}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#999] uppercase font-medium mb-0.5">Followers</p>
                    <p className="text-[16px] font-bold text-[#1a1a1a]">{card.followers}</p>
                    <p className="text-[11px] font-semibold text-green-500">{card.followersChange}</p>
                  </div>
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
   READY TO DOMINATE CTA
   ═══════════════════════════════════════════ */

function DominateCTA() {
  return (
    <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#667eea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#818cf8]/8 rounded-full blur-[120px]" />
      </div>

      <div className="container-main text-center relative z-10">
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
          Ready to dominate<br />your category?
        </h2>
        <p className="text-[16px] text-[#888] max-w-lg mx-auto mb-10">
          The best AI UGC library with 1,000+ AI Actors
        </p>
        <a href="#" className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-10 py-4 rounded-full text-[16px] hover:bg-gray-100 transition-colors">
          <SparkleIcon className="w-4 h-4" />
          Create Your AI Ad
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */

function Pricing() {
  const [yearly, setYearly] = useState(false);

  const features = [
    { name: "300+ realistic AI creators", all: true },
    { name: "35+ language available", all: true },
    { name: "Fast 2-min processing", all: true },
    { name: "Sora 2", all: true },
    { name: "Veo3 (up to 25s)", all: true },
    { name: "Bulk content creation", all: true },
    { name: "B-roll generator", all: true },
    { name: "Image generator", all: true },
    { name: "Batch Mode", all: true },
    { name: "AI Image Ads", all: true },
  ];

  const proOnly = [
    "Product in hand",
    "Custom AI avatar",
    "Video Agent",
    "AI Image Ads",
    "PDF to Video",
  ];

  const plans = [
    {
      name: "Startup",
      desc: "For creators getting started",
      price: yearly ? "$39" : "$49",
      videos: yearly ? "60 AI-generated videos" : "5 AI-generated videos",
      cta: "start for $1",
      best: false,
      hasPro: false,
    },
    {
      name: "Growth",
      desc: "Testing many creatives a month",
      price: yearly ? "$59" : "$69",
      videos: yearly ? "120 AI-generated videos" : "10 AI-generated videos",
      cta: "Choose plan",
      best: false,
      hasPro: false,
    },
    {
      name: "Pro",
      desc: "For growing teams and power users",
      price: yearly ? "$99" : "$119",
      videos: yearly ? "240 AI-generated videos" : "20 AI-generated videos",
      cta: "Choose plan",
      best: true,
      hasPro: true,
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-[#f8f8fa]">
      <div className="container-main">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">Pricing plans</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-10 tracking-tight">
          Start creating UGC today
        </h2>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-[14px] font-medium ${!yearly ? "text-[#1a1a1a]" : "text-[#bbb]"}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`relative w-12 h-6 rounded-full transition-colors ${yearly ? "bg-[#1a1a1a]" : "bg-[#ddd]"}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${yearly ? "translate-x-6.5" : "translate-x-0.5"}`} />
          </button>
          <span className={`text-[14px] font-medium ${yearly ? "text-[#1a1a1a]" : "text-[#bbb]"}`}>
            Yearly <span className="text-[#17b26a] text-[12px] font-semibold">-20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-2xl p-6 border bg-white relative ${plan.best ? "border-[#1a1a1a] shadow-lg" : "border-gray-200"}`}>
              {plan.best && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Best Value
                </div>
              )}
              <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-0.5">{plan.name}</h3>
              <p className="text-[13px] text-[#999] mb-4">{plan.desc}</p>
              <div className="mb-1">
                <span className="text-[36px] font-extrabold text-[#1a1a1a]">{plan.price}</span>
                <span className="text-[14px] text-[#999]">/month</span>
              </div>
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-5">{plan.videos}</p>
              <a href="#" className={`block text-center py-3 rounded-full font-semibold text-[14px] mb-5 transition-all ${plan.best ? "bg-[#1a1a1a] text-white hover:bg-[#333]" : "border border-gray-300 text-[#1a1a1a] hover:border-[#999]"}`}>
                {plan.cta}
              </a>
              <div className="space-y-2.5">
                {features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-[13px] text-[#555]">{f.name}</span>
                  </div>
                ))}
                {proOnly.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    {plan.hasPro ? <CheckIcon /> : <XMarkIcon />}
                    <span className={`text-[13px] ${plan.hasPro ? "text-[#555]" : "text-[#ccc]"}`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════ */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "How long does a video take to generate?", a: "After inputting a script, talking head videos take between 2-10 minutes to process. AI hook videos take between 5-10 seconds. Custom avatars can take up to 1 hour to train. If your video takes longer than this please contact support on help@creafy.ai" },
    { q: "Can AI hold my product?", a: "Yes, Creafy allows you to hold, showcase, and even consume your product. Once created, you can make videos in minutes using standard templated videos. Please note this feature is only available for PRO, Launch or enterprise plan users." },
    { q: "If I edit an already generated video, will it be considered a new video/take a video credit?", a: "Yes, because the video has already been generated, and we allow you to preview the script beforehand to avoid mistakes. However, if the issue is due to a system error or creator malfunction, we will refund the credit back to your account." },
    { q: "What should I do if my video is taking too long to generate?", a: "While Creafy focuses on fast video production, if you do encounter any delays exceeding the timings below. Talking head videos take between 2-10 minutes to process. AI hook videos take between 5-10 seconds. Custom avatars can take up to 1 hour to train. Please contact support in the bottom right of the screen or on help@creafy.ai." },
    { q: "How do I upgrade my plan?", a: "You can upgrade your plan at any time during your account settings, your current credits will be rolled over into your new plan combining both credits. Upgrading will initiate a new billing cycle." },
    { q: "How can I cancel?", a: "Creafy offers a cancel at any time plan, you can cancel your plan through the subscription tab. Upon cancellation, your subscription remains active until the end of the current billing cycle." },
    { q: "Are there any limits on the use of ads made with Creafy?", a: "No, there are no limitations. You own all of your creatives, even after your plan ends, and can use them across any channel without restrictions. All stock footage utilized in Creafy is royalty-free." },
    { q: "What will I get with a subscription plan?", a: "Each subscription plan provides a specific number of videos monthly or annually and access to Creafy\u2019s features and video licensing, this includes AI video creation, ad maker, script maker and access to over 150+ avatars." },
    { q: "How can I change my plan?", a: "You can change your plan at any time through your account settings on the subscription tab. If you do need any help please contact us on help@creafy.ai" },
    { q: "Is there a trial for Creafy?", a: "We don\u2019t offer a free trial at the moment, but you can still try Creafy with confidence. If you sign up and decide it\u2019s not the right fit before using your subscription, we\u2019ll happily refund you\u2014no questions asked." },
    { q: "Do you offer a refund?", a: "Yes, we do but for full details, please refer to our refund policy." },
    { q: "How to create videos in Batch Mode?", a: "You can create videos in Batch Mode by going to Talking Actors in the dashboard, selecting multiple creators at once, and then clicking Generate." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-main max-w-[720px]">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">FAQ</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-10 tracking-tight">
          We&apos;ve covered everything
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#f8f8fa] rounded-xl border border-gray-200 overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 text-left gap-3" onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-[14px] font-medium text-[#1a1a1a]">{faq.q}</span>
                <ChevronDown className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-[13px] text-[#888] leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#1a1a1a] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-[12px]">C</span>
              </div>
              <span className="text-[16px] font-semibold text-[#1a1a1a]">creafy</span>
            </div>
            <p className="text-[12px] text-[#888] leading-relaxed">
              Create winning ads with AI. Write your script, pick an avatar, generate video.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#999] mb-3 tracking-wider">Features</h4>
            <div className="space-y-1.5">
              {["AI UGC Generator", "AI Avatars", "Text to Speech", "AI Facebook Ads", "AI TikTok Ads", "AI Lip-sync", "AI Product Video", "AI Actors", "AI Ads", "AI Video API"].map((l, i) => (
                <a key={i} href="#" className="block text-[12px] text-[#888] hover:text-[#1a1a1a] transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#999] mb-3 tracking-wider">Industries</h4>
            <div className="space-y-1.5">
              {["E-Commerce", "SaaS", "Mobile Apps", "Lead Generation", "Marketing Agencies", "Insurance", "Real Estate", "Law Firm"].map((l, i) => (
                <a key={i} href="#" className="block text-[12px] text-[#888] hover:text-[#1a1a1a] transition-colors">{l}</a>
              ))}
            </div>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#999] mb-3 tracking-wider">Free Tools</h4>
            <div className="space-y-1.5">
              <a href="#" className="block text-[12px] text-[#888] hover:text-[#1a1a1a] transition-colors">AI Hook Generator</a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#999] mb-3 tracking-wider">Resources</h4>
            <div className="space-y-1.5">
              {["Blog", "Contact", "AI YouTube Videos", "AI TikTok Videos", "AI Facebook Ads", "Ad Creative Testing", "Use Cases"].map((l, i) => (
                <a key={i} href="#" className="block text-[12px] text-[#888] hover:text-[#1a1a1a] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#999]">&copy; 2026 Creafy.ai</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-[#999] hover:text-[#1a1a1a] transition-colors">Guides & Support</a>
            <a href="#" className="text-[12px] text-[#999] hover:text-[#1a1a1a] transition-colors">Terms & Conditions</a>
            <a href="#" className="text-[12px] text-[#999] hover:text-[#1a1a1a] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BetterVideoAds />
      <CampaignResults />
      <AIActors />
      <ProductInHand />
      <AIVideoEditing />
      <EmotionControl />
      <LocalizeLanguages />
      <BuildAIAgent />
      <Pricing />
      <FAQ />
      <DominateCTA />
      <Footer />
    </main>
  );
}
