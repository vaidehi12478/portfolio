import { useEffect, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Github,
  Linkedin,
  Code2,
  Mail,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Users,
} from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = {
  github: "https://github.com/vaidehi12478",
  linkedin: "https://www.linkedin.com/in/vaidehi-vijay-1b455532b",
  leetcode: "https://leetcode.com/u/vaidehi0208/",
};

const ROLES = [
  "Full Stack Developer",
  "Backend Engineer",
  "AI & Deep Learning Enthusiast",
  "Open to Opportunities",
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- Typewriter ---------- */
function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  return (
    <div className="font-mono text-xl sm:text-2xl md:text-3xl text-[#00d4ff] min-h-[2.5rem]">
      <span className="text-muted-foreground">{"> "}</span>
      <span>{text}</span>
      <span className="animate-blink text-[#00d4ff]">▍</span>
    </div>
  );
}

/* ---------- Reveal wrapper ---------- */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(id), 80);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          className="font-mono text-lg font-bold text-gradient"
        >
          {"<vaidehi/>"}
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-sm text-muted-foreground hover:text-[#00d4ff] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <SocialIcon href={SOCIALS.github} label="GitHub">
            <Github size={18} />
          </SocialIcon>
          <SocialIcon href={SOCIALS.linkedin} label="LinkedIn">
            <Linkedin size={18} />
          </SocialIcon>
          <SocialIcon href={SOCIALS.leetcode} label="LeetCode">
            <Code2 size={18} />
          </SocialIcon>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass mt-3 mx-4 rounded-xl p-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-sm text-left text-muted-foreground hover:text-[#00d4ff]"
            >
              {l.label}
            </button>
          ))}
          <div className="flex gap-3 pt-2 border-t border-border">
            <SocialIcon href={SOCIALS.github} label="GitHub"><Github size={18} /></SocialIcon>
            <SocialIcon href={SOCIALS.linkedin} label="LinkedIn"><Linkedin size={18} /></SocialIcon>
            <SocialIcon href={SOCIALS.leetcode} label="LeetCode"><Code2 size={18} /></SocialIcon>
          </div>
        </div>
      )}
    </nav>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center border border-[#00d4ff]/20 text-muted-foreground hover:text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all"
    >
      {children}
    </a>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="hero-grid-bg min-h-screen flex items-center pt-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#00d4ff]/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#7c3aed]/15 blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="font-mono text-muted-foreground mb-4 text-sm sm:text-base">
            <span className="text-[#00d4ff]">$</span> echo "Hello, I'm"
          </p>
          <h1 className="font-mono font-bold text-5xl sm:text-7xl md:text-8xl leading-tight mb-6 bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundImage: "linear-gradient(135deg,#00d4ff 0%,#7c3aed 50%,#00d4ff 100%)" }}>
            Vaidehi Vijay
          </h1>
          <Typewriter />
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Building scalable backends, sleek frontends, and exploring the frontier of AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold bg-[#00d4ff] text-[#0a0a0f] animate-pulse-glow transition-all"
            >
              View My Work
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold border border-[#00d4ff]/40 text-[#00d4ff] hover:border-[#00d4ff] hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] transition-all"
            >
              <Mail size={16} />
              Let's Connect
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <SocialIcon href={SOCIALS.github} label="GitHub"><Github size={20} /></SocialIcon>
            <SocialIcon href={SOCIALS.linkedin} label="LinkedIn"><Linkedin size={20} /></SocialIcon>
            <SocialIcon href={SOCIALS.leetcode} label="LeetCode"><Code2 size={20} /></SocialIcon>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Section Heading ---------- */
function SectionHeading({ index, title, sub }: { index: string; title: string; sub?: string }) {
  return (
    <Reveal>
      <div className="mb-12">
        <p className="font-mono text-sm text-[#00d4ff] mb-2">{index}</p>
        <h2 className="font-mono text-3xl md:text-5xl font-bold text-foreground">
          {title}
        </h2>
        {sub && <p className="mt-3 text-muted-foreground max-w-2xl">{sub}</p>}
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
      </div>
    </Reveal>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { label: "3rd Year Student", icon: GraduationCap },
    { label: "Full Stack Developer", icon: Code2 },
    { label: "AI Enthusiast", icon: Sparkles },
  ];
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="01 /" title="About Me" />
        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          <Reveal>
            <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00d4ff]/40 animate-ring-spin" />
              <div className="absolute inset-3 rounded-full border border-[#7c3aed]/50" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/30 flex items-center justify-center font-mono text-5xl font-bold text-gradient shadow-[0_0_60px_rgba(0,212,255,0.3)]">
                VV
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground font-semibold">Vaidehi Vijay</span>, a third-year B.Tech student at the
              <span className="text-[#00d4ff]"> Indian Institute of Information Technology, Raichur</span> — and a full stack developer who loves turning ideas into working products.
              I'm comfortable across the stack: from designing RESTful APIs with FastAPI and managing databases like MongoDB and PostgreSQL, to building responsive frontends in React and TypeScript.
              I've containerized apps with Docker, dabbled in Flutter for mobile, and I'm currently deep-diving into
              <span className="text-[#7c3aed] font-medium"> Machine Learning and Deep Learning</span>.
              I thrive in environments where I can ship real things, break things, and learn fast.
            </p>
            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {stats.map(({ label, icon: Icon }) => (
                <div key={label} className="glow-card glow-card-hover p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center text-[#00d4ff]">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-sm">{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILL_GROUPS: { title: string; items: { name: string; learning?: boolean }[] }[] = [
  { title: "Languages", items: [{ name: "C" }, { name: "C++" }, { name: "Python" }, { name: "Java" }, { name: "JavaScript" }, { name: "TypeScript" }, { name: "Dart" }] },
  { title: "Frontend", items: [{ name: "React" }, { name: "HTML" }, { name: "CSS" }, { name: "TypeScript" }] },
  { title: "Backend", items: [{ name: "FastAPI" }, { name: "REST APIs" }, { name: "Node.js (basic)" }] },
  { title: "Databases", items: [{ name: "MongoDB" }, { name: "PostgreSQL" }] },
  { title: "DevOps & Tools", items: [{ name: "Docker" }, { name: "Postman" }, { name: "Git" }, { name: "GitHub" }] },
  { title: "Mobile", items: [{ name: "Flutter", learning: true }] },
  { title: "AI / ML", items: [{ name: "Deep Learning", learning: true }, { name: "Machine Learning", learning: true }, { name: "NumPy" }, { name: "pandas (basics)" }] },
];

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-[#0d0d1a]/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="02 /" title="Tech Stack" sub="Tools and technologies I use to bring ideas to life." />
        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="glow-card glow-card-hover p-6 h-full">
                <h3 className="font-mono text-sm text-[#7c3aed] mb-4 uppercase tracking-wider">
                  // {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item.name} className="glow-badge">
                      {item.name}
                      {item.learning && (
                        <span className="text-[10px] text-[#00d4ff] font-mono ml-1">🔥 learning</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    name: "Expense Splitter",
    description: "A smart web app for managing shared expenses within groups. Track who paid what, split bills equally or with custom shares, and get instant settlement calculations. Built for roommates, trip groups, and friend circles.",
    stack: ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL"],
    tags: ["Full Stack", "Finance", "Web App"],
    github: "https://github.com/vaidehi12478/expense-splitter",
    demo: "https://expense-splitter-two-sooty.vercel.app",
    group: false,
  },
  {
    name: "Safar",
    description: "A travel-companion web app with a JavaScript/React frontend and Python-powered backend, using PostgreSQL for relational data. Designed to make trip planning and tracking seamless.",
    stack: ["JavaScript", "React", "Python (FastAPI)", "PostgreSQL", "CSS"],
    tags: ["Full Stack", "Travel", "Web App"],
    github: "https://github.com/vaidehi12478/Safar",
    demo: null,
    group: false,
  },
  {
    name: "Book Nest",
    description: "A cross-platform mobile application built with Flutter/Dart for book lovers to discover, organize, and track their reading lists. Targets Android, iOS, and web from a single codebase.",
    stack: ["Flutter", "Dart", "C++"],
    tags: ["Mobile", "Flutter", "Cross-Platform"],
    github: "https://github.com/vaidehi12478/book-nest",
    demo: null,
    group: false,
  },
  {
    name: "Crowd Buddy",
    description: "An AI-powered crowd management platform for events and public spaces. Uses a fine-tuned YOLO11x model (trained on 2000+ images) for real-time person detection and tracking, with dynamic heatmap overlays to visualize crowd density. Includes automated safety alerts, analytics, emergency response detection, and live camera feed support.",
    stack: ["Python", "FastAPI", "YOLO11x", "OpenCV", "HTML", "CSS", "JavaScript"],
    tags: ["AI/ML", "Computer Vision", "Deep Learning"],
    github: "https://github.com/vaidehi12478/Crowd_Management_System",
    demo: "https://crowdbuddy.vercel.app/",
    group: true,
  },
];

function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="03 /" title="Projects" sub="Selected things I've shipped, broken, and rebuilt." />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="glow-card glow-card-hover p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-mono text-xl font-bold text-foreground">{p.name}</h3>
                  {p.group && (
                    <span className="glow-badge text-[10px] !border-[#7c3aed]/50 !text-[#a78bfa]">
                      <Users size={12} /> Group Project
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/30">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[11px] font-mono px-2 py-1 rounded-md bg-[#00d4ff]/8 text-[#00d4ff] border border-[#00d4ff]/20">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md font-mono text-xs border border-border hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all"
                  >
                    <Github size={14} /> Code
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md font-mono text-xs bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] hover:shadow-[0_0_16px_rgba(0,212,255,0.4)] transition-all"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-[#0d0d1a]/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="04 /" title="Experience" />
        <Reveal>
          <div className="relative pl-8 md:pl-12 border-l-2 border-[#00d4ff]/40 max-w-3xl"
               style={{ boxShadow: "-2px 0 24px rgba(0,212,255,0.25)" }}>
            <div className="absolute -left-[10px] top-2 w-4 h-4 rounded-full bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.8)]" />
            <div className="glow-card glow-card-hover p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-mono text-xl font-bold">Chosenly.com</h3>
                <span className="font-mono text-xs text-[#00d4ff] flex items-center gap-1">
                  <Calendar size={12} /> 2 months · 2024
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Briefcase size={14} /> Software Development Intern</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> Remote</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><span className="text-[#00d4ff] font-mono">▸</span> Developed and maintained RESTful API endpoints using FastAPI for backend services.</li>
                <li className="flex gap-2"><span className="text-[#00d4ff] font-mono">▸</span> Contributed to frontend development, building responsive UI components.</li>
                <li className="flex gap-2"><span className="text-[#00d4ff] font-mono">▸</span> Collaborated with the team to integrate backend APIs with the React frontend.</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */
function Education() {
  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="05 /" title="Education" />
        <Reveal>
          <div className="glow-card glow-card-hover p-8 relative overflow-hidden max-w-3xl">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00d4ff] to-[#7c3aed] shadow-[0_0_24px_rgba(0,212,255,0.6)]" />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/40 flex items-center justify-center text-[#a78bfa] shrink-0">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-xl font-bold">B.Tech in Computer Science & Engineering</h3>
                <p className="text-[#00d4ff] font-mono text-sm mt-1">
                  Indian Institute of Information Technology, Raichur (IIIT Raichur)
                </p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={14} /> Expected Graduation: 2028</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> Raichur, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 bg-[#0d0d1a]/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="06 /" title="Certifications" />
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="glow-card glow-card-hover p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/30 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] shrink-0">
                  <Award size={26} />
                </div>
                <div>
                  <h3 className="font-mono text-lg font-bold">Amazon Future Engineer (AFE) Scholar</h3>
                  <p className="text-xs font-mono text-[#00d4ff] mt-1">Issued by Amazon</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Selected as an Amazon Future Engineer Scholar — a program recognizing high-potential computer science students and supporting their journey into the tech industry.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const links = [
    { href: SOCIALS.linkedin, label: "LinkedIn", handle: "vaidehi-vijay", icon: Linkedin, color: "#00d4ff" },
    { href: SOCIALS.github, label: "GitHub", handle: "vaidehi12478", icon: Github, color: "#a78bfa" },
    { href: SOCIALS.leetcode, label: "LeetCode", handle: "vaidehi0208", icon: Code2, color: "#00d4ff" },
  ];
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/10 blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading index="07 /" title="Let's Connect" sub="I'm actively looking for full-time roles and exciting collaborations. Slide into any of these — I reply fast." />
        <div className="grid sm:grid-cols-3 gap-5">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.08}>
              <motion.a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6 }}
                className="glow-card glow-card-hover p-6 flex flex-col items-center text-center gap-3 group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all group-hover:scale-110"
                  style={{ background: `${l.color}15`, borderColor: `${l.color}55`, color: l.color }}
                >
                  <l.icon size={26} />
                </div>
                <p className="font-mono font-bold text-foreground">{l.label}</p>
                <p className="font-mono text-xs text-muted-foreground">@{l.handle}</p>
                <span className="font-mono text-xs text-[#00d4ff] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ExternalLink size={11} />
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-mono font-bold text-gradient text-lg">Vaidehi Vijay</p>
          <p className="text-sm text-muted-foreground mt-1">
            Built with curiosity, shipped with caffeine ☕
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SocialIcon href={SOCIALS.github} label="GitHub"><Github size={18} /></SocialIcon>
          <SocialIcon href={SOCIALS.linkedin} label="LinkedIn"><Linkedin size={18} /></SocialIcon>
          <SocialIcon href={SOCIALS.leetcode} label="LeetCode"><Code2 size={18} /></SocialIcon>
        </div>
        <p className="text-xs font-mono text-muted-foreground">
          © 2025 Vaidehi Vijay. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vaidehi Vijay — Full Stack Developer & AI Enthusiast" },
      { name: "description", content: "Portfolio of Vaidehi Vijay — Full Stack Developer, Backend Engineer, and AI/Deep Learning enthusiast building scalable, intelligent products." },
      { property: "og:title", content: "Vaidehi Vijay — Full Stack Developer & AI Enthusiast" },
      { property: "og:description", content: "Building scalable backends, sleek frontends, and exploring the frontier of AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
