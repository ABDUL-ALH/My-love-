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