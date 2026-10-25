// Smooth Dynamic Magnifying Glass Zoom Ring Tracker (Desktop Only)
const zoomLensRing = document.getElementById('zoomLensRing');

if (zoomLensRing) {
    window.addEventListener('mousemove', (e) => {
        zoomLensRing.style.left = `${e.clientX}px`;
        zoomLensRing.style.top = `${e.clientY}px`;
    });

    const interactiveTargets = document.querySelectorAll('a, button, input, textarea, .keycap-3d, .theme-btn');
    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => zoomLensRing.classList.add('hovered'));
        target.addEventListener('mouseleave', () => zoomLensRing.classList.remove('hovered'));
    });
}

// Background Music Control Logic
const bgAudio = document.getElementById('bgAudio');
const musicToggleBtn = document.getElementById('musicToggleBtn');
let isMusicPlaying = false;

if (bgAudio) {
    bgAudio.volume = 0.4;
}

function toggleBackgroundMusic() {
    if (!bgAudio) return;
    if (isMusicPlaying) {
        bgAudio.pause();
        isMusicPlaying = false;
        if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
    } else {
        bgAudio.play().then(() => {
            isMusicPlaying = true;
            if (musicToggleBtn) musicToggleBtn.classList.add('playing');
        }).catch(err => {
            console.log("Audio autoplay restricted by browser policy until interaction.", err);
        });
    }
}

if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleBackgroundMusic);
}

// Scroll Reveal Animation Observer
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.scroll-reveal').forEach(section => {
    revealObserver.observe(section);
});

// Interactive TikTok Video 3D Keyboard Controller with Instant Zero-Lag Pop-up
const keycaps = document.querySelectorAll('.keycap-3d');
const skillActiveDisplay = document.getElementById('skillActiveDisplay');
const activeSkillTitle = document.getElementById('activeSkillTitle');
const activeSkillDesc = document.getElementById('activeSkillDesc');
const activeSkillBadges = document.getElementById('activeSkillBadges');

function triggerKey(keycap) {
    if (!keycap) return;

    keycaps.forEach(k => k.classList.remove('pressed'));
    keycap.classList.add('pressed');
    setTimeout(() => keycap.classList.remove('pressed'), 150);

    const title = keycap.getAttribute('data-title');
    const desc = keycap.getAttribute('data-desc');
    const tools = keycap.getAttribute('data-tools').split(',');

    if (activeSkillTitle && activeSkillDesc && activeSkillBadges && skillActiveDisplay) {
        skillActiveDisplay.classList.add('popup-pop');
        setTimeout(() => skillActiveDisplay.classList.remove('popup-pop'), 120);

        activeSkillTitle.textContent = title;
        activeSkillDesc.textContent = desc;
        
        activeSkillBadges.innerHTML = '';
        tools.forEach(tool => {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = tool.trim();
            activeSkillBadges.appendChild(badge);
        });
    }
}

keycaps.forEach(keycap => {
    keycap.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerKey(keycap);
    });
    // Add touch support for mobile devices
    keycap.addEventListener('touchend', (e) => {
        e.preventDefault();
        triggerKey(keycap);
    });
});

window.addEventListener('keydown', () => {
    const randomKey = keycaps[Math.floor(Math.random() * keycaps.length)];
    triggerKey(randomKey);
});

// Word-level Text Scale/Glow Hover Animation Engine
document.querySelectorAll('.hover-words').forEach(el => {
    const processNode = (node) => {
        const fragment = document.createDocumentFragment();
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const tokens = text.split(/(\s+)/);
            tokens.forEach(token => {
                if (/\s+/.test(token)) {
                    fragment.appendChild(document.createTextNode(token));
                } else if (token.length > 0) {
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.textContent = token;
                    fragment.appendChild(span);
                }
            });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const outerElem = document.createElement(node.tagName);
            outerElem.className = node.className;
            Array.from(node.childNodes).forEach(child => {
                outerElem.appendChild(processNode(child));
            });
            fragment.appendChild(outerElem);
        }
        return fragment;
    };

    const childNodes = Array.from(el.childNodes);
    el.innerHTML = '';
    childNodes.forEach(child => {
        el.appendChild(processNode(child));
    });
});

// Profile Translation Hover Logic (Desktop Hover & Mobile Touch Support)
const realPhoto = document.getElementById('realPhoto');
const artVideo = document.getElementById('artVideo');
const portraitContainer = document.getElementById('portraitContainer');

if (portraitContainer && realPhoto && artVideo) {
    portraitContainer.addEventListener('mouseenter', () => {
        realPhoto.classList.remove('active');
        artVideo.classList.add('active');
        artVideo.currentTime = 0;
        artVideo.play();
    });

    portraitContainer.addEventListener('mouseleave', () => {
        artVideo.classList.remove('active');
        realPhoto.classList.add('active');
    });

    portraitContainer.addEventListener('click', () => {
        if (artVideo.classList.contains('active')) {
            artVideo.classList.remove('active');
            realPhoto.classList.add('active');
        } else {
            realPhoto.classList.remove('active');
            artVideo.classList.add('active');
            artVideo.currentTime = 0;
            artVideo.play();
        }
    });
}

// Aesthetic Intro Screen Handler
const introScreen = document.getElementById('introScreen');
const enterBtn = document.getElementById('enterBtn');

function fadeOutIntro() {
    if (introScreen) {
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 800);
    }
    if (bgAudio && !isMusicPlaying) {
        bgAudio.play().then(() => {
            isMusicPlaying = true;
            if (musicToggleBtn) musicToggleBtn.classList.add('playing');
        }).catch(err => console.log("Audio play blocked", err));
    }
}

if (enterBtn) {
    enterBtn.addEventListener('click', fadeOutIntro);
}

// Typing Effect Animation
const words = ["Cybersecurity Enthusiast", "Ethical Hacker", "Network Security Student", "Developer"];
const typingEl = document.querySelector(".typing-text");
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    if (!typingEl) return;
    const current = words[wordIndex];
    typingEl.textContent = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    let speed = isDeleting ? 50 : 110;

    if (!isDeleting && charIndex === current.length + 1) {
        isDeleting = true;
        speed = 1600;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 280;
    }
    setTimeout(type, speed);
}
type();

// Mobile Navigation Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navOverlay = document.getElementById("navOverlay");
const navLinksAll = document.querySelectorAll(".navbar a");

function toggleMobileMenu() {
    if (navbar && menuToggle) {
        navbar.classList.toggle("active");
        if (navOverlay) navOverlay.classList.toggle("active");

        const icon = menuToggle.querySelector("i");
        if (icon) {
            if (navbar.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        }
    }
}

function closeMobileMenu() {
    if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars";
    }
}

if (menuToggle) menuToggle.addEventListener("click", toggleMobileMenu);
if (navOverlay) navOverlay.addEventListener("click", closeMobileMenu);

navLinksAll.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

// Scroll Spy: Update Active Navbar Link
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 180;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinksAll.forEach(link => {
                link.classList.remove("active");
                const target = document.querySelector('.navbar a[href*=' + id + ']');
                if (target) target.classList.add("active");
            });
        }
    });
}, { passive: true });

// Heavenly Gate Opening Transition Effect
const gateTriggers = document.querySelectorAll('.nav-gate-trigger');
const heavenGate = document.getElementById('heavenGate');

gateTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        if (heavenGate) {
            heavenGate.classList.add('opening');
            setTimeout(() => {
                heavenGate.classList.remove('opening');
            }, 1050);
        }
    });
});

// Direct Background AJAX Form Submission ("WAIT FOR MY RESPOND")
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (submitBtn) {
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
        }

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                if (successModal) successModal.classList.add('active');
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
            }
        }).catch(() => {
            alert('Network error. Please check your internet connection.');
        }).finally(() => {
            if (submitBtn) {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }
        });
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (successModal) successModal.classList.remove('active');
    });
}

// Dynamic Theme Switcher Ripple Animation
function switchThemeWithAnimation(themeName, event) {
    const ripple = document.getElementById('themeRipple');
    if (!ripple) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    const colors = {
        'red-mode': '#110b0b',
        'blue-mode': '#0b1120',
        'green-mode': '#05160a',
        'black-mode': '#000000',
        'light-mode': '#f8fafc'
    };
    ripple.style.backgroundColor = colors[themeName] || '#0b1120';

    ripple.classList.add('active');

    setTimeout(() => {
        document.body.className = themeName;
        localStorage.setItem('portfolio_theme', themeName);
    }, 250);

    setTimeout(() => {
        ripple.classList.remove('active');
    }, 600);
}

// Load Saved Theme State on Startup
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('portfolio_theme') || 'blue-mode';
    document.body.className = savedTheme;
});