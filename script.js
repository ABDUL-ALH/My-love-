// ملف script.js
const correctPassword = "love"; // كلمة السر الصحيحة
let lastTap = 0; // For double tap prevention
const heartAnimations = new Map();

// Initialize function
function init() {
    const pages = ['password', 'home', 'story', 'gallery', 'memories', 'messages'];
    
    // Initialize heart animations
    pages.forEach(page => {
        const canvas = document.getElementById(`heartCanvas-${page}`);
        if (canvas && typeof HeartAnimation !== 'undefined') {
            const animation = new HeartAnimation(canvas);
            heartAnimations.set(page, animation);
            animation.start();
        }
    });

    // Initialize love counter
    updateLoveCounter();
}

function checkPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    const mainSite = document.getElementById('main-site');
    const passwordPage = document.getElementById('password-page');

    if (password.toLowerCase() === correctPassword.toLowerCase()) {
        // Hide password page
        passwordPage.style.opacity = '0';
        passwordPage.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            passwordPage.style.display = 'none';
            // Show main site
            mainSite.style.display = 'block';
            mainSite.style.opacity = '1';
            mainSite.style.transform = 'translateY(0)';
            // Show home page
            showPage('home');
        }, 500);

        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
        const passwordInput = document.getElementById('password-input');
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

function showPage(pageId) {
    // First hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'flex';
        selectedPage.classList.add('active');
        
        // Initialize content based on page
        switch(pageId) {
            case 'home':
                updateLoveCounter();
                break;
            case 'gallery':
                initializeGallery();
                break;
            case 'memories':
                initializeMemories();
                break;
            case 'messages':
                initializeMessages();
                break;
            case 'story':
                initializeStory();
                break;
        }

        // Ensure the canvas is visible
        const canvas = selectedPage.querySelector('.heart-canvas');
        if (canvas) {
            canvas.style.display = 'block';
            canvas.style.zIndex = '1';
        }

        // Force a reflow to trigger animations
        selectedPage.offsetHeight;
        selectedPage.style.opacity = '1';
    }

    // Close mobile menu if open
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid || !galleryGrid.children.length) {
        galleryGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <p>سيتم إضافة صورنا الجميلة قريباً ❤️</p>
            </div>
        `;
    }
}

function initializeMemories() {
    const memoryCards = document.querySelector('.memory-cards');
    if (!memoryCards || !memoryCards.children.length) {
        memoryCards.innerHTML = `
            <div class="memory-card">
                <h3>ذكرياتنا الأولى</h3>
                <p class="typewriter">كل لحظة معكِ هي ذكرى جميلة تستحق أن تُحفظ ❤️</p>
            </div>
            <div class="memory-card">
                <h3>لحظات لا تنسى</h3>
                <p class="typewriter">كل يوم معكِ يضيف ذكرى جديدة إلى قلبي ❤️</p>
            </div>
            <div class="memory-card">
                <h3>حكايتنا</h3>
                <p class="typewriter">قصة حب بدأت بالصدفة وستستمر إلى الأبد ❤️</p>
            </div>
        `;
    }
}

function initializeMessages() {
    const messagesContainer = document.querySelector('.messages-container');
    if (!messagesContainer || !messagesContainer.children.length) {
        messagesContainer.innerHTML = `
            <div class="message-card">
                <div class="message-content">
                    <p class="typewriter">حبيبتي الغالية</p>
                    <p class="typewriter">أنتِ أجمل ما في حياتي</p>
                    <p class="typewriter">كل يوم معكِ هو هدية من السماء</p>
                    <p class="typewriter">أحبك دائماً وأبداً ❤️</p>
                </div>
            </div>
            <div class="message-card">
                <div class="message-content">
                    <p class="typewriter">إلى نصفي الآخر</p>
                    <p class="typewriter">معكِ أصبحت الحياة أجمل</p>
                    <p class="typewriter">أنتِ سعادتي وفرحي</p>
                    <p class="typewriter">حبك يملأ قلبي ❤️</p>
                </div>
            </div>
        `;
    }
}

function initializeStory() {
    const storyContent = document.querySelector('.story-content');
    if (storyContent) {
        // Add animation delay to each paragraph
        storyContent.querySelectorAll('p').forEach((p, index) => {
            p.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    const passwordPage = document.getElementById('password-page');
    const mainSite = document.getElementById('main-site');
    const passwordInput = document.getElementById('password-input');
    const enterButton = document.querySelector('.enter-btn');
    const errorMessage = document.getElementById('error-message');

    // Initialize the site immediately
    init();

    // Set initial display states
    if (passwordPage) {
        passwordPage.style.display = 'flex';
        passwordPage.style.opacity = '1';
    }
    if (mainSite) {
        mainSite.style.display = 'none';
        mainSite.style.opacity = '0';
    }

    // Navigation handling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.getAttribute('href').substring(1) || 'home';
            showPage(pageId);
        });
    });

    // Event Listeners for password
    if (enterButton) {
        enterButton.addEventListener('click', checkPassword);
    }

    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    // Mobile navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Update scroll progress
function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator-progress').style.width = scrolled + '%';
}

// Love counter
function updateLoveCounter() {
    const startDate = new Date('2024-04-23'); // تاريخ بداية الحب
    const now = new Date();
    
    const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((now - startDate) / (1000 * 60 * 60) % 24);
    const minutes = Math.floor((now - startDate) / (1000 * 60) % 60);
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');

    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
}

// Update counter every minute
setInterval(updateLoveCounter, 60000);

// Scroll event listener
window.addEventListener('scroll', updateScrollProgress);

// Prevent zoom on double tap (mobile)
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
        e.preventDefault();
    }
    lastTap = now;
}, { passive: false });

// Quiz Game Configuration
const quizConfig = {
    questions: [
        {
            question: "ما هو لون عيني هبه المفضل؟",
            options: ["البني", "العسلي", "الأخضر"],
            correct: 1,
            hint: "لون يشبه العسل الصافي 🍯"
        },
        {
            question: "أين كان أول لقاء بيننا؟",
            options: ["في الجامعة", "في المقهى", "في الحديقة"],
            correct: 0,
            hint: "مكان العلم والمعرفة 📚"
        },
        {
            question: "ما هو طعام هبه المفضل؟",
            options: ["البيتزا", "السوشي", "البرجر"],
            correct: 2,
            hint: "وجبة سريعة ولذيذة 🍔"
        },
        {
            question: "ما هو لون هبه المفضل؟",
            options: ["الأحمر", "الوردي", "الأزرق"],
            correct: 1,
            hint: "لون الحب والرومانسية 💗"
        },
        {
            question: "ما هي هواية هبه المفضلة؟",
            options: ["القراءة", "الرسم", "الموسيقى"],
            correct: 0,
            hint: "تسافر بين الصفحات 📖"
        }
    ],
    maxAttempts: 2,
    pointsPerQuestion: 20
};

let currentQuestionIndex = 0;
let score = 0;
let attempts = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    attempts = 0;
    showQuestion();
    
    // Show quiz container with animation
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.opacity = '0';
    quizContainer.style.display = 'block';
    setTimeout(() => {
        quizContainer.style.opacity = '1';
        quizContainer.style.transform = 'translateY(0)';
    }, 100);
}

function showQuestion() {
    const question = quizConfig.questions[currentQuestionIndex];
    const quizContainer = document.querySelector('.quiz-container');
    
    quizContainer.style.opacity = '0';
    quizContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        quizContainer.innerHTML = `
            <div class="question-card">
                <h3>السؤال ${currentQuestionIndex + 1} من ${quizConfig.questions.length} 💝</h3>
                <p class="question-text">${question.question}</p>
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" onclick="checkAnswer(${index})">
                            <span class="option-text">${option}</span>
                        </button>
                    `).join('')}
                </div>
                <button class="hint-btn" onclick="showHint()">
                    <i class="fas fa-lightbulb"></i> احتاج مساعدة
                </button>
                <p class="current-score">النقاط الحالية: ${score}</p>
            </div>
        `;
        
        quizContainer.style.opacity = '1';
        quizContainer.style.transform = 'translateY(0)';
        
        // Animate options appearance
        const options = quizContainer.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            option.style.opacity = '0';
            option.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                option.style.transition = 'all 0.3s ease';
                option.style.opacity = '1';
                option.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }, 300);
}

function checkAnswer(selectedIndex) {
    const question = quizConfig.questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(option => option.disabled = true);
    
    if (selectedIndex === question.correct) {
        // Correct answer
        options[selectedIndex].classList.add('correct');
        score += quizConfig.pointsPerQuestion;
        showFeedback(true);
    } else {
        // Wrong answer
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
        attempts++;
        showFeedback(false);
    }
    
    setTimeout(() => {
        if (currentQuestionIndex < quizConfig.questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showFinalResults();
        }
    }, 1500);
}

function showHint() {
    const question = quizConfig.questions[currentQuestionIndex];
    const hintBtn = document.querySelector('.hint-btn');
    
    // Create and show hint tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'hint-tooltip';
    tooltip.textContent = question.hint;
    hintBtn.appendChild(tooltip);
    
    // Remove tooltip after 3 seconds
    setTimeout(() => tooltip.remove(), 3000);
}

function showFeedback(isCorrect) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedback.textContent = isCorrect ? 'أحسنت! 🎉' : 'حاول مرة أخرى ❤️';
    document.querySelector('.quiz-container').appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 1500);
}

function showFinalResults() {
    const percentage = (score / (quizConfig.questions.length * quizConfig.pointsPerQuestion)) * 100;
    const quizContainer = document.querySelector('.quiz-container');
    
    const resultsHTML = `
        <div class="results-card">
            <h2>النتيجة النهائية 🎉</h2>
            <div class="score-circle">
                <span class="final-score">${percentage}%</span>
            </div>
            <p class="score-message">${getScoreMessage(percentage)}</p>
            <p class="points-text">حصلت على ${score} نقطة</p>
            <button class="restart-btn" onclick="startQuiz()">
                <i class="fas fa-redo"></i> اللعب مرة أخرى
            </button>
        </div>
    `;
    
    quizContainer.innerHTML = resultsHTML;
}

function getScoreMessage(percentage) {
    if (percentage === 100) return "مذهل! أنت تعرف هبه جيداً جداً! 💝";
    if (percentage >= 80) return "رائع! أنت تعرف هبه جيداً! 💖";
    if (percentage >= 60) return "جيد! لكن هناك المزيد لتتعلمه عن هبه 💕";
    return "لا بأس، كل يوم ستتعرف على هبه أكثر ❤️";
}

// Function to check and handle empty content
function checkEmptyContent(pageId) {
    switch(pageId) {
        case 'gallery':
            const galleryGrid = document.querySelector('.gallery-grid');
            if (!galleryGrid || !galleryGrid.children.length) {
                galleryGrid.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-images"></i>
                        <p>سيتم إضافة صورنا الجميلة قريباً ❤️</p>
                    </div>
                `;
            }
            break;

        case 'memories':
            const memoryCards = document.querySelector('.memory-cards');
            if (!memoryCards.children.length) {
                memoryCards.innerHTML = `
                    <div class="memory-card">
                        <h3>ذكرياتنا الأولى</h3>
                        <p class="typewriter">كل لحظة معكِ هي ذكرى جميلة تستحق أن تُحفظ ❤️</p>
                    </div>
                `;
            }
            break;

        case 'messages':
            const messagesContainer = document.querySelector('.messages-container');
            if (!messagesContainer.children.length) {
                messagesContainer.innerHTML = `
                    <div class="message-card">
                        <div class="message-content">
                            <p class="typewriter">حبيبتي الغالية</p>
                            <p class="typewriter">أنتِ أجمل ما في حياتي</p>
                            <p class="typewriter">كل يوم معكِ هو هدية من السماء</p>
                            <p class="typewriter">أحبك دائماً وأبداً ❤️</p>
                        </div>
                    </div>
                `;
            }
            break;

        case 'story':
            const timeline = document.querySelector('.timeline');
            if (!timeline.children.length) {
                timeline.innerHTML = `
                    <div class="timeline-item">
                        <div class="date">بداية قصتنا</div>
                        <div class="content">
                            <h3>اللقاء الأول</h3>
                            <p class="typewriter">لحظة رأيتكِ فيها، عرفت أن حياتي ستتغير للأبد ❤️</p>
                        </div>
                    </div>
                `;
            }
            break;
    }
}

// Add CSS for empty state and content
const style = document.createElement('style');
style.textContent = `
    .empty-state {
        text-align: center;
        padding: 2rem;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        margin: 1rem;
        animation: fadeIn 0.5s ease-in-out;
    }
    .empty-state i {
        font-size: 3rem;
        color: var(--rose-pink);
        margin-bottom: 1rem;
    }
    .empty-state p {
        color: var(--rose-light);
        font-size: 1.2rem;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .page {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    .page.active {
        opacity: 1;
    }
`;
document.head.appendChild(style);