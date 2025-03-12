// ملف script.js
const correctPassword = "123"; // كلمة السر الصحيحة

function checkPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    const mainSite = document.getElementById('main-site');
    const passwordPage = document.getElementById('password-page');

    if (password === correctPassword) {
        // إخفاء صفحة كلمة السر وإظهار الموقع
        passwordPage.style.display = 'none';
        mainSite.style.display = 'block';
    } else {
        // عرض رسالة الخطأ
        errorMessage.style.display = 'block';
    }
}

function showPage(pageId) {
    // إخفاء جميع الصفحات
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // إظهار الصفحة المطلوبة
    document.getElementById(pageId).style.display = 'flex';
}

function selectChoice(choice) {
    // عرض الاختيار الذي تم تحديده
    document.getElementById('selected-choice').innerText = `اختياركِ هو: ${choice}`;
}

class TypeWriter {
    constructor(element, options = {}) {
        // The element to type into
        this.element = element;
        
        // Just display the text without animation
        this.init();
    }

    init() {
        // Keep the original text without animation
        const originalText = this.element.textContent;
        this.element.style.opacity = '1';
        this.element.style.visibility = 'visible';
    }
}

// Initialize static text display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with typewriter class
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        // Create new instance to handle the text display
        new TypeWriter(element);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypeWriter;
}