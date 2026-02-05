/* ======================================
   EMAAR Residential Contracting
   Enhanced JavaScript File
   ====================================== */

// ========== Smooth Scroll Navigation ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector(".main-header").offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const mobileNav = document.getElementById("mainNav");
      const menuToggle = document.getElementById("mobileMenuToggle");
      if (mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    }
  });
});

// ========== Active Menu Highlight on Scroll ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNavigation() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavigation);

// ========== Sticky Header Effect ==========
const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ========== Mobile Menu Toggle ==========
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mainNav = document.getElementById("mainNav");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".main-nav") &&
    !e.target.closest(".mobile-menu-toggle")
  ) {
    mainNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }
});

// ========== Intersection Observer for Fade-in Animations ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // If it's a stat card, trigger the counter
      if (entry.target.classList.contains("stat-card")) {
        const statValue = entry.target.querySelector(".stat-value");
        if (statValue && !statValue.classList.contains("counted")) {
          animateCounter(statValue);
          statValue.classList.add("counted");
        }
      }
    }
  });
}, observerOptions);

// Observe all elements that should fade in
const elementsToObserve = document.querySelectorAll(`
  .section,
  .project-card,
  .service-box,
  .feature-item,
  .visual-card,
  .stat-card,
  .structure-box,
  .contact-item
`);

elementsToObserve.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ========== Counter Animation for Statistics ==========
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ========== Back to Top Button ==========
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 500) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========== Contact Form Handling ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Basic validation
    if (!name || !email || !phone || !message) {
      alert("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    showSuccessMessage();

    // Reset form
    contactForm.reset();
  });
}

function showSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #d4a83f 0%, #e8c76a 100%);
      color: #0f1720;
      padding: 30px 50px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      text-align: center;
      animation: slideIn 0.5s ease-out;
    ">
      <div style="font-size: 3rem; margin-bottom: 15px;">✓</div>
      <h3 style="font-size: 1.5rem; margin-bottom: 10px; font-weight: 700;">تم الإرسال بنجاح!</h3>
      <p style="font-size: 1rem; opacity: 0.9;">سنتواصل معك في أقرب وقت ممكن</p>
    </div>
  `;

  document.body.appendChild(successMessage);

  setTimeout(() => {
    successMessage.style.animation = "slideOut 0.5s ease-out";
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 500);
  }, 3000);
}

// Add animation keyframes
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }
`;
document.head.appendChild(style);

// ========== Parallax Effect for Hero Section ==========
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroHeight = hero.offsetHeight;

  if (scrolled < heroHeight) {
    const opacity = 1 - scrolled / heroHeight;
    const translateY = scrolled * 0.5;

    if (heroContent) {
      heroContent.style.transform = `translateY(${translateY}px)`;
      heroContent.style.opacity = opacity;
    }
  }
});

// ========== Dynamic Project Cards Hover Effect ==========
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ========== Service Cards Stagger Animation ==========
const serviceBoxes = document.querySelectorAll(".service-box");

serviceBoxes.forEach((box, index) => {
  box.style.animationDelay = `${index * 0.1}s`;
});

// ========== Keyboard Navigation Accessibility ==========
document.addEventListener("keydown", (e) => {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    mainNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
  }

  // Arrow keys for navigation
  if (e.key === "Home" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (e.key === "End" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
});

// ========== Form Input Animation ==========
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea",
);

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// ========== Lazy Load Background Images ==========
const lazyBackgrounds = document.querySelectorAll("[data-bg]");

const bgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bg = entry.target.getAttribute("data-bg");
      entry.target.style.backgroundImage = `url(${bg})`;
      bgObserver.unobserve(entry.target);
    }
  });
});

lazyBackgrounds.forEach((bg) => {
  bgObserver.observe(bg);
});

// ========== Custom Cursor Effect (Optional Enhancement) ==========
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
cursor.style.cssText = `
  width: 20px;
  height: 20px;
  border: 2px solid #d4a83f;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transition: all 0.1s ease;
  opacity: 0;
`;

// Only add custom cursor on desktop
if (window.innerWidth > 768) {
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
    cursor.style.opacity = "0.5";
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  // Expand cursor on hover over clickable elements
  const clickableElements = document.querySelectorAll(
    "a, button, .project-card, .service-box",
  );

  clickableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.marginLeft = "-10px";
      cursor.style.marginTop = "-10px";
      cursor.style.backgroundColor = "rgba(212, 168, 63, 0.1)";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.marginLeft = "0";
      cursor.style.marginTop = "0";
      cursor.style.backgroundColor = "transparent";
    });
  });
}

// ========== Performance Optimization ==========
// Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
  highlightNavigation();
}, 10);

window.addEventListener("scroll", debouncedScroll);

// ========== Page Load Animation ==========
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger hero animations
  const heroElements = document.querySelectorAll(
    ".hero-badge, .title-line, .hero-description, .hero-buttons, .hero-stats-mini",
  );
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// ========== Console Branding ==========
console.log(
  "%c🏗️ EMAAR Residential Contracting",
  "color: #d4a83f; font-size: 24px; font-weight: bold;",
);
console.log(
  "%cنبني المستقبل بكل ثقة وإتقان",
  "color: #0f1720; font-size: 16px;",
);
console.log(
  "%cWebsite loaded successfully ✓",
  "color: #4CAF50; font-size: 14px;",
);

// ========== Easter Egg - Konami Code ==========
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(
    -konamiSequence.length - 1,
    konamiCode.length - konamiSequence.length,
  );

  if (konamiCode.join("").includes(konamiSequence.join(""))) {
    document.body.style.animation = "rainbow 2s linear infinite";

    const congratsStyle = document.createElement("style");
    congratsStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(congratsStyle);

    setTimeout(() => {
      document.body.style.animation = "";
      document.head.removeChild(congratsStyle);
    }, 5000);

    console.log(
      "%c🎉 You found the easter egg! 🎉",
      "color: #d4a83f; font-size: 20px; font-weight: bold;",
    );
    konamiCode = [];
  }
});

// ========== Accessibility Enhancements ==========
// Skip to main content link
const skipLink = document.createElement("a");
skipLink.href = "#home";
skipLink.textContent = "تخطي إلى المحتوى الرئيسي";
skipLink.className = "skip-link";
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: #d4a83f;
  color: #0f1720;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  z-index: 10001;
`;

skipLink.addEventListener("focus", () => {
  skipLink.style.top = "10px";
});

skipLink.addEventListener("blur", () => {
  skipLink.style.top = "-40px";
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ========== Service Worker Registration (PWA Support) ==========
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('/sw.js').then(registration => {
    //   console.log('ServiceWorker registered:', registration);
    // }).catch(error => {
    //   console.log('ServiceWorker registration failed:', error);
    // });
  });
}

// ========== Final Load Confirmation ==========
console.log(
  "%cAll scripts loaded and initialized successfully!",
  "color: #4CAF50; font-weight: bold;",
);
