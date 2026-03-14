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

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 0l1.5 5.5L15 8l-5.5 1.5L8 15l-1.5-5.5L1 8l5.5-1.5z" fill="#818cf8" />
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
    <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[9/16] w-[38vw] md:w-[220px] shrink-0">
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
          The fastest way to create{" "}
          <span className="gradient-text">AI videos</span>
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
   TRUST METRICS
   ═══════════════════════════════════════════ */

function TrustMetrics() {
  return (
    <section className="py-14 bg-[#F6F6F8]">
      <div className="container-main">
        <p className="text-center text-[13px] text-[#999] font-medium mb-8 tracking-wide uppercase">
          Trusted by 300+ brands with $100M+ in revenue
        </p>

        {/* Scrolling logos */}
        <div className="overflow-hidden mb-12">
          <div className="flex gap-10 animate-scroll-left">
            {[...Array(2)].map((_, s) => (
              <div key={s} className="flex gap-10 items-center shrink-0">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="w-20 h-7 bg-gray-100 rounded shrink-0" />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { stat: "300k+", label: "Videos generated", desc: "Trusted by creators and brands worldwide." },
            { stat: "3.1x", label: "Average ROAS", desc: "Proven results that boost every campaign." },
            { stat: "2m 20s", label: "Average generation time", desc: "From idea to finished video. Instantly." },
          ].map((item, i) => (
            <div key={i} className="card-border p-6 text-center">
              <p className="text-[32px] font-extrabold text-[#1a1a1a] mb-0.5">{item.stat}</p>
              <p className="text-[15px] font-semibold text-[#1a1a1a] mb-1.5">{item.label}</p>
              <p className="text-[13px] text-[#999]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    { title: "Write or generate your script", desc: "Enter or automatically generate a script that aligns with your brand\u2019s message to personalize your AI-generated video." },
    { title: "Choose from 300+ AI actors", desc: "Select the perfect AI actor to represent your message and build visual consistency across every campaign." },
    { title: "Generate your video", desc: "Combine the selected avatar and script to quickly produce a high-quality, personalized video for your brand in minutes." },
  ];

  return (
    <section className="py-16 bg-[#F6F6F8]">
      <div className="container-main">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">Never been easier</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-12 tracking-tight">
          Create AI UGC videos in minutes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="card-border overflow-hidden">
              <div className="aspect-[4/3] bg-[#f7f7f8] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-[14px]">{i + 1}</div>
                  <p className="text-[12px] text-[#bbb]">Step {i + 1}</p>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 50+ Languages banner */}
        <div className="mt-12 rounded-2xl bg-[#f7f7f8] p-8 md:p-10 text-center border border-gray-100">
          <h3 className="text-[28px] md:text-[36px] font-extrabold text-[#1a1a1a] mb-2 tracking-tight">50+ Languages</h3>
          <p className="text-[15px] text-[#888]">Instantly localize your videos with native voices and perfect lip-sync.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */

function Features() {
  return (
    <section className="py-16 bg-[#f7f7f8]">
      <div className="container-main text-center">
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] mb-4 tracking-tight">
          Integrate AI ad creation into every marketing workflow
        </h2>
        <p className="text-[15px] text-[#888] max-w-2xl mx-auto mb-8">
          7 AI agents for AI ads: recreate TikTok/Facebook, generate hooks/briefs/scripts, translate, and upload — no tool-switching.
        </p>
        <a href="#" className="btn-dark px-8 py-3.5">
          Create Ad For $1
        </a>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Recreate TikTok Ads", "Recreate Facebook Ads", "Generate Hooks", "Generate Briefs", "Generate Scripts", "Translate Videos"].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 text-left">
              <div className="aspect-video bg-[#f7f7f8] rounded-lg mb-3 flex items-center justify-center">
                <p className="text-[12px] text-[#ccc]">{f}</p>
              </div>
              <p className="text-[14px] font-semibold text-[#1a1a1a]">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CASE STUDIES
   ═══════════════════════════════════════════ */

function CaseStudies() {
  const cases = [
    { name: "Waynes Reeves", title: "Founder", quote: "3X\u20134X ROAS across campaigns, with +10% upsell post-purchase baked in." },
    { name: "Eileen Lee", title: "Senior marketing Nano Foam", quote: "$19K in ad spend \u2192 $69K in total sales with a 3.73x ROAS" },
    { name: "Jordan Welch", title: "DTC Brand Owner", quote: "Running AI ads since May 2 \u2014 strong performance on a high-fatigue product using green screen avatars over B-roll footage." },
  ];

  return (
    <section className="py-16 bg-[#F6F6F8]">
      <div className="container-main">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">Our cases</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-12 tracking-tight">
          Best results with Creafy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div key={i} className="card-border p-5">
              <div className="aspect-[9/16] bg-[#f0f0f0] rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1a1a"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="w-16 h-5 bg-gray-100 rounded mb-3" />
              <p className="text-[14px] text-[#444] mb-4 leading-relaxed italic">&ldquo;{c.quote}&rdquo;</p>
              <p className="text-[14px] font-bold text-[#1a1a1a]">{c.name}</p>
              <p className="text-[12px] text-[#999]">{c.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   VIDEO AGENT
   ═══════════════════════════════════════════ */

function VideoAgent() {
  const steps = [
    { title: "Upload a reference video", desc: "Give the agent a sample ad so it can understand the structure, pacing, and style you want." },
    { title: "Let the agent do the work", desc: "It analyzes the reference and rebuilds the flow using your product and creator images." },
    { title: "Get a test-ready ad", desc: "You receive a fully recreated video that you can edit, customize, and launch immediately." },
  ];

  return (
    <section className="py-16 bg-[#f7f7f8]">
      <div className="container-main">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">#1 AI Ad Agent</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-3 tracking-tight">
          Meet Video Agent
        </h2>
        <p className="text-[15px] text-[#888] text-center mb-12">
          Create viral content with our Video Agent
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="aspect-[4/3] bg-[#f7f7f8] rounded-lg mb-5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-[14px]">{i + 1}</div>
                  <p className="text-[12px] text-[#bbb]">Step {i + 1}</p>
                </div>
              </div>
              <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-2">{s.title}</h3>
              <p className="text-[13px] text-[#888] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
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
    <section id="pricing" className="py-16 bg-[#F6F6F8]">
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
    <section className="py-16 bg-[#f7f7f8]">
      <div className="container-main max-w-[720px]">
        <p className="text-[13px] text-[#999] font-medium text-center mb-2">FAQ</p>
        <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#1a1a1a] text-center mb-10 tracking-tight">
          We&apos;ve covered everything
        </h2>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
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
   FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section className="py-20 bg-[#1a1a1a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-[100px]" />
      </div>
      <div className="container-main text-center relative z-10">
        <p className="text-[13px] text-[#888] font-medium mb-3">Start now</p>
        <h2 className="text-[28px] md:text-[42px] font-extrabold text-white mb-3 tracking-tight">
          Make your video in seconds
        </h2>
        <p className="text-[15px] text-[#888] max-w-md mx-auto mb-8">
          Watch how fast AI makes content people can&apos;t scroll past
        </p>
        <a href="#" className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] font-bold px-8 py-4 rounded-full text-[16px] hover:bg-gray-100 transition-colors">
          Create Ad For $1
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SEO LINKS
   ═══════════════════════════════════════════ */

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
    <section className="py-8 bg-[#F6F6F8] border-t border-gray-100">
      <div className="container-main">
        <div className="flex flex-wrap gap-x-1 gap-y-1 justify-center">
          {links.map((l, i) => (
            <a key={i} href="#" className="text-[11px] text-[#ccc] hover:text-[#888] transition-colors">
              {l}{i < links.length - 1 && <span className="mx-1.5 text-[#e0e0e0]">|</span>}
            </a>
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
    <footer className="py-14 bg-[#1a1a1a] text-white">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
                <span className="text-[#1a1a1a] font-bold text-[12px]">C</span>
              </div>
              <span className="text-[16px] font-semibold">creafy</span>
            </div>
            <p className="text-[12px] text-[#888]">
              Write your script → Pick an avatar → Generate video
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#666] mb-3 tracking-wider">Main</h4>
            <div className="space-y-1.5">
              {["Home", "Features", "Affiliate", "Pricing", "Languages", "Ad Toolkit", "Blog", "API access"].map((l, i) => (
                <a key={i} href="#" className="block text-[13px] text-[#888] hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#666] mb-3 tracking-wider">Legal</h4>
            <div className="space-y-1.5">
              {["Terms of Services", "Privacy Policy", "Refund Policy", "Fair Use Policy", "Custom Avatar Policy", "Trial Policy"].map((l, i) => (
                <a key={i} href="#" className="block text-[13px] text-[#888] hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase text-[#666] mb-3 tracking-wider">Address</h4>
            <p className="text-[13px] text-[#888] mb-4 leading-relaxed">
              45 Fitzroy Street,<br />Fitzrovia, London<br />W1T 6EB
            </p>
            <h4 className="text-[11px] font-bold uppercase text-[#666] mb-1.5 tracking-wider">Need help?</h4>
            <a href="mailto:help@creafy.ai" className="text-[13px] text-white hover:underline">help@creafy.ai</a>
          </div>
        </div>

        <div className="border-t border-[#333] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#666]">&copy; 2025 Creafy. All rights Reserved.</p>
          <div className="flex items-center gap-4">
            {/* X */}
            <a href="#" className="text-[#666] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* TikTok */}
            <a href="#" className="text-[#666] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.11V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.01a8.16 8.16 0 003.76.92V6.69z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-[#666] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-[#666] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
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
      <TrustMetrics />
      <HowItWorks />
      <Features />
      <CaseStudies />
      <VideoAgent />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <SEOLinks />
      <Footer />
    </main>
  );
}
