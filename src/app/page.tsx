"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════ */

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#17b26a" />
    <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#f04438" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="#FFD700">
    <path d="M10 1l2.39 4.84L17.8 6.7l-3.9 3.8.92 5.36L10 13.37l-4.82 2.5.92-5.36-3.9-3.8 5.41-.86z" />
  </svg>
);

/* ═══════════════════════════════════════════════
   TYPING ANIMATION HOOK
   ═══════════════════════════════════════════════ */

function useTypingAnimation(words: string[], typingSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deleteSpeed, pauseTime]);

  return displayText;
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-[var(--color-dark)]">
          <span className="text-[var(--color-primary)]">Creafy</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors"
              onClick={() => setFeaturesOpen(!featuresOpen)}
            >
              Features <ChevronDown />
            </button>
            {featuresOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px]">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Talking Actor</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Custom AI Avatar</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">B-roll video</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Product In Hand</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-50">Gestures video</a>
              </div>
            )}
          </div>
          <a href="#" className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">Affiliate</a>
          <a href="#pricing" className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">Languages</a>
          <a href="#" className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors">Enterprise</a>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#" className="text-sm font-medium text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors px-4 py-2">Login</a>
          <a href="#" className="btn-primary text-sm !py-2.5 !px-5">Get Started</a>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4">
          <div className="section-container flex flex-col gap-4">
            <a href="#" className="text-sm font-medium">Features</a>
            <a href="#" className="text-sm font-medium">Affiliate</a>
            <a href="#pricing" className="text-sm font-medium">Pricing</a>
            <a href="#" className="text-sm font-medium">Languages</a>
            <a href="#" className="text-sm font-medium">Enterprise</a>
            <div className="flex gap-3 pt-2">
              <a href="#" className="text-sm font-medium">Login</a>
              <a href="#" className="btn-primary text-sm !py-2 !px-4">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
  const typingText = useTypingAnimation(["Agency", "App", "TikTok", "DTC", "SaaS"], 100, 50, 2000);

  return (
    <section className="pt-28 pb-16 bg-white">
      <div className="section-container text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-dark)] leading-tight mb-6">
          Create AI videos for your{" "}
          <span className="text-[var(--color-primary)] typing-cursor">{typingText}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          The fastest way to create AI videos
        </p>
        <p className="text-base text-gray-500 mb-8">
          Write your script → Pick an avatar → Generate video
        </p>
        <a href="#" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
          Create your Ad For $1
          <ArrowRight />
        </a>
      </div>

      {/* Video placeholder */}
      <div className="section-container mt-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 aspect-video max-w-4xl mx-auto border border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p className="text-gray-500">Product demo video</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TRUST METRICS
   ═══════════════════════════════════════════════ */

function TrustMetrics() {
  return (
    <section className="py-16 bg-white">
      <div className="section-container">
        <p className="text-center text-gray-500 mb-10 text-sm font-medium">
          Trusted by 300+ brands with $100M+ in revenue
        </p>

        {/* Brand logos scrolling */}
        <div className="overflow-hidden mb-12">
          <div className="flex gap-12 animate-scroll-left">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-12 items-center shrink-0">
                {["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6", "Brand 7", "Brand 8"].map((brand, i) => (
                  <div key={i} className="w-24 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400 shrink-0">
                    {brand}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { stat: "300k+", label: "Videos generated", desc: "Trusted by creators and brands worldwide." },
            { stat: "3.1x", label: "Average ROAS", desc: "Proven results that boost every campaign." },
            { stat: "2m 20s", label: "Average generation time", desc: "From idea to finished video. Instantly." },
          ].map((item, i) => (
            <div key={i} className="card-gradient p-6 text-center">
              <p className="text-4xl font-bold text-[var(--color-primary)] mb-1">{item.stat}</p>
              <p className="text-lg font-semibold text-[var(--color-dark)] mb-2">{item.label}</p>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════ */

function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-[var(--color-primary)] font-medium text-sm mb-2">Never been easier</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Create AI UGC videos in minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Write or generate your script",
              desc: "Enter or automatically generate a script that aligns with your brand's message to personalize your AI-generated video.",
            },
            {
              step: "2",
              title: "Choose from 300+ AI actors",
              desc: "Select the perfect AI actor to represent your message and build visual consistency across every campaign.",
            },
            {
              step: "3",
              title: "Generate your video",
              desc: "Combine the selected avatar and script to quickly produce a high-quality, personalized video for your brand in minutes.",
            },
          ].map((item, i) => (
            <div key={i} className="card-gradient p-6">
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 mb-6 flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg">{item.step}</div>
                  <p className="text-gray-400 text-sm">Step {item.step} image</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark)] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Languages banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 md:p-12 text-center border border-gray-100">
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">50+ Languages</h3>
          <p className="text-gray-500 text-lg">Instantly localize your videos with native voices and perfect lip-sync.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FEATURES SECTION
   ═══════════════════════════════════════════════ */

function FeaturesSection() {
  return (
    <section className="py-20" style={{ background: "linear-gradient(180deg, rgba(221, 196, 236, 0.2) 0%, rgba(209, 192, 237, 0.1) 69.23%, rgba(46, 144, 250, 0.1) 100%)" }}>
      <div className="section-container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
          Integrate AI ad creation into every marketing workflow
        </h2>
        <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-8">
          7 AI agents for AI ads: recreate TikTok/Facebook, generate hooks/briefs/scripts, translate, and upload — no tool-switching.
        </p>
        <a href="#" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
          Create Ad For $1
          <ArrowRight />
        </a>

        {/* Feature grid placeholder */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Recreate TikTok Ads",
            "Recreate Facebook Ads",
            "Generate Hooks",
            "Generate Briefs",
            "Generate Scripts",
            "Translate Videos",
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 mb-4 flex items-center justify-center">
                <p className="text-gray-400 text-sm">{feature}</p>
              </div>
              <p className="font-semibold text-[var(--color-dark)]">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CASE STUDIES
   ═══════════════════════════════════════════════ */

function CaseStudies() {
  const cases = [
    {
      name: "Waynes Reeves",
      title: "Founder",
      quote: "3X\u20134X ROAS across campaigns, with +10% upsell post-purchase baked in.",
    },
    {
      name: "Eileen Lee",
      title: "Senior marketing Nano Foam",
      quote: "$19K in ad spend \u2192 $69K in total sales with a 3.73x ROAS",
    },
    {
      name: "Jordan Welch",
      title: "DTC Brand Owner",
      quote: "Running AI ads since May 2 \u2014 strong performance on a high-fatigue product using green screen avatars over B-roll footage.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-[var(--color-primary)] font-medium text-sm mb-2">Our cases</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Best results with Creafy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="card-gradient p-6">
              {/* Video placeholder */}
              <div className="w-full aspect-[9/16] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="text-gray-400 text-sm">Case study video</p>
                </div>
              </div>
              {/* Brand logo placeholder */}
              <div className="w-20 h-6 bg-gray-200 rounded mb-4" />
              <p className="text-[var(--color-dark)] font-medium mb-4 italic">&ldquo;{c.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-[var(--color-dark)]">{c.name}</p>
                <p className="text-sm text-gray-500">{c.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   VIDEO AGENT
   ═══════════════════════════════════════════════ */

function VideoAgent() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-[var(--color-primary)] font-medium text-sm mb-2">#1 AI Ad Agent</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3">
            Meet Video Agent
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Create viral content with our Video Agent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Upload a reference video",
              desc: "Give the agent a sample ad so it can understand the structure, pacing, and style you want.",
            },
            {
              step: "2",
              title: "Let the agent do the work",
              desc: "It analyzes the reference and rebuilds the flow using your product and creator images.",
            },
            {
              step: "3",
              title: "Get a test-ready ad",
              desc: "You receive a fully recreated video that you can edit, customize, and launch immediately.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 mb-6 flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg">{item.step}</div>
                  <p className="text-gray-400 text-sm">Step {item.step} image</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark)] mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════ */

function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyPlans = [
    {
      name: "Startup",
      price: "$49",
      period: "/month",
      desc: "For creators getting started",
      videos: "5 AI-generated videos",
      features: [
        { name: "300+ realistic AI creators", included: true },
        { name: "35+ language available", included: true },
        { name: "Fast 2-min processing", included: true },
        { name: "Sora 2", included: true },
        { name: "Veo3 (up to 25s)", included: true },
        { name: "Bulk content creation", included: true },
        { name: "B-roll generator", included: true },
        { name: "Image generator", included: true },
        { name: "Batch Mode", included: true },
        { name: "AI Image Ads", included: true },
        { name: "Product in hand", included: false },
        { name: "Video Agent", included: false },
        { name: "PDF to Video", included: false },
      ],
      cta: "start for $1",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$69",
      period: "/month",
      desc: "Testing many creatives a month",
      videos: "10 AI-generated videos",
      features: [
        { name: "300+ realistic AI creators", included: true },
        { name: "35+ language available", included: true },
        { name: "Fast 2-min processing", included: true },
        { name: "Sora 2", included: true },
        { name: "Veo3 (up to 25s)", included: true },
        { name: "Bulk content creation", included: true },
        { name: "B-roll generator", included: true },
        { name: "Image generator", included: true },
        { name: "Batch Mode", included: true },
        { name: "AI Image Ads", included: true },
        { name: "Product in hand", included: false },
        { name: "Video Agent", included: false },
        { name: "PDF to Video", included: false },
      ],
      cta: "Choose plan",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$119",
      period: "/month",
      desc: "For growing teams and power users",
      videos: "20 AI-generated videos",
      features: [
        { name: "300+ realistic AI creators", included: true },
        { name: "35+ language available", included: true },
        { name: "Fast 2-min processing", included: true },
        { name: "Sora 2", included: true },
        { name: "Veo3 (up to 25s)", included: true },
        { name: "Bulk content creation", included: true },
        { name: "B-roll generator", included: true },
        { name: "Image generator", included: true },
        { name: "Batch Mode", included: true },
        { name: "Product in hand", included: true },
        { name: "Custom AI avatar", included: true },
        { name: "Video Agent", included: true },
        { name: "AI Image Ads", included: true },
        { name: "PDF to Video", included: true },
      ],
      cta: "Choose plan",
      highlight: true,
    },
  ];

  const yearlyPlans = [
    {
      name: "Startup",
      price: "$39",
      period: "/month",
      desc: "For creators getting started",
      videos: "60 AI-generated videos",
      features: monthlyPlans[0].features,
      cta: "start for $1",
      highlight: false,
    },
    {
      name: "Growth",
      price: "$59",
      period: "/month",
      desc: "Testing many creatives a month",
      videos: "120 AI-generated videos",
      features: monthlyPlans[1].features,
      cta: "Choose plan",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$99",
      period: "/month",
      desc: "For growing teams and power users",
      videos: "240 AI-generated videos",
      features: monthlyPlans[2].features,
      cta: "Choose plan",
      highlight: true,
    },
  ];

  const plans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-[var(--color-primary)] font-medium text-sm mb-2">Pricing plans</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            Start creating UGC today
          </h2>
        </div>

        {/* Toggle Monthly / Yearly */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isYearly ? "text-[var(--color-dark)]" : "text-gray-400"}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? "bg-[var(--color-primary)]" : "bg-gray-300"}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${isYearly ? "translate-x-7.5" : "translate-x-0.5"}`} />
          </button>
          <span className={`text-sm font-medium ${isYearly ? "text-[var(--color-dark)]" : "text-gray-400"}`}>
            Yearly <span className="text-[var(--color-green)] text-xs font-semibold">-20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border ${plan.highlight ? "border-[var(--color-primary)] shadow-lg shadow-blue-100 relative" : "border-gray-200"} bg-white`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
              )}
              <h3 className="text-xl font-bold text-[var(--color-dark)] mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[var(--color-dark)]">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <p className="text-sm font-medium text-[var(--color-primary)] mb-6">{plan.videos}</p>
              <a
                href="#"
                className={`w-full mb-6 ${plan.highlight ? "btn-primary" : "btn-outline"} block text-center`}
              >
                {plan.cta}
              </a>
              <div className="space-y-3">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-center gap-2">
                    {f.included ? <CheckIcon /> : <XIcon />}
                    <span className={`text-sm ${f.included ? "text-[var(--color-dark)]" : "text-gray-400"}`}>
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise */}
        <div className="rounded-2xl border border-gray-200 p-8 bg-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-dark)] mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-4">{isYearly ? "Done-For-You Ad Production" : "For brands who need more"}</p>
              <div className="space-y-2">
                {(isYearly
                  ? [
                      "Fully managed ad creation, end-to-end",
                      "Strategy, AI ad creation, voice, and full editing handled by our team",
                      "Ready-to-run ads delivered. No logins, no editing, no creator management",
                      "Built for brands preparing to scale or already running paid media",
                    ]
                  : [
                      "Everything in Pro",
                      "Dedicated Slack channel",
                      "Creative strategist",
                      "ElevenLabs voice integration",
                      "1-on-1 strategy calls",
                      "Fully edited videos",
                      "Done-For-You (DFY) service",
                      "API Access",
                    ]
                ).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-sm text-[var(--color-dark)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="#" className="btn-primary whitespace-nowrap">Book a call</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════ */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does a video take to generate?",
      a: "After inputting a script, talking head videos take between 2-10 minutes to process. AI hook videos take between 5-10 seconds. Custom avatars can take up to 1 hour to train. If your video takes longer than this please contact support on help@creafy.ai",
    },
    {
      q: "Can AI hold my product?",
      a: "Yes, Creafy allows you to hold, showcase, and even consume your product. Once created, you can make videos in minutes using standard templated videos. Please note this feature is only available for PRO, Launch or enterprise plan users.",
    },
    {
      q: "If I edit an already generated video, will it be considered a new video/take a video credit?",
      a: "Yes, because the video has already been generated, and we allow you to preview the script beforehand to avoid mistakes. However, if the issue is due to a system error or creator malfunction, we will refund the credit back to your account.",
    },
    {
      q: "What should I do if my video is taking too long to generate?",
      a: "While Creafy focuses on fast video production, if you do encounter any delays exceeding the timings below. Talking head videos take between 2-10 minutes to process. AI hook videos take between 5-10 seconds. Custom avatars can take up to 1 hour to train. Please contact support in the bottom right of the screen or on help@creafy.ai. Note: during peak hours video generation can take up to double the time stated above, if you issue does persist, please contact support.",
    },
    {
      q: "How do I upgrade my plan?",
      a: "You can upgrade your plan at any time during your account settings, your current credits will be rolled over into your new plan combining both credits. Upgrading will initiate a new billing cycle.",
    },
    {
      q: "How can I cancel?",
      a: "Creafy, offers a cancel at any time plan, you can cancel your plan through the subscription tab. Upon cancellation, your subscription remains active until the end of the current billing cycle.",
    },
    {
      q: "Are there any limits on the use of ads made with Creafy?",
      a: "No, there are no limitations. You own all of your creatives, even after your plan ends, and can use them across any channel without restrictions. All stock footage utilized in Creafy is royalty-free.",
    },
    {
      q: "What will I get with a subscription plan?",
      a: "Each subscription plan provides a specific number of videos monthly or annually and access to Creafy\u2019s features and video licensing, this includes AI video creation, ad maker, script maker and access to over 150+ avatars.",
    },
    {
      q: "How can I change my plan?",
      a: "You can change your plan at any time through your account settings on the subscription tab. If you do need any help please contact us on help@creafy.ai",
    },
    {
      q: "Is there a trial for Creafy?",
      a: "We don\u2019t offer a free trial at the moment, but you can still try Creafy with confidence. If you sign up and decide it\u2019s not the right fit before using your subscription, we\u2019ll happily refund you\u2014no questions asked.",
    },
    {
      q: "Do you offer a refund?",
      a: "Yes, we do but for full details, please refer to our refund policy.",
    },
    {
      q: "How to create videos in Batch Mode?",
      a: "You can create videos in Batch Mode by going to Talking Actors in the dashboard, selecting multiple creators at once, and then clicking Generate.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-14">
          <p className="text-[var(--color-primary)] font-medium text-sm mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)]">
            We&apos;ve covered everything
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-medium text-[var(--color-dark)] pr-4">{faq.q}</span>
                <div className={`transition-transform shrink-0 ${openIndex === i ? "rotate-180" : ""}`}>
                  <ChevronDown />
                </div>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>
      <div className="section-container text-center relative z-10">
        <p className="text-blue-200 font-medium text-sm mb-3">Start now</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Make your video in seconds
        </h2>
        <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
          Watch how fast AI makes content people can&apos;t scroll past
        </p>
        <a href="#" className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] font-semibold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-colors">
          Create Ad For $1
          <ArrowRight />
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SEO LINKS
   ═══════════════════════════════════════════════ */

function SEOLinks() {
  const links = [
    "AI script-based video ads for healthcare brands",
    "AI-powered brand story creator with social proof overlay",
    "AI avatar testimonial maker for YouTube Shorts",
    "AI-powered brand story creator for real estate listings",
    "Interactive avatar video tool for B2B companies",
    "Convert text to UGC video for healthcare brands",
    "UGC automation software with testimonial carousel",
    "AI script-based video ads for explainer videos",
    "AI avatar testimonial maker with AI voice cloning",
    "Automated customer testimonial AI for B2B companies",
    "AI-powered brand story creator for course promotions",
    "Interactive avatar video tool with timed subtitles",
    "UGC automation software for travel agencies",
    "AI script-based video ads with branded intro",
    "AI avatar testimonial maker for retail brands",
    "Automated customer testimonial AI with call-to-action scenes",
    "AI-powered brand story creator for SaaS platforms",
    "Interactive avatar video tool for e-commerce",
    "UGC automation software in Portuguese",
    "AI script-based video ads in Korean",
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="section-container">
        <div className="flex flex-wrap gap-2 justify-center">
          {links.map((link, i) => (
            <a
              key={i}
              href="#"
              className="text-xs text-gray-400 hover:text-[var(--color-primary)] transition-colors"
            >
              {link}
              {i < links.length - 1 && <span className="ml-2 text-gray-300">|</span>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-16 bg-[var(--color-dark)] text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & tagline */}
          <div>
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-[var(--color-primary)]">Creafy</span>
            </h3>
            <p className="text-sm text-gray-400">
              Write your script → Pick an avatar → Generate video
            </p>
          </div>

          {/* Main */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Main</h4>
            <div className="space-y-2">
              {["Home", "Features", "Affiliate", "Pricing", "Languages", "Ad Toolkit", "Blog", "API access"].map((link, i) => (
                <a key={i} href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Legal</h4>
            <div className="space-y-2">
              {["Terms of Services", "Privacy Policy", "Refund Policy", "Fair Use Policy", "Custom Avatar Policy", "Trial Policy"].map((link, i) => (
                <a key={i} href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Address</h4>
            <p className="text-sm text-gray-300 mb-4">
              45 Fitzroy Street,<br />
              Fitzrovia, London<br />
              W1T 6EB
            </p>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-2">Need help?</h4>
            <a href="mailto:help@creafy.ai" className="text-sm text-[var(--color-primary)] hover:underline">help@creafy.ai</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">&copy; 2025 Creafy. All rights Reserved.</p>
          <div className="flex items-center gap-4">
            {/* X/Twitter */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* TikTok */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.01a8.16 8.16 0 003.76.92V6.69z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustMetrics />
      <HowItWorks />
      <FeaturesSection />
      <CaseStudies />
      <VideoAgent />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
      <SEOLinks />
      <Footer />
    </main>
  );
}
