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

    var newsTicker = document.getElementById('news-ticker');
    if (newsTicker) {
        var newsItems = newsTicker.querySelectorAll('.news-item');
        var indicators = newsTicker.querySelectorAll('.indicator');
        var prevBtn = document.getElementById('news-prev');
        var nextBtn = document.getElementById('news-next');
        var currentNewsIndex = 0;
        var newsInterval;

        function showNews(index) {
            newsItems.forEach(function(item) { item.classList.remove('active'); });
            indicators.forEach(function(ind) { ind.classList.remove('active'); });
            newsItems[index].classList.add('active');
            if (indicators[index]) indicators[index].classList.add('active');
        }

        function nextNews() {
            currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
            showNews(currentNewsIndex);
        }

        function prevNews() {
            currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
            showNews(currentNewsIndex);
        }

        function startSlider() {
            newsInterval = setInterval(nextNews, 5000);
        }

        function resetSlider() {
            clearInterval(newsInterval);
            startSlider();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nextNews();
                resetSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prevNews();
                resetSlider();
            });
        }

        indicators.forEach(function(indicator, index) {
            indicator.addEventListener('click', function(e) {
                e.stopPropagation();
                currentNewsIndex = index;
                showNews(currentNewsIndex);
                resetSlider();
            });
        });

        startSlider();
    }
});
