import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import {
  ArrowUpRight, ChevronDown, Menu, X,
  Mail, Github, Linkedin, MapPin, Phone,
  ExternalLink, ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────────────────────────────────────── */
const T = {
  bg:       "#f4f3ee",
  card:     "#e9e8e2",
  ink:      "#111111",
  orange:   "#e8601a",
  teal:     "#2d9e8c",
  muted:    "#888880",
  border:   "rgba(0,0,0,0.09)",
  footerBg: "#111111",
  footerFg: "#f4f3ee",
};

const ME = {
  name:     "Krish Dhakal",
  role:     "AI/ML Engineer",
  location: "Pokhara, Nepal",
  email:    "krixh.dhakal@gmail.com",
  phone:    "+977 9864426265",
  linkedin: "https://www.linkedin.com/in/krish-dhakal/",
  github:   "https://github.com/krixhyz",
};

/* ─────────────────────────────────────────────────────────────────────────────
   ILLUSTRATED ICONS  (device-mockup style — flat, outlined, labelled)
   Inspired by the Phone / eReader / Tablet / Laptop / Desktop column style
   from the reference site.
───────────────────────────────────────────────────────────────────────────── */

/** Browser window — represents Full-Stack / Frontend work */
function IlluBrowser({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
      <rect x="4" y="4" width="72" height="52" rx="5" stroke={color} strokeWidth="1.6" />
      <path d="M4 16h72" stroke={color} strokeWidth="1.6" />
      <circle cx="14" cy="10" r="2.5" fill={color} opacity="0.35" />
      <circle cx="22" cy="10" r="2.5" fill={color} opacity="0.35" />
      <circle cx="30" cy="10" r="2.5" fill={color} opacity="0.35" />
      <rect x="36" y="6.5" width="32" height="7" rx="3" stroke={color} strokeWidth="1" opacity="0.25" />
      {/* code lines */}
      <path d="M14 26l6 5-6 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M28 38l12-16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <rect x="44" y="24" width="20" height="4" rx="2" fill={color} opacity="0.12" />
      <rect x="44" y="32" width="14" height="4" rx="2" fill={color} opacity="0.08" />
      <rect x="44" y="40" width="17" height="4" rx="2" fill={color} opacity="0.1" />
    </svg>
  );
}

/** Server tower — represents Backend / Laravel */
function IlluServer({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" className="w-full h-full">
      <rect x="8" y="6" width="44" height="20" rx="3" stroke={color} strokeWidth="1.6" />
      <rect x="8" y="30" width="44" height="20" rx="3" stroke={color} strokeWidth="1.6" />
      <rect x="8" y="54" width="44" height="20" rx="3" stroke={color} strokeWidth="1.6" />
      {/* rack detail — unit lights */}
      <circle cx="18" cy="16" r="3" fill={color} opacity="0.6" />
      <circle cx="18" cy="40" r="3" fill={color} opacity="0.4" />
      <circle cx="18" cy="64" r="3" fill={color} opacity="0.2" />
      {/* disk slots */}
      <rect x="26" y="13" width="20" height="6" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="26" y="37" width="20" height="6" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="26" y="61" width="20" height="6" rx="1" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* vents */}
      <path d="M26 14h3M30 14h3M34 14h3" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/** Stacked cylinders — represents Database */
function IlluDatabase({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" className="w-full h-full">
      <ellipse cx="30" cy="16" rx="22" ry="9" stroke={color} strokeWidth="1.6" />
      <path d="M8 16v16c0 4.97 9.85 9 22 9s22-4.03 22-9V16" stroke={color} strokeWidth="1.6" />
      <ellipse cx="30" cy="32" rx="22" ry="9" stroke={color} strokeWidth="1.6" />
      <path d="M8 32v16c0 4.97 9.85 9 22 9s22-4.03 22-9V32" stroke={color} strokeWidth="1.6" />
      <ellipse cx="30" cy="48" rx="22" ry="9" stroke={color} strokeWidth="1.6" />
      <path d="M8 48v8c0 4.97 9.85 9 22 9s22-4.03 22-9v-8" stroke={color} strokeWidth="1.6" />
      {/* data lines on top */}
      <path d="M20 14h5M27 14h7" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/** ETL pipeline / flowchart — represents Data Engineering */
function IlluPipeline({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      {/* Extract box */}
      <rect x="4" y="12" width="22" height="16" rx="3" stroke={color} strokeWidth="1.6" />
      <path d="M9 18h12M9 23h8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Transform box */}
      <rect x="29" y="32" width="22" height="16" rx="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.05" />
      <path d="M34 38l4 4 8-8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* Load box */}
      <rect x="54" y="52" width="22" height="16" rx="3" stroke={color} strokeWidth="1.6" />
      <path d="M59 58h12M59 63h8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Arrows */}
      <path d="M26 20l6 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
      <path d="M51 40l6 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
      {/* dots */}
      <circle cx="26" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="29" cy="32" r="2" fill={color} opacity="0.6" />
      <circle cx="51" cy="40" r="2" fill={color} opacity="0.6" />
      <circle cx="54" cy="52" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}



/** Laptop — represents deployment / full stack */
function IlluLaptop({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
      <rect x="10" y="6" width="60" height="38" rx="4" stroke={color} strokeWidth="1.6" />
      <rect x="16" y="11" width="48" height="27" rx="2" fill={color} fillOpacity="0.04" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* code on screen */}
      <path d="M21 20l5 4-5 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      <path d="M32 28h18" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.3" />
      <path d="M32 22h12" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.3" />
      {/* base */}
      <path d="M4 46h72l-4 8H8L4 46Z" stroke={color} strokeWidth="1.6" />
      <rect x="28" y="46" width="24" height="3" rx="1.5" fill={color} opacity="0.2" />
    </svg>
  );
}

/** Git branches — represents version control / workflow */
function IlluGit({ color = T.ink }: { color?: string }) {
  return (
    <svg viewBox="0 0 60 80" fill="none" className="w-full h-full">
      {/* main line */}
      <line x1="20" y1="14" x2="20" y2="66" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.3" />
      {/* branch */}
      <path d="M20 28 Q40 28 40 44" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* nodes */}
      <circle cx="20" cy="14" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
      <circle cx="20" cy="28" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
      <circle cx="20" cy="52" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
      <circle cx="20" cy="66" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
      <circle cx="40" cy="44" r="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2" />
      {/* labels */}
      <rect x="30" y="11" width="22" height="6" rx="3" stroke={color} strokeWidth="1" opacity="0.2" />
      <rect x="30" y="62" width="16" height="6" rx="3" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RIGHT PANEL  — vertical illustrated icon column, inspired by the
   Phone / eReader / Tablet / Laptop / Desktop side panel
───────────────────────────────────────────────────────────────────────────── */
const PANEL_ICONS = [
  { label: "Python",    Illu: IlluServer,   color: T.orange },
  { label: "NLP",       Illu: IlluBrowser,  color: T.teal },
  { label: "ML",        Illu: IlluDatabase, color: T.muted },
  { label: "ETL",       Illu: IlluPipeline, color: "#16a34a" },
];

function IconPanel() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="hidden lg:flex flex-col items-center gap-1 py-4 self-stretch justify-center"
      style={{ borderLeft: `1px solid ${T.border}`, paddingLeft: "2rem" }}>
      {PANEL_ICONS.map(({ label, Illu, color }, i) => (
        <motion.div key={label}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
          className="flex flex-col items-center gap-2 py-3 px-2 cursor-default group w-24"
          style={{ borderBottom: i < PANEL_ICONS.length - 1 ? `1px solid ${T.border}` : "none" }}>
          <motion.div animate={{ scale: active === i ? 1.08 : 1, color: active === i ? color : T.muted }}
            transition={{ duration: 0.25 }} className="w-12 h-12"
            style={{ color: T.muted }}>
            <Illu color={active === i ? color : T.muted} />
          </motion.div>
          <span className="font-['JetBrains_Mono'] text-[8px] tracking-[0.2em] uppercase transition-colors duration-200"
            style={{ color: active === i ? color : T.muted, opacity: active === i ? 1 : 0.5 }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────────────────── */
function Cursor() {
  const cx = useMotionValue(-200), cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 500, damping: 40 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40 });
  const tx = useSpring(cx, { stiffness: 110, damping: 22 });
  const ty = useSpring(cy, { stiffness: 110, damping: 22 });
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const mv = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); setVis(true); };
    const on = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a,button,[data-cur]")) setHov(true); };
    const off = (e: MouseEvent) => { if ((e.target as HTMLElement).closest("a,button,[data-cur]")) setHov(false); };
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseenter", on, true);
    document.addEventListener("mouseleave", off, true);
    return () => { window.removeEventListener("mousemove", mv); document.removeEventListener("mouseenter", on, true); document.removeEventListener("mouseleave", off, true); };
  }, [cx, cy]);
  if (!vis) return null;
  return (
    <div className="hidden md:block pointer-events-none">
      <motion.div className="fixed top-0 left-0 z-[9999] mix-blend-multiply"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}>
        <motion.div animate={{ width: hov ? 48 : 8, height: hov ? 48 : 8, borderRadius: hov ? "2px" : "50%", backgroundColor: hov ? T.orange : T.ink }}
          transition={{ duration: 0.15 }} />
      </motion.div>
      <motion.div className="fixed top-0 left-0 z-[9998]"
        style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%" }}>
        <motion.div animate={{ width: hov ? 0 : 32, height: hov ? 0 : 32 }} transition={{ duration: 0.15 }}
          style={{ borderRadius: "50%", border: `1px solid ${T.orange}60` }} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────────────────────────────────────── */
function Noise() {
  return <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025]"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "128px" }} />;
}

function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setP(d.scrollTop / (d.scrollHeight - d.clientHeight) || 0); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px]">
      <motion.div className="h-full origin-left" style={{ scaleX: p, backgroundColor: T.orange }} />
    </div>
  );
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function useScramble(target: string, go: boolean, spd = 16) {
  const [out, setOut] = useState(target);
  const raf = useRef(0);
  useEffect(() => {
    if (!go) return;
    let frame = 0;
    const total = target.length * spd;
    const tick = () => {
      frame++;
      const t = frame / total;
      setOut(target.split("").map((c, i) => c === " " ? " " : i / target.length < t ? c : CHARS[Math.floor(Math.random() * CHARS.length)]).join(""));
      if (frame < total) raf.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [go, target, spd]);
  return out;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const el = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 1300, start = performance.now();
        const tick = (now: number) => {
          const ease = 1 - Math.pow(1 - Math.min((now - start) / dur, 1), 3);
          setV(Math.round(ease * to));
          if (ease < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (el.current) obs.observe(el.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={el}>{v}{suffix}</span>;
}

function AnalogClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const s = t.getSeconds(), m = t.getMinutes(), h = t.getHours() % 12;
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-14 md:w-16 md:h-16 shrink-0">
      <circle cx="50" cy="50" r="46" fill="none" stroke={T.border} strokeWidth="1.5" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2, maj = i % 5 === 0;
        return <line key={i} x1={50 + (maj ? 35 : 41) * Math.cos(a)} y1={50 + (maj ? 35 : 41) * Math.sin(a)}
          x2={50 + 44 * Math.cos(a)} y2={50 + 44 * Math.sin(a)}
          stroke={maj ? T.ink : T.muted} strokeWidth={maj ? 1.5 : 0.5} strokeOpacity={maj ? 0.3 : 0.12} />;
      })}
      <line x1="50" y1="50" x2="50" y2="26" stroke={T.ink} strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${h * 30 + m * 0.5},50,50)`} />
      <line x1="50" y1="50" x2="50" y2="18" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${m * 6 + s * 0.1},50,50)`} />
      <line x1="50" y1="58" x2="50" y2="13" stroke={T.orange} strokeWidth="1" strokeLinecap="round" transform={`rotate(${s * 6},50,50)`} />
      <circle cx="50" cy="50" r="2.5" fill={T.orange} />
    </svg>
  );
}

const TICKER = ["Python", "Machine Learning", "NLP", "LLM Workflows", "Data Pipelines", "ETL", "Model Deployment", "MLOps", "Feature Engineering", "React", "FastAPI", "PostgreSQL", "Pokhara · Nepal", "Open to work"];
function Marquee({ dark = false }: { dark?: boolean }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden select-none py-3"
      style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : T.border}`, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : T.border}`, backgroundColor: dark ? T.footerBg : "transparent" }}>
      <motion.div className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        {items.map((item, i) => (
          <span key={i} className="font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase flex items-center gap-8"
            style={{ color: dark ? "rgba(244,243,238,0.22)" : T.muted }}>
            {item}<span style={{ color: T.orange, fontSize: "5px" }}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV  — icon + label items matching the reference site nav style
───────────────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Projects", icon: IlluBrowser },
  { label: "Skills",   icon: IlluServer },
  { label: "About",    icon: IlluGit },
  { label: "Contact",  icon: IlluPipeline },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }), 10);
  };
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{ backgroundColor: scrolled ? "rgba(244,243,238,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${T.border}` : "none" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => go("hero")} className="flex items-center gap-2.5 group" data-cur>
          <div className="w-7 h-7 relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-12"
            style={{ border: `1.5px solid ${T.ink}` }}>
            <div className="w-2.5 h-2.5" style={{ backgroundColor: T.orange }} />
          </div>
          <span className="font-['Oxanium'] font-bold text-sm tracking-[0.1em] uppercase" style={{ color: T.ink }}>Krish Dhakal</span>
        </button>

        {/* Desktop nav — icon + label style like reference */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button key={label} onClick={() => go(label)} data-cur
              className="flex items-center gap-2 px-3.5 py-2 transition-all duration-150 group min-h-[40px] relative"
              style={{ color: T.muted }}>
              {/* small illustrated icon */}
              <div className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity duration-150">
                <Icon color="currentColor" />
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase group-hover:text-black transition-colors">{label}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-px transition-all duration-200" style={{ backgroundColor: T.orange }} />
            </button>
          ))}
          <button onClick={() => go("contact")} data-cur
            className="ml-3 font-['Oxanium'] font-semibold text-[11px] tracking-widest uppercase px-5 py-2.5 flex items-center gap-2 min-h-[40px] transition-opacity hover:opacity-80"
            style={{ backgroundColor: T.orange, color: "#fff" }}>
            Hire Me <ArrowUpRight size={12} />
          </button>
        </nav>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} style={{ color: T.ink }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="md:hidden flex flex-col px-5 pb-6 pt-2 gap-0"
            style={{ backgroundColor: T.bg, borderBottom: `1px solid ${T.border}` }}>
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => go(label)}
                className="flex items-center justify-between py-4"
                style={{ borderBottom: `1px solid ${T.border}`, color: T.ink }}>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6" style={{ color: T.orange }}>
                    <Icon color={T.orange} />
                  </div>
                  <span className="font-['JetBrains_Mono'] text-sm tracking-widest uppercase">{label}</span>
                </div>
                <ArrowRight size={14} style={{ color: T.muted }} />
              </button>
            ))}
            <button onClick={() => go("contact")}
              className="mt-4 py-4 font-['Oxanium'] font-semibold text-sm tracking-widest uppercase text-center min-h-[52px]"
              style={{ backgroundColor: T.orange, color: "#fff" }}>
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function HeroName() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const l1 = useScramble("KRISH", vis, 16);
  const l2 = useScramble("DHAKAL", vis, 16);
  return (
    <div ref={ref} className="font-['Oxanium'] font-extrabold uppercase leading-[0.87] tracking-tight"
      style={{ fontSize: "clamp(3.8rem, 11vw, 10.5rem)" }}>
      <div style={{ color: T.ink }}>{l1}</div>
      <div style={{ WebkitTextStroke: `2px ${T.orange}`, color: "transparent" }}>{l2}</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-between pt-16 max-w-6xl mx-auto px-5 md:px-10">

      {/* Top status bar */}
      <div className="flex items-center justify-between pt-10 md:pt-14">
        <div className="flex flex-col gap-1.5">
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>Portfolio · 2026</span>
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.teal }} />
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase" style={{ color: T.teal }}>Open to work</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={10} style={{ color: T.muted }} />
            <span className="font-['JetBrains_Mono'] text-[10px]" style={{ color: T.muted }}>Pokhara, Nepal</span>
          </div>
        </div>
        <AnalogClock />
      </div>

      {/* Main content + icon panel */}
      <div className="flex items-center gap-0 flex-1 py-6 md:py-10">
        <div className="flex-1 min-w-0">
          <HeroName />

          {/* Role tags */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-6">
            {[
              { label: "AI/ML", icon: IlluServer, color: T.orange },
              { label: "Python",   icon: IlluBrowser, color: T.teal },
              { label: "ETL",   icon: IlluDatabase, color: T.muted },
            ].map(({ label, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-2 px-3 py-2"
                style={{ border: `1px solid ${T.border}`, backgroundColor: T.card }}>
                <div className="w-4 h-4" style={{ color }}>
                  <Icon color={color} />
                </div>
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase" style={{ color: T.ink }}>{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="font-['Figtree'] text-base md:text-lg leading-relaxed mt-6 max-w-lg" style={{ color: T.muted }}>
            AI/ML-focused builder from Nepal creating intelligent products, data pipelines, and systems that turn raw information into useful outcomes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} data-cur
              className="font-['Oxanium'] font-semibold text-[11px] tracking-widest uppercase px-7 py-3.5 flex items-center gap-2 justify-center min-h-[48px] transition-opacity hover:opacity-80"
              style={{ backgroundColor: T.ink, color: T.bg }}>
              View Work <ArrowUpRight size={13} />
            </button>
            <a href={`mailto:${ME.email}`} data-cur
              className="font-['Oxanium'] font-semibold text-[11px] tracking-widest uppercase px-7 py-3.5 flex items-center gap-2 justify-center min-h-[48px] transition-opacity hover:opacity-70"
              style={{ border: `1px solid ${T.border}`, color: T.ink }}>
              <Mail size={13} /> Email Me
            </a>
            <a href={ME.github} target="_blank" rel="noopener noreferrer" data-cur
              className="font-['Oxanium'] font-semibold text-[11px] tracking-widest uppercase px-7 py-3.5 flex items-center gap-2 justify-center min-h-[48px] transition-opacity hover:opacity-70"
              style={{ border: `1px solid ${T.border}`, color: T.ink }}>
              <Github size={13} /> GitHub
            </a>
          </motion.div>
        </div>

        {/* Illustrated icon panel — the key visual from the reference */}
        <IconPanel />
      </div>

      {/* Bottom stats */}
      <div className="pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${T.border}`, paddingTop: "1.25rem" }}>
        <div className="flex gap-8">
          {[
            { n: 5,  s: "+", l: "Projects shipped" },
            { n: 2,  s: "+", l: "Years building" },
            { n: 3,  s: "",  l: "Live deployments" },
          ].map(({ n, s, l }) => (
            <div key={l}>
              <div className="font-['Oxanium'] font-bold text-2xl" style={{ color: T.ink }}><Counter to={n} suffix={s} /></div>
              <div className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase mt-0.5" style={{ color: T.muted }}>{l}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { icon: Github,   href: ME.github,           label: "GitHub" },
            { icon: Linkedin, href: ME.linkedin,         label: "LinkedIn" },
            { icon: Mail,     href: `mailto:${ME.email}`,label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-cur aria-label={label}
              className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ border: `1px solid ${T.border}`, color: T.muted }}>
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS  — each row has a project-type illustration on the left
───────────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: "001", title: "ReLoop", sub: "AI-Ready Marketplace Product",
    Illu: IlluBrowser, accent: T.teal, year: "2025",
    type: "AI Product · Data Systems · Laravel",
    desc: "A production marketplace shaped around real user data, product discovery, and scalable platform workflows. I focused on building the product foundation, moderation flows, and data-rich interactions that can later support recommendation and intelligence layers.",
    tags: ["Laravel", "Python", "Data Modeling", "Analytics", "Marketplace", "Product Systems"],
    live: "https://reloop-np.me",
    badge: "Live",
  },
  {
    num: "002", title: "Sentiment Analyzer", sub: "NLP Web App",
    Illu: IlluLaptop, accent: T.orange, year: "2024",
    type: "Machine Learning · NLP · Web App",
    desc: "Built an NLP system that classifies news and text as positive, negative, or neutral. The work included text preprocessing, feature extraction, and a user-facing interface for experimentation and analysis.",
    tags: ["React", "Node.js", "MongoDB", "NLP", "Text Classification"],
    live: "https://newssentimentanalyzer-4bvf.onrender.com",
    badge: "NLP",
  },
  {
    num: "004", title: "HRMS", sub: "Analytics-Ready Workforce System",
    Illu: IlluServer, accent: "#7c3aed", year: "2024",
    type: "Data Systems · CRUD · Workflow Automation",
    desc: "Developed a structured employee management system with clean data handling, process logic, and maintainable application architecture — a strong example of my focus on usable systems that can evolve into reporting and decision support tools.",
    tags: ["JavaScript", "Data Design", "Workflow", "Git", "Reporting"],
    github: "https://github.com/codezenithnp/HR-ms",
    badge: "System Design",
  },
  {
    num: "005", title: "Green Thrifts", sub: "E-Commerce + Catalog Platform",
    Illu: IlluDatabase, accent: T.teal, year: "2023",
    type: "Data-Driven Product · MVC",
    desc: "Built a full-stack thrift store platform with catalog, cart, ordering flows, and user management. It reinforced my understanding of product data modeling, business logic, and clean user-facing interfaces.",
    tags: ["JSP", "Servlets", "MySQL", "MVC", "E-commerce"],
    badge: "Product Logic",
  },
];

function Projects() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between mb-12 pb-6" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>02 / Work</span>
            <h2 className="font-['Oxanium'] font-bold uppercase mt-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: T.ink }}>Selected Projects</h2>
          </div>
          <span className="hidden sm:block font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase" style={{ color: T.muted }}>{PROJECTS.length} shipped</span>
        </div>

        <div className="flex flex-col" style={{ borderTop: `1px solid ${T.border}` }}>
          {PROJECTS.map((p, i) => {
            const Illu = p.Illu;
            const isHov = hov === i;
            return (
              <motion.div key={p.num}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.45 }}
                onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                className="grid grid-cols-1 md:grid-cols-[96px_1fr_260px_52px] transition-colors duration-200"
                style={{ borderBottom: `1px solid ${T.border}`, backgroundColor: isHov ? T.card : "transparent" }}>

                {/* Illustrated icon */}
                <div className="hidden md:flex items-center justify-center p-5">
                  <motion.div animate={{ scale: isHov ? 1.1 : 1 }} transition={{ duration: 0.28 }}
                    className="w-14 h-14">
                    <Illu color={isHov ? p.accent : T.muted} />
                  </motion.div>
                </div>

                {/* Title block */}
                <div className="px-4 md:px-5 py-6 flex flex-col justify-center gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest" style={{ color: T.muted }}>{p.num}</span>
                    <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase px-2 py-0.5 transition-all duration-200"
                      style={{ backgroundColor: isHov ? `${p.accent}16` : `${T.muted}10`, color: isHov ? p.accent : T.muted, border: `1px solid ${isHov ? p.accent + "25" : T.border}` }}>
                      {p.badge}
                    </span>
                    {/* Mobile illustrated icon */}
                    <div className="md:hidden w-7 h-7 ml-auto" style={{ color: p.accent }}>
                      <Illu color={p.accent} />
                    </div>
                  </div>
                  <h3 className="font-['Oxanium'] font-semibold uppercase transition-colors duration-200"
                    style={{ fontSize: "clamp(1rem,2.5vw,1.35rem)", color: isHov ? p.accent : T.ink }}>{p.title}</h3>
                  <p className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest" style={{ color: T.muted }}>{p.sub}</p>
                </div>

                {/* Description + tags */}
                <div className="px-4 md:px-0 pb-6 md:py-6 md:pr-6 flex flex-col gap-3 justify-center">
                  <p className="font-['Figtree'] text-sm leading-relaxed" style={{ color: T.muted }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase px-2 py-1"
                        style={{ border: `1px solid ${T.border}`, color: T.muted }}>{tag}</span>
                    ))}
                  </div>
                  {/* Mobile links */}
                  <div className="flex gap-4 md:hidden">
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase flex items-center gap-1.5" style={{ color: p.accent }}><ExternalLink size={11} />Live</a>}
                    {(p as {github?: string}).github && <a href={(p as {github?: string}).github} target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase flex items-center gap-1.5" style={{ color: T.muted }}><Github size={11} />Code</a>}
                  </div>
                </div>

                {/* Desktop link icons */}
                <div className="hidden md:flex flex-col items-center justify-center gap-2 pr-4">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" data-cur
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ border: `1px solid ${isHov ? p.accent : T.border}`, color: isHov ? p.accent : T.muted }}>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {(p as {github?: string}).github && (
                    <a href={(p as {github?: string}).github} target="_blank" rel="noopener noreferrer" data-cur
                      className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ border: `1px solid ${T.border}`, color: T.muted }}>
                      <Github size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SKILLS — categories have illustrated icons as visual anchors
───────────────────────────────────────────────────────────────────────────── */
const SKILL_CATS = [
  {
    label: "AI / ML",       Illu: IlluServer,   color: T.orange,
    skills: ["Python", "Machine Learning", "NLP", "Text Classification", "Feature Engineering", "Model Evaluation"],
  },
  {
    label: "Data & ETL",    Illu: IlluPipeline, color: "#16a34a",
    skills: ["ETL Pipelines", "Data Cleaning", "API Extraction", "Structured Loading", "Data Modeling", "Analytics"],
  },
  {
    label: "Backend",       Illu: IlluBrowser,  color: T.teal,
    skills: ["REST APIs", "Node.js", "FastAPI", "Laravel", "PHP", "Server-side Logic", "Authentication"],
  },
  {
    label: "Databases",     Illu: IlluDatabase, color: "#7c3aed",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Schema Design", "Normalization", "Query Optimization"],
  },
  {
    label: "Tools & MLOps",Illu: IlluGit,      color: "#92400e",
    skills: ["Git & GitHub", "Docker", "Railway", "Render", "Vercel", "Data Pipelines", "Deployment"],
  },
];

function Skills() {
  const [hovCat, setHovCat] = useState<number | null>(null);
  const [hovSkill, setHovSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 md:py-28" style={{ borderTop: `1px solid ${T.border}` }}>
      <Marquee />
      <div className="max-w-6xl mx-auto px-5 md:px-10 mt-14">
        <div className="mb-12 pb-6" style={{ borderBottom: `1px solid ${T.border}` }}>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>03 / Skills</span>
          <h2 className="font-['Oxanium'] font-bold uppercase mt-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: T.ink }}>Technical Stack</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_CATS.map((cat, ci) => {
            const Illu = cat.Illu;
            const isHov = hovCat === ci;
            return (
              <motion.div key={cat.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: ci * 0.07, duration: 0.45 }}
                onMouseEnter={() => setHovCat(ci)} onMouseLeave={() => setHovCat(null)}
                className="p-5 flex flex-col gap-4 transition-all duration-250 cursor-default"
                style={{ border: `1px solid ${isHov ? cat.color + "35" : T.border}`, backgroundColor: isHov ? `${cat.color}05` : T.bg }}>

                {/* Header row: illustrated icon + label */}
                <div className="flex items-center gap-3 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
                  <motion.div animate={{ scale: isHov ? 1.1 : 1 }} transition={{ duration: 0.25 }}
                    className="w-9 h-9 shrink-0">
                    <Illu color={isHov ? cat.color : T.muted} />
                  </motion.div>
                  <span className="font-['Oxanium'] font-semibold text-sm uppercase tracking-widest transition-colors duration-200"
                    style={{ color: isHov ? cat.color : T.ink }}>{cat.label}</span>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((sk) => (
                    <button key={sk}
                      onMouseEnter={() => setHovSkill(sk)} onMouseLeave={() => setHovSkill(null)}
                      className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase px-2.5 py-1.5 min-h-[28px] transition-all duration-150"
                      style={{ border: `1px solid ${hovSkill === sk ? cat.color : T.border}`, color: hovSkill === sk ? cat.color : T.muted, backgroundColor: hovSkill === sk ? `${cat.color}0d` : T.card }}>
                      {sk}
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}


        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-20 md:py-28" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="mb-12 pb-6" style={{ borderBottom: `1px solid ${T.border}` }}>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>04 / About</span>
          <h2 className="font-['Oxanium'] font-bold uppercase mt-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: T.ink }}>About Me</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 md:gap-16">
          {/* Left prose */}
          <div>
            <div className="space-y-4 font-['Figtree'] text-base leading-relaxed" style={{ color: T.muted }}>
              <p>I&apos;m Krish — an AI/ML-focused engineer from <span style={{ color: T.ink }}>Pokhara, Nepal</span> building intelligent systems, data pipelines, and product experiences that turn raw information into useful decisions.</p>
              <p><span style={{ color: T.ink }}>ReLoop</span> is the product backbone I built around real marketplace data and user behavior, and it reflects my interest in building systems that combine product thinking with scalable engineering and data-driven insight.</p>
              <p>I enjoy the full loop from data collection to model thinking to deployment — combining engineering discipline with experimentation, debugging, and building systems people actually use.</p>
            </div>

            {/* Quick fact grid with illustrated icons */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { Illu: IlluServer,   label: "Focus",     val: "AI / ML systems" },
                { Illu: IlluBrowser,  label: "Stack",     val: "Python + Data apps" },
                { Illu: IlluPipeline, label: "Core",      val: "ETL + feature pipelines" },
                { Illu: IlluLaptop,   label: "Interest",  val: "Applied intelligence" },
              ].map(({ Illu, label, val }, i) => (
                <motion.div key={label} whileHover={{ y: -2 }} transition={{ duration: 0.18 }}
                  className="flex items-start gap-3 p-4" style={{ border: `1px solid ${T.border}`, backgroundColor: T.card }}>
                  <div className="w-8 h-8 shrink-0 mt-0.5" style={{ color: T.orange }}>
                    <Illu color={T.orange} />
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest" style={{ color: T.muted }}>{label}</div>
                    <div className="font-['Figtree'] text-sm mt-0.5" style={{ color: T.ink }}>{val}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            {/* Education */}
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase block mb-4 flex items-center gap-2"
                style={{ color: T.muted }}>
                <div className="w-3.5 h-3.5 inline-block" style={{ color: T.orange }}><IlluLaptop color={T.orange} /></div>
                Education
              </span>
              <div className="p-5" style={{ border: `1px solid ${T.border}`, backgroundColor: T.card }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-['Oxanium'] font-semibold text-base uppercase" style={{ color: T.ink }}>BSc (Hons) Computing</h3>
                    <p className="font-['Figtree'] text-sm mt-0.5" style={{ color: T.muted }}>Informatics College Pokhara</p>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase shrink-0 px-2 py-1"
                    style={{ backgroundColor: `${T.orange}12`, color: T.orange, border: `1px solid ${T.orange}22` }}>2022–Now</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["AI/ML", "Data Engineering", "Software Eng.", "Cloud", "Advanced Programming"].map((c) => (
                    <span key={c} className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase px-2 py-1"
                      style={{ border: `1px solid ${T.border}`, color: T.muted }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase block mb-4" style={{ color: T.muted }}>Contact</span>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Mail,     label: "Email",    val: ME.email,       href: `mailto:${ME.email}` },
                  { icon: Phone,    label: "Phone",    val: ME.phone,       href: `tel:${ME.phone}` },
                  { icon: Github,   label: "GitHub",   val: "krixhyz",      href: ME.github },
                  { icon: Linkedin, label: "LinkedIn", val: "krish-dhakal", href: ME.linkedin },
                ].map(({ icon: Icon, label, val, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-cur
                    className="flex items-center gap-3 group">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{ border: `1px solid ${T.border}`, color: T.muted }}>
                      <Icon size={13} />
                    </div>
                    <div>
                      <div className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase" style={{ color: T.muted }}>{label}</div>
                      <div className="font-['Figtree'] text-sm group-hover:underline" style={{ color: T.ink }}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "What kind of roles are you looking for?", a: "I’m aiming for AI/ML, applied data, or product-focused engineering roles where I can build machine learning workflows, data systems, and intelligent user experiences." },
  { q: "Are you available to work remotely?", a: "Yes. Based in Pokhara, Nepal and fully comfortable with remote collaboration, async communication, Git workflows, and technical documentation." },
  { q: "What is your strongest technical skill?", a: "My strongest blend is data + product engineering: I can structure pipelines, build useful interfaces, and connect product logic with AI/ML thinking. ReLoop is a strong example of that approach." },
  { q: "How do you think about data and AI projects?", a: "I approach them as systems: collect useful information, shape it into a reliable model, and build interfaces or workflows that make the insights actionable for real users." },
  { q: "Do you have deployment experience?", a: "Yes — Railway, Render, and Vercel. I’ve handled production deployment workflows, environment configuration, and shipping data products in a clean, maintainable way." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 md:py-28" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="mb-12 pb-6" style={{ borderBottom: `1px solid ${T.border}` }}>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>05 / FAQ</span>
          <h2 className="font-['Oxanium'] font-bold uppercase mt-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: T.ink }}>Common Questions</h2>
        </div>
        <div className="max-w-3xl" style={{ borderTop: `1px solid ${T.border}` }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-5 text-left min-h-[64px] transition-all duration-150"
                style={{ backgroundColor: open === i ? T.card : "transparent" }}>
                <span className="flex items-start gap-4 pr-4">
                  <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest shrink-0 mt-0.5" style={{ color: T.orange }}>0{i + 1}</span>
                  <span className="font-['Oxanium'] font-medium text-sm md:text-base uppercase" style={{ color: T.ink }}>{f.q}</span>
                </span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                  <ChevronDown size={15} style={{ color: open === i ? T.orange : T.muted }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                    <p className="font-['Figtree'] text-sm leading-relaxed px-4 pb-5 pl-[3.25rem]" style={{ color: T.muted }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <section id="contact" className="py-20 md:py-28" style={{ borderTop: `1px solid ${T.border}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="mb-12 pb-6" style={{ borderBottom: `1px solid ${T.border}` }}>
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.25em] uppercase" style={{ color: T.muted }}>06 / Contact</span>
          <h2 className="font-['Oxanium'] font-bold uppercase mt-2" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: T.ink }}>
            Let&apos;s Work<br /><span style={{ color: T.orange }}>Together</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="flex flex-col gap-6">
            <p className="font-['Figtree'] text-base leading-relaxed" style={{ color: T.muted }}>
              Actively seeking AI/ML, data engineering, or applied product roles where I can build intelligent systems and meaningful user experiences. Have a position or project? I reply within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail,     label: "Email",    val: ME.email,       href: `mailto:${ME.email}` },
                { icon: Phone,    label: "Phone",    val: ME.phone,       href: `tel:${ME.phone}` },
                { icon: Github,   label: "GitHub",   val: "krixhyz",      href: ME.github },
                { icon: Linkedin, label: "LinkedIn", val: "krish-dhakal", href: ME.linkedin },
              ].map(({ icon: Icon, label, val, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 4 }} transition={{ duration: 0.14 }}
                  className="flex items-center gap-4 group" data-cur>
                  <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                    style={{ border: `1px solid ${T.border}`, color: T.muted }}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <div className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase" style={{ color: T.muted }}>{label}</div>
                    <div className="font-['Figtree'] text-sm group-hover:underline" style={{ color: T.ink }}>{val}</div>
                  </div>
                </motion.a>
              ))}
            </div>
            {/* Response time card with ETL illustration */}
            <div className="p-5 flex items-center gap-4" style={{ border: `1px solid ${T.border}`, backgroundColor: T.card }}>
              <div className="w-12 h-12 shrink-0">
                <IlluPipeline color={T.orange} />
              </div>
              <div>
                <div className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase" style={{ color: T.muted }}>Avg. response time</div>
                <div className="font-['Oxanium'] font-bold text-2xl" style={{ color: T.orange }}>&lt; 24 hours</div>
              </div>
            </div>
          </div>

          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-5">
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase block mb-2" style={{ color: T.muted }}>{field}</label>
                  <input type={field === "email" ? "email" : "text"} required value={form[field]}
                    onFocus={() => setFocus(field)} onBlur={() => setFocus(null)}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-transparent px-4 py-3 font-['Figtree'] text-sm focus:outline-none min-h-[48px] transition-colors duration-200"
                    style={{ border: `1px solid ${focus === field ? T.orange : T.border}`, color: T.ink }}
                    placeholder={field === "name" ? "Your name" : "your@email.com"} />
                </div>
              ))}
              <div>
                <label className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase block mb-2" style={{ color: T.muted }}>Message</label>
                <textarea required rows={5} value={form.message}
                  onFocus={() => setFocus("message")} onBlur={() => setFocus(null)}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent px-4 py-3 font-['Figtree'] text-sm focus:outline-none resize-none transition-colors duration-200"
                  style={{ border: `1px solid ${focus === "message" ? T.orange : T.border}`, color: T.ink }}
                  placeholder="Tell me about your project or opportunity..." />
              </div>
              <motion.button type="submit" data-cur whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="font-['Oxanium'] font-semibold text-[11px] tracking-widest uppercase px-8 py-4 flex items-center gap-2 min-h-[52px] self-start transition-opacity hover:opacity-80"
                style={{ backgroundColor: T.orange, color: "#fff" }}>
                Send Message <ArrowUpRight size={13} />
              </motion.button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start justify-center gap-4 p-8"
              style={{ border: `1px solid ${T.teal}30`, backgroundColor: `${T.teal}05` }}>
              <div className="w-14 h-14">
                <IlluPipeline color={T.teal} />
              </div>
              <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase" style={{ color: T.teal }}>Message Sent</span>
              <h3 className="font-['Oxanium'] font-semibold text-2xl uppercase" style={{ color: T.ink }}>Thanks for reaching out.</h3>
              <p className="font-['Figtree'] text-sm" style={{ color: T.muted }}>I&apos;ll get back to you within 24 hours.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ backgroundColor: T.footerBg }}>
      <Marquee dark />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center" style={{ border: `1.5px solid rgba(244,243,238,0.18)` }}>
            <div className="w-2 h-2" style={{ backgroundColor: T.orange }} />
          </div>
          <span className="font-['Oxanium'] font-bold text-sm tracking-[0.12em] uppercase" style={{ color: T.footerFg }}>Krish Dhakal</span>
        </div>
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest" style={{ color: "rgba(244,243,238,0.2)" }}>
          © 2026 — Designed & built in Pokhara, Nepal
        </span>
        <div className="flex gap-5">
          {[{ l: "GitHub", h: ME.github }, { l: "LinkedIn", h: ME.linkedin }, { l: "Email", h: `mailto:${ME.email}` }].map(({ l, h }) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer"
              className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase hover:underline transition-colors"
              style={{ color: "rgba(244,243,238,0.22)" }}>{l} ↗</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden md:cursor-none" style={{ backgroundColor: T.bg, color: T.ink }}>
      <Cursor />
      <Noise />
      <ScrollBar />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
