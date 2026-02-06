document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const btnNo = document.getElementById('no-btn');
    const btnYes = document.getElementById('yes-btn');
    const mainCard = document.getElementById('main-card');
    const celebrationCard = document.getElementById('celebration-card');

    // Scale for Yes button
    let yesScale = 1;

    // --- No Button "Run Away" Logic ---
    function moveNoBtn() {
        // 1. Make Yes button bigger and more commanding
        yesScale += 0.2;
        if (btnYes) {
            btnYes.style.transform = `scale(${yesScale})`;

            // Change text of Yes button as it grows
            const yesTexts = ["Yes!", "Please?", "Really?", "Come on!", "JUST SAY YES! ❤️", "I'LL CRY 😢", "YOU HAVE NO CHOICE!"];
            let textIndex = Math.min(Math.floor(yesScale / 1.2), yesTexts.length - 1);
            btnYes.innerText = yesTexts[textIndex];
        }

        // 2. Move No button
        const x = Math.random() * (window.innerWidth - btnNo.offsetWidth - 50);
        const y = Math.random() * (window.innerHeight - btnNo.offsetHeight - 50);

        // Ensure it doesn't go off screen
        const safeX = Math.max(20, Math.min(x, window.innerWidth - 120));
        const safeY = Math.max(20, Math.min(y, window.innerHeight - 80));

        btnNo.style.position = 'fixed';
        btnNo.style.left = `${safeX}px`;
        btnNo.style.top = `${safeY}px`;
        btnNo.style.zIndex = '1000';
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
        // Hide Main Card
        mainCard.classList.remove('active');

        // Show Celebration Card
        celebrationCard.classList.add('active');

        // Confetti Explosion
        const duration = 8000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Random confetti
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // Massive Heart Burst in center
        confetti({
            particleCount: 150,
            spread: 100,
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
            heart.style.opacity = Math.random() * 0.5 + 0.1;

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

    // Inject styles for hearts dynamically if not present (safeguard)
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes floatUp {
            to { transform: translateY(-120vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
});
