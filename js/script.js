/* ============================================================
   STEPHEN ARIYO — PORTFOLIO SCRIPTS
   main.js
   ============================================================ */

/* ── EmailJS Config ─────────────────────────────────────────────
   SETUP STEPS:
   1. Sign up free at https://www.emailjs.com (200 emails/month)
   2. Connect your Gmail → copy your Service ID
   3. Create a template using variables:
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Replace the three values below with your real credentials
   ──────────────────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // e.g. 'user_abc123'
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. 'service_xyz'
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. 'template_abc'

emailjs.init(EMAILJS_PUBLIC_KEY);

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const btn = document.getElementById("submit-btn");
    const status = document.getElementById("form-status");
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !email || !message) {
      status.textContent = "Please fill in your name, email, and message.";
      status.className = "form-status error";
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    status.className = "form-status";

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: firstName + " " + lastName,
        from_email: email,
        subject: subject || "New Contact Form Message",
        message: message,
        reply_to: email,
      });
      status.textContent =
        "✓ Message sent! I'll get back to you within 24 hours.";
      status.className = "form-status success";
      this.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      status.textContent =
        "Something went wrong. Email me directly: ariyostephen2004@gmail.com";
      status.className = "form-status error";
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="bx bx-send"></i>';
    }
  });

/* ── Custom Cursor ──────────────────────────────────────────── */
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
})();

document
  .querySelectorAll("a, button, .project-card, .service-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
      ring.style.width = "52px";
      ring.style.height = "52px";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "10px";
      cursor.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    });
  });

/* ── Hamburger Menu ─────────────────────────────────────────── */
const ham = document.getElementById("hamburger");
const mNav = document.getElementById("mobile-nav");

ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mNav.classList.toggle("open");
});

mNav.querySelectorAll("a").forEach((l) =>
  l.addEventListener("click", () => {
    ham.classList.remove("open");
    mNav.classList.remove("open");
  }),
);

/* ── Header Scroll Effect ───────────────────────────────────── */
window.addEventListener("scroll", () =>
  document
    .getElementById("header")
    .classList.toggle("scrolled", window.scrollY > 50),
);

/* ── Active Nav Highlight ───────────────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((l) =>
    l.classList.toggle("active", l.getAttribute("href") === "#" + current),
  );
});

/* ── Role Rotator ───────────────────────────────────────────── */
const roles = [
  "Graphic Designer",
  "Creative Lead",
  "Brand Strategist",
  "AI Creatives Designer",
  "Motion Designer",
];
let roleIndex = 0;
const roleEl = document.getElementById("role-text");
roleEl.style.transition = "opacity 0.4s, transform 0.4s";

setInterval(() => {
  roleEl.style.opacity = "0";
  roleEl.style.transform = "translateY(-10px)";
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.style.opacity = "1";
    roleEl.style.transform = "translateY(0)";
  }, 300);
}, 2800);

/* ── Resume Tabs ────────────────────────────────────────────── */
document.querySelectorAll(".resume-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".resume-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".resume-panel")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
    if (tab.dataset.tab === "skills") setTimeout(animateSkills, 50);
  });
});

/* ── Skill Bar Animation ────────────────────────────────────── */
let skillsAnimated = false;

function animateSkills() {
  document.querySelectorAll(".skill-fill").forEach((bar) => {
    bar.style.width = bar.dataset.width + "%";
  });
  skillsAnimated = true;
}

/* ── Portfolio Filter ───────────────────────────────────────── */
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const show =
        filter === "all" || (card.dataset.category || "").includes(filter);
      card.style.opacity = show ? "1" : "0.2";
      card.style.pointerEvents = show ? "auto" : "none";
      card.style.transform = show ? "" : "scale(0.97)";
      card.style.transition = "opacity 0.3s, transform 0.3s";
    });
  });
});

/* ── Intersection Observer (Fade-up + Skills trigger) ────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (
          entry.target.closest("#resume") &&
          document.querySelector("#panel-skills.active") &&
          !skillsAnimated
        ) {
          animateSkills();
        }
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

/* Auto-animate skills if that tab is already active on load */
window.addEventListener("load", () => {
  if (document.querySelector("#panel-skills.active")) animateSkills();
});
