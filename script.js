document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS (Add this at the top of your DOMContentLoaded)
  emailjs.init("5BHqyXamxj3FKiwDo");

  // Updated form submission handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Get form values
      const formData = {
        name: this.querySelector("#name").value,
        email: this.querySelector("#email").value,
        subject: this.querySelector("#subject").value,
        message: this.querySelector("#message").value,
      };

      // Send email using EmailJS
      emailjs
        .send("service_x48wykh", "template_606jll1", formData)
        .then(function (response) {
          // Success message
          showNotification(
            "Message sent successfully! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        })
        .catch(function (error) {
          // Error message
          showNotification(
            "Failed to send message. Please try again or email me directly.",
            "error"
          );
          console.error("EmailJS Error:", error);
        })
        .finally(function () {
          // Reset button state
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add("show"), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Sticky navbar on scroll
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show/hide back to top button
    const backToTop = document.querySelector(".back-to-top");
    if (window.scrollY > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Typing animation for hero subtitle
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const texts = [
      "Computer Science Undergraduate",
      "Software Developer",
      "Full Stack Developer",
      "Tech Enthusiast",
      "Project Manager",
      "Business Analyst",
      "Data Analyst",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex === texts.length) textIndex = 0;
        setTimeout(type, 500);
      } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
      }
    }

    setTimeout(type, 1000);
  }

  // Animated Skill Bars on Scroll
  const animateSkillBars = () => {
    const skills = document.querySelectorAll(".skill-level");
    skills.forEach((skill) => {
      const width = skill.style.width;
      skill.style.width = "0";
      setTimeout(() => {
        skill.style.width = width;
      }, 100);
    });
  };

  // Initialize skill bars animation when scrolled to
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // Particle Background for Hero Section
  const initParticles = () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(0, 240, 255, ${Math.random() * 0.5 + 0.1})`,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles that are close to each other
        for (let j = 0; j < particles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(p.x - particles[j].x, 2) +
              Math.pow(p.y - particles[j].y, 2)
          );

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    });
  };

  initParticles();

  // Initialize VanillaTilt for 3D effects
  const initTiltEffects = () => {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    tiltElements.forEach((el) => {
      VanillaTilt.init(el, {
        max: 15,
        speed: 400,
        glare: el.hasAttribute("data-tilt-glare"),
        "max-glare": el.getAttribute("data-tilt-max-glare") || 0.2,
        scale: el.getAttribute("data-tilt-scale") || 1.05,
        perspective: 1000,
      });
    });
  };

  initTiltEffects();

  // Scroll progress indicator
  const addScrollProgress = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / height) * 100;
      progressBar.style.width = `${progress}%`;
    });
  };

  addScrollProgress();
});
