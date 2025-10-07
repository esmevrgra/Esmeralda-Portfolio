// -------------------------------------------
// COMPLEX JAVASCRIPT FOR DYNAMIC WEBSITE v7 (FINAL)
// Scroll Reveal, Animation, and Scroll Color Gradient
// -------------------------------------------

// --- Configuration & Global Elements ---
const initialCodeText = "print('Hello World');";
const typingSpeedCode = 70; 
const typingSpeedName = 100; 
const delayAfterCodeTyping = 500; 
const delayAfterEnterSound = 200; 
const delayAfterNameJump = 1000; 

const heroNameElement = document.querySelector('.hero-name');
const animatedSkillsContainer = document.querySelector('.animated-skills-container');
const enterSound = document.getElementById('enterSound');
const overlayNav = document.querySelector('.overlay-navigation');
const heroSection = document.getElementById('hero');
const contentSections = document.querySelectorAll('main .full-width-section'); // NEW

const skillsForAnimation = [
    "C++", "HTML5", "CSS3", "JavaScript", "Python",
    "Git/GitHub", "Responsive Design", "Data Structures", "Algorithms", "Debugging"
];
let finalNameText = "Hello I am Esmeralda!"; 

// --- 1. CORE ANIMATION SEQUENCE (Called on user click) ---
function initializeDramaticIntro() {
    // Phase 1, 2, 3, 4 logic (Type Code, Play Sound, Type Name, Animate Skills)
    // ... (This complex logic remains the same as your previous script)
    
    // START CODE TYPING
    heroNameElement.textContent = '';
    heroNameElement.classList.add('typing-code');
    let charIndex = 0;

    function typeCode() {
        if (charIndex < initialCodeText.length) {
            heroNameElement.textContent += initialCodeText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCode, typingSpeedCode);
        } else {
            heroNameElement.classList.add('finished-typing-code');
            setTimeout(playEnterSoundAndRevealName, delayAfterCodeTyping);
        }
    }

    function playEnterSoundAndRevealName() {
        if (enterSound) {
            enterSound.currentTime = 0; 
            enterSound.play().catch(e => console.error("Sound play blocked:", e)); 
        }
        
        heroNameElement.classList.remove('typing-code', 'finished-typing-code');
        heroNameElement.textContent = '';
        
        heroSection.style.animation = 'none'; 
        void heroSection.offsetWidth; 
        heroSection.style.animation = 'backgroundPulse 10s ease-in-out infinite alternate';

        setTimeout(() => {
            heroNameElement.classList.add('name-reveal');
            
            let nameCharIndex = 0;
            function typeName() {
                if (nameCharIndex < finalNameText.length) {
                    heroNameElement.textContent += finalNameText.charAt(nameCharIndex);
                    nameCharIndex++;
                    setTimeout(typeName, typingSpeedName);
                } else {
                    heroNameElement.classList.add('finished-typing-name'); 
                    setTimeout(animateSkillsAroundName, delayAfterNameJump);
                }
            }
            typeName(); 
        }, delayAfterEnterSound);
    }
    
    typeCode(); 
}


// --- 2. SKILL LAYOUT ANIMATION (Same as before) ---
function animateSkillsAroundName() {
    setTimeout(() => { 
        const nameRect = heroNameElement.getBoundingClientRect();
        const centerX = nameRect.left + nameRect.width / 2;
        const centerY = nameRect.top + nameRect.height / 2;
        const radius = 250; 
        const numSkills = skillsForAnimation.length;

        skillsForAnimation.forEach((skill, index) => {
            const skillTag = document.createElement('span');
            skillTag.classList.add('animated-skill-tag');
            skillTag.textContent = skill;
            animatedSkillsContainer.appendChild(skillTag);

            const angle = (index / numSkills) * 2 * Math.PI; 
            const targetX = centerX + radius * Math.cos(angle);
            const targetY = centerY + radius * Math.sin(angle);
            
            skillTag.style.left = `${centerX - skillTag.offsetWidth / 2}px`; 
            skillTag.style.top = `${centerY - skillTag.offsetHeight / 2}px`;

            setTimeout(() => {
                const tagRect = skillTag.getBoundingClientRect(); 
                skillTag.style.left = `${targetX - tagRect.width / 2}px`;
                skillTag.style.top = `${targetY - tagRect.height / 2}px`;
                skillTag.style.opacity = 1;
                skillTag.style.transform = `scale(1) rotate(${Math.random() * 20 - 10}deg)`;
            }, 100 + index * 100); 
        });
        
        const totalSkillDuration = 100 + (numSkills * 100) + 500; 
        setTimeout(() => {
            overlayNav.classList.add('visible');
            document.querySelector('.hero-scroll-prompt').style.opacity = 0.8;
            document.querySelector('.hero-scroll-prompt').style.animation = 'bounce 2s infinite, fadeIn 1s forwards';
        }, totalSkillDuration); 

    }, 1000); 
}


// --- 3. SCROLL-BASED COLOR CHANGE (Same as before) ---
const colorScrollPoints = [
    { scrollY: 0, varName: '--bg-color-1' },
    { scrollY: 600, varName: '--bg-color-2' },
    { scrollY: 1200, varName: '--bg-color-3' },
    { scrollY: 1800, varName: '--bg-color-4' },
    { scrollY: 2400, varName: '--bg-color-5' },
];

function getRgb(hex) {
    let r = 0, g = 0, b = 0;
    // ... (logic to convert hex to RGB)
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) { 
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return [r, g, b];
}

function interpolateColors(color1, color2, factor) {
    const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
    return `rgb(${result.join(',')})`;
}

function handleScrollColorChange() {
    const currentScrollY = window.scrollY;
    const rootStyles = getComputedStyle(document.documentElement);
    let targetColor = rootStyles.getPropertyValue(colorScrollPoints[0].varName).trim(); 

    for (let i = 0; i < colorScrollPoints.length - 1; i++) {
        const p1 = colorScrollPoints[i];
        const p2 = colorScrollPoints[i + 1];

        const color1 = rootStyles.getPropertyValue(p1.varName).trim();
        const color2 = rootStyles.getPropertyValue(p2.varName).trim();

        if (currentScrollY >= p1.scrollY && currentScrollY < p2.scrollY) {
            const factor = (currentScrollY - p1.scrollY) / (p2.scrollY - p1.scrollY);
            targetColor = interpolateColors(getRgb(color1), getRgb(color2), factor);
            break;
        } else if (currentScrollY >= p2.scrollY && i === colorScrollPoints.length - 2) {
            targetColor = color2; 
        }
    }
    document.body.style.backgroundColor = targetColor;
}


// --- 4. SCROLL INTERACTION LOGIC (Intersection Observer for Reveal) ---

// Observer options: watch when 20% of the section is visible, with a margin of 40%
const observerOptions = {
    root: null,
    // -40% margin ensures sections start fading in well before they hit the middle of the screen
    rootMargin: '0px 0px -40% 0px', 
    threshold: 0.2 
};

function handleIntersection(entries) {
    entries.forEach(entry => {
        const targetId = entry.target.id;
        
        if (entry.isIntersecting) {
            // Section is visible: activate it
            entry.target.classList.add('active-scroll');
            
            // Hide the hero once the first section is active
            if (targetId === 'summary') {
                heroSection.style.opacity = 0;
            }

        } else {
            // Section is no longer the main focus: deactivate it
            entry.target.classList.remove('active-scroll');
            
            // Bring hero back if scrolling UP past the top section
            if (targetId === 'summary' && window.scrollY < 100) {
                heroSection.style.opacity = 1;
            }
        }
    });
}

// Create the observer instance
const sectionObserver = new IntersectionObserver(handleIntersection, observerOptions);


// --- 5. THEMATIC CURSOR TRAIL (Same as before) ---
document.addEventListener('mousemove', (e) => {
    // ... (Cursor logic remains the same)
    const inHero = e.clientY < heroSection.offsetHeight;
    const petal = document.createElement('span');
    petal.classList.add('cursor-petal');
    
    petal.style.left = e.clientX + 'px';
    petal.style.top = e.clientY + 'px';
    
    const size = Math.random() * (inHero ? 8 : 15) + (inHero ? 3 : 5); 
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.opacity = inHero ? 0.6 : 0.9;
    
    document.body.appendChild(petal);

    setTimeout(() => {
        petal.style.opacity = 0;
        petal.style.transform = `translateY(${Math.random() * 50 - 25}px) rotate(${Math.random() * 360}deg) scale(0)`;
    }, 10);

    setTimeout(() => {
        petal.remove();
    }, 1500);
});


// --- 6. INITIALIZE SCRIPTS (Window Load) ---
window.addEventListener('load', () => {
    const startButton = document.getElementById('start-button');
    const startOverlay = document.getElementById('start-overlay');
    
    finalNameText = heroNameElement.dataset.finalName || "Hello I am Esmeralda!";

    // Initialize scroll color logic
    handleScrollColorChange();

    // Attach listener to the Start button
    startButton.addEventListener('click', () => {
        startOverlay.style.opacity = 0;
        setTimeout(() => {
            startOverlay.style.display = 'none';
            initializeDramaticIntro(); 
            
            // *** NEW: Start observing all content sections after animation ***
            contentSections.forEach(section => {
                sectionObserver.observe(section);
            });
            
        }, 500); 
    }, { once: true });
});

window.addEventListener('scroll', handleScrollColorChange);