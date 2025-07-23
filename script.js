// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Full-screen slideshow functionality
let currentFullscreenSlide = 0
const fullscreenSlides = document.querySelectorAll(".fullscreen-slide")
const fullscreenIndicators = document.querySelectorAll(".fullscreen-indicator")
const totalFullscreenSlides = fullscreenSlides.length

function showFullscreenSlide(index) {
  fullscreenSlides.forEach((slide) => slide.classList.remove("active"))
  fullscreenIndicators.forEach((indicator) => indicator.classList.remove("active"))

  fullscreenSlides[index].classList.add("active")
  fullscreenIndicators[index].classList.add("active")
}

function nextFullscreenSlide() {
  currentFullscreenSlide = (currentFullscreenSlide + 1) % totalFullscreenSlides
  showFullscreenSlide(currentFullscreenSlide)
}

function prevFullscreenSlide() {
  currentFullscreenSlide = (currentFullscreenSlide - 1 + totalFullscreenSlides) % totalFullscreenSlides
  showFullscreenSlide(currentFullscreenSlide)
}

// Full-screen slideshow controls
document.querySelector(".fullscreen-slide-nav .next-btn").addEventListener("click", nextFullscreenSlide)
document.querySelector(".fullscreen-slide-nav .prev-btn").addEventListener("click", prevFullscreenSlide)

// Full-screen indicator controls
fullscreenIndicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentFullscreenSlide = index
    showFullscreenSlide(currentFullscreenSlide)
  })
})

// Auto-play full-screen slideshow
setInterval(nextFullscreenSlide, 6000)

// University marquee pause on hover
const marqueeTrack = document.querySelector(".marquee-track")
if (marqueeTrack) {
  marqueeTrack.addEventListener("mouseenter", () => {
    marqueeTrack.style.animationPlayState = "paused"
  })

  marqueeTrack.addEventListener("mouseleave", () => {
    marqueeTrack.style.animationPlayState = "running"
  })
}

// Animated counters for statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Animate counters when stats section is visible
      if (entry.target.classList.contains("stats")) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".service-card, .testimonial-card, .stats, .partner-logo").forEach((el) => {
  observer.observe(el)
})

// Form submission
document.querySelector(".contact-form form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const form = e.target;
  const name = form.querySelector('input[placeholder="Your Name"]').value;
  const email = form.querySelector('input[placeholder="Your Email"]').value;
  const subject = form.querySelector('input[placeholder="Subject"]').value;
  const message = form.querySelector('textarea[placeholder="Your Message"]').value;

  // Construct mailto link
  const mailto = `mailto:manager.datican@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  )}`;

  // Open mail client
  window.location.href = mailto;

  // Optionally reset the form
  form.reset();
});

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (!this.classList.contains("loading")) {
      this.classList.add("loading")
      setTimeout(() => {
        this.classList.remove("loading")
      }, 2000)
    }
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-background")
  const speed = scrolled * 0.5

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Add CSS for loading animation
const style = document.createElement("style")
style.textContent = `
    .btn.loading {
        position: relative;
        color: transparent;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 50%;
        margin-left: -8px;
        margin-top: -8px;
        border-radius: 50%;
        border: 2px solid transparent;
        border-top-color: currentColor;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)

// Add hover effects for service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent
  typeWriter(heroTitle, originalText, 50)
})

// Set current year in footer
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
