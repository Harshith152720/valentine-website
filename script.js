document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let currentStepNum = 1;

    // --- Elements ---
    const btnNo = document.getElementById('no-btn');
    const btnYes = document.getElementById('yes-btn');
    const mainCard = document.getElementById('main-card');
    const celebrationCard = document.getElementById('celebration-card');

    // Scale for Yes button
    let yesScale = 1;

    // --- Navigation Functions ---
    window.nextStep = function (stepNumber) {
        // Hide all steps
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => step.classList.remove('active'));

        // Show specific step after a tiny delay for smooth animation
        setTimeout(() => {
            let nextElement;
            if (stepNumber === 6) {
                nextElement = document.getElementById('main-card');
            } else if (stepNumber === 7) {
                nextElement = document.getElementById('celebration-card');
            } else {
                nextElement = document.getElementById(`step-${stepNumber}`);
            }

            if (nextElement) {
                nextElement.classList.add('active');
                currentStepNum = stepNumber;

                // Reset scroll to top of card area if needed
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 300);
    };

    // --- No Button "Run Away" Logic ---
    function moveNoBtn() {
        // 1. Make Yes button bigger and more commanding
        yesScale += 0.22;
        if (btnYes) {
            btnYes.style.transform = `scale(${yesScale})`;

            // Change text of Yes button as it grows
            const yesTexts = ["Yes!", "Please?", "Really?", "Come on!", "JUST SAY YES! ❤️", "I'LL CRY 😢", "YOU HAVE NO CHOICE!"];
            let textIndex = Math.min(Math.floor(yesScale / 1.2), yesTexts.length - 1);
            btnYes.innerText = yesTexts[textIndex];
        }

        // 2. Move No button
        const x = Math.random() * (window.innerWidth - (btnNo?.offsetWidth || 100) - 50);
        const y = Math.random() * (window.innerHeight - (btnNo?.offsetHeight || 50) - 50);

        // Ensure it doesn't go off screen
        const safeX = Math.max(20, Math.min(x, window.innerWidth - 120));
        const safeY = Math.max(20, Math.min(y, window.innerHeight - 80));

        if (btnNo) {
            btnNo.style.position = 'fixed';
            btnNo.style.left = `${safeX}px`;
            btnNo.style.top = `${safeY}px`;
            btnNo.style.zIndex = '1000';
        }
    }

    if (btnNo) {
        btnNo.addEventListener('mouseover', moveNoBtn);
        btnNo.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveNoBtn();
        });
        btnNo.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoBtn();
        });
    }

    // --- Reasons Logic ---
    const reasonsBtn = document.getElementById('reasons-btn');
    const reasonText = document.getElementById('reason-text');
    const reasons = [
        "Your smile lights up my whole world! ✨",
        "You're the kindest person I know. ❤️",
        "The way you make me laugh until my stomach hurts! 😂",
        "Your eyes are my favorite place to get lost in. 👀",
        "You're my best friend and my soulmate. 🤝",
        "Just being around you makes everything better. 🌈",
        "You always know how to make me feel special. 💖"
    ];

    if (reasonsBtn) {
        reasonsBtn.addEventListener('click', () => {
            const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
            reasonText.style.opacity = '0';
            setTimeout(() => {
                reasonText.innerText = randomReason;
                reasonText.style.opacity = '1';
            }, 200);
        });
    }

    // --- Yes Button Logic ---
    if (btnYes) {
        btnYes.addEventListener('click', () => {
            triggerCelebration();
        });
    }

    function triggerCelebration() {
        // Reset Yes button transform if it was huge
        btnYes.style.transform = 'scale(1)';

        // Use generic nextStep logic to move to celebration
        window.nextStep(7);

        // Confetti Explosion
        const duration = 10000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 100, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 60 * (timeLeft / duration);

            // Random confetti
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 200);

        // Massive Heart Burst in center
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            shapes: ['heart'],
            colors: ['#ff0a54', '#ff477e', '#ff85a1']
        });
    }

    // --- Decorations ---
    createFloatingHearts();

    function createFloatingHearts() {
        const bgContainer = document.getElementById('background-effects');
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('bg-heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 5 + 's';
            heart.style.opacity = Math.random() * 0.4 + 0.1;

            // Minimal styling for these dynamic hearts
            heart.style.position = 'absolute';
            heart.style.top = '100%';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animation = `floatUp ${Math.random() * 5 + 5}s linear forwards`;

            bgContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 800);
    }

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUp {
            to { transform: translateY(-120vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
});
