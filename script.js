// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const mouseFollower = document.getElementById('mouseFollower');
const revealElements = document.querySelectorAll('.reveal-element');
const loadingScreen = document.getElementById('loadingScreen');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.cursor = 'none';
        }, 500);
    }, 3000);
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Mouse Follower
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;
    
    mouseFollower.style.left = followerX + 'px';
    mouseFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Enhanced mouse follower effects
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        mouseFollower.style.transform = 'scale(2)';
        mouseFollower.style.background = 'radial-gradient(circle, rgba(255, 0, 255, 0.8) 0%, transparent 70%)';
    });
    
    element.addEventListener('mouseleave', () => {
        mouseFollower.style.transform = 'scale(1)';
        mouseFollower.style.background = 'radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%)';
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal Animation on Scroll
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on load

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.glow-orb, .floating-elements');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced Hover Effects
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Server IP Copy Functions
function copyToClipboard(text) {
    // For demo purposes, using placeholder IPs
    const serverIPs = {
        'lifecity.server.ip': 'mtasa://lifecity.server.com:22003',
        'criminal.server.ip': 'mtasa://criminal.server.com:22003',
        'racing.server.ip': 'mtasa://racing.server.com:22003'
    };
    
    const ip = serverIPs[text] || text;
    
    navigator.clipboard.writeText(ip).then(() => {
        showNotification(`Server IP copied: ${ip}`);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(`Server IP copied: ${ip}`);
    });
}

function copyServerIP() {
    const serverIP = 'mtasa://play.scarlaiko.com:22003';
    
    navigator.clipboard.writeText(serverIP).then(() => {
        showNotification('Server IP copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = serverIP;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Server IP copied to clipboard!');
    });
}

function connectToServer() {
    const serverIP = 'mtasa://play.scarlaiko.com:22003';
    
    // Try to open MTA protocol
    window.location.href = serverIP;
    
    // Show notification
    showNotification('Connecting to server...');
    
    // Fallback: copy IP if protocol doesn't work
    setTimeout(() => {
        copyServerIP();
    }, 2000);
}

// Notification System
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Particle Animation Enhancement
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    document.querySelector('.animated-bg').appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 8000);
}

// Create additional particles periodically
setInterval(createParticle, 4000);

// Enhanced Button Animations
document.querySelectorAll('.btn, .discord-btn, .server-btn, .connect-btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add glow effect to elements on hover
document.querySelectorAll('.stat-item, .feature-item, .server-card, .video-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    revealOnScroll();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Dynamic Stats Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        if (!isNaN(finalValue) && finalValue !== '∞' && finalValue !== '24/7' && finalValue !== '100%') {
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue);
                }
            }, 50);
        }
    });
}

// Trigger stats animation when hero section is visible
const heroSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(heroSection);

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        this.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 100);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎮 Konami Code Activated! Epic Gamer Mode ON! 🎮');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        konamiCode = [];
    }
});

// Add smooth reveal animation for footer
const footer = document.querySelector('.footer');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(50px)';
            entry.target.style.transition = 'all 1s ease';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            footerObserver.unobserve(entry.target);
        }
    });
});

footerObserver.observe(footer);

// Add click sound effect (optional)
function playClickSound() {
    // Create audio context for click sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to buttons (uncomment to enable)
// document.querySelectorAll('button, .btn').forEach(button => {
//     button.addEventListener('click', playClickSound);
// });

console.log('🎮 sCarLai0ko Gaming Hub Loaded Successfully! 🎮');
console.log('🚀 Welcome to the ultimate gaming experience! 🚀');
