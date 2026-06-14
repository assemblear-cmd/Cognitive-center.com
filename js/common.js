document.addEventListener('DOMContentLoaded', function() {
    var languageToggle = document.getElementById('language-toggle');
    var languageDropdown = document.getElementById('language-dropdown');

    if (languageToggle && languageDropdown) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            languageDropdown.classList.remove('active');
        });
    }

    var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var header = document.querySelector('.site-header');
                var headerHeight = header ? header.offsetHeight : 0;
                var targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
});
