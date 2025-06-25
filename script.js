// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    }),
  )
}

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

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Enhanced navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }
})

// Enhanced typing effect for hero title
function enhancedTypeWriter(element, lines, speed = 50, lineDelay = 800) {
  if (!element) return;

  let lineIndex = 0;
  let charIndex = 0;
  element.innerHTML = "";

  function typeLine() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];
    const span = document.createElement("span");
    span.className = "title-line";
    if (lineIndex === 1) span.classList.add("gradient-text");
    element.appendChild(span);

    function typeChar() {
      if (charIndex < currentLine.length) {
        span.innerHTML += currentLine.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, lineDelay);
      }
    }

    typeChar();
  }

  typeLine();
}


// 3D Card Interaction
function init3DCards() {
  const cards = document.querySelectorAll('.tech-card')
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = card.style.transform.replace(/scale$$[^)]*$$/, '') + ' scale(1.05)'
    })
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = card.style.transform.replace(/scale$$[^)]*$$/, '')
    })
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      
      const baseTransform = card.classList.contains('card-1') ? 'rotateX(5deg) rotateY(-5deg)' :
                           card.classList.contains('card-2') ? 'rotateX(-2deg) rotateY(3deg)' :
                           'rotateX(3deg) rotateY(-2deg)'
      
      card.style.transform = `${baseTransform} rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    })
  })
}

// Parallax effect for hero elements
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector('.hero')
    
    if (hero && scrolled < window.innerHeight) {
      // Parallax for background shapes
      const shapes = document.querySelectorAll('.shape')
      shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1)
        shape.style.transform = `translateY(${scrolled * speed}px)`
      })
      
      // Parallax for floating tech icons
      const techIcons = document.querySelectorAll('.tech-icon')
      techIcons.forEach((icon, index) => {
        const speed = 0.3 + (index * 0.05)
        icon.style.transform += ` translateY(${scrolled * speed}px)`
      })
    }
  })
}

// Enhanced intersection observer for animations
const enhancedObserverOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
      
      // Add stagger effect for multiple elements
      if (entry.target.classList.contains('tech-card')) {
        const cards = document.querySelectorAll('.tech-card')
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = card.style.transform.replace('translateY(30px)', 'translateY(0)')
          }, index * 200)
        })
      }
    }
  })
}, enhancedObserverOptions)

// Progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress')
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || '0%'
      const targetWidth = bar.style.width
      bar.style.width = '0%'
      setTimeout(() => {
        bar.style.width = targetWidth
      }, 100)
    }, index * 300)
  })
}

// Initialize all enhanced features
document.addEventListener("DOMContentLoaded", () => {
  // Initialize 3D cards
  init3DCards()
  
  // Initialize parallax
  initParallax()
  
  // Observe elements for animation with stagger
  const animateElements = document.querySelectorAll(".tech-card, .project-card, .tech-item, .skill-item")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    enhancedObserver.observe(el)
  })
  
  // Animate progress bars when cards are visible
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgressBars()
        cardObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  
  const cardStack = document.querySelector('.card-stack')
  if (cardStack) {
    cardObserver.observe(cardStack)
  }
})

 

// Add loading animation with enhanced preloader
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  
  // Remove preloader after animation
  setTimeout(() => {
    const preloader = document.querySelector('.preloader')
    if (preloader) {
      preloader.style.opacity = '0'
      setTimeout(() => {
        preloader.remove()
      }, 500)
    }
  }, 1000)
})

// Enhanced scroll-triggered animations
const scrollAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll]')
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate')
    }
  })
}

window.addEventListener('scroll', scrollAnimations)

// Smooth reveal animation for hero elements
const revealHeroElements = () => {
  const heroElements = [
    '.hero-badge',
    '.hero-title',
    '.hero-subtitle',
    '.hero-buttons',
    '.hero-social'
  ]
  
  heroElements.forEach((selector, index) => {
    const element = document.querySelector(selector)
    if (element) {
      setTimeout(() => {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, index * 200)
    }
  })
}

// Initialize hero animations
setTimeout(revealHeroElements, 500)

// Add dynamic particle generation
function createParticle() {
  const particle = document.createElement('div')
  particle.className = 'particle'
  particle.style.left = Math.random() * 100 + '%'
  particle.style.animationDuration = (Math.random() * 3 + 2) + 's'
  particle.style.opacity = Math.random()
  
  const particleContainer = document.querySelector('.floating-particles')
  if (particleContainer) {
    particleContainer.appendChild(particle);
    
    setTimeout(() => {
      particle.remove()
    }, 5000)
  }
}

// Generate particles periodically
setInterval(createParticle, 2000)

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)'
  })
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)'
  })
})

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2
  
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add('ripple')
  
  const ripple = button.getElementsByClassName('ripple')[0]
  if (ripple) {
    ripple.remove()
  }
  
  button.appendChild(circle);
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', createRipple)
})

// Add CSS for ripple effect
const rippleStyle = document.createElement('style')
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle);

// Form submission handling
// Init EmailJS
document.addEventListener("DOMContentLoaded", () => {
  // Make sure EmailJS is loaded
  if (typeof emailjs !== 'undefined') {
    emailjs.init("li0aeRFYqDzj79DvY"); // your public key
  }

  const contactForm = document.querySelector(".form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        Swal.fire({
        icon: 'warning',
        title: 'Hold on!',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#764ba2'
});
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        Swal.fire({
        icon: 'warning',
        title: 'Invalid email',
        text: 'Please enter a valid email address.',
        confirmButtonColor: '#764ba2'
      });
        return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      emailjs.sendForm("service_4xquj6m", "template_7gti756", this)
        .then(() => {
          Swal.fire({
                icon: 'success',
                title: 'Message sent!',
                text: 'Thank you , I’ll get back to you soon.',
                confirmButtonColor: '#00b894'
              });
          this.reset();
        })
        .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops…',
            text: 'Failed to send. Please try again later.',
            confirmButtonColor: '#e74c3c'
          });
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});


// Preloader styles
const style = document.createElement("style")
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
        transform: translate(-50%, -50%);
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`
document.head.appendChild(style);
 
 
