// ============================================
// B. Daniel Martinez Portfolio - Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile nav when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple fade-in animation on scroll
    // Elements start visible, then get subtle animation when scrolled into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe - but use CSS transition, not hiding
    document.querySelectorAll('.script-card, .novel-card, .voice-card, .testimonial, .stat').forEach(el => {
        // Start slightly faded and offset, but still visible
        el.style.opacity = '0.3';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // Immediately show all elements that are already in viewport
    requestAnimationFrame(() => {
        document.querySelectorAll('.script-card, .novel-card, .voice-card, .testimonial, .stat').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    });

    // ============================================
    // Custom Audio Player
    // ============================================
    document.querySelectorAll('.audio-player').forEach(function(player) {
        var audio = new Audio();
        audio.preload = 'metadata';
        audio.src = player.getAttribute('data-src');
        
        var playBtn = player.querySelector('.play-btn');
        var progressBar = player.querySelector('.progress-bar');
        var progressFill = player.querySelector('.progress-fill');
        var timeDisplay = player.querySelector('.audio-time');
        var isPlaying = false;

        function formatTime(sec) {
            if (isNaN(sec) || !isFinite(sec)) return '0:00';
            var m = Math.floor(sec / 60);
            var s = Math.floor(sec % 60);
            return m + ':' + (s < 10 ? '0' : '') + s;
        }

        audio.addEventListener('loadedmetadata', function() {
            timeDisplay.textContent = '0:00 / ' + formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', function() {
            var pct = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = pct + '%';
            timeDisplay.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
        });

        audio.addEventListener('ended', function() {
            playBtn.textContent = '▶';
            isPlaying = false;
            progressFill.style.width = '0%';
            audio.currentTime = 0;
            timeDisplay.textContent = '0:00 / ' + formatTime(audio.duration);
        });

        playBtn.addEventListener('click', function() {
            // Stop all other players first
            document.querySelectorAll('.audio-player').forEach(function(other) {
                if (other !== player && other._audio) {
                    other._audio.pause();
                    other._audio.currentTime = 0;
                    other.querySelector('.play-btn').textContent = '▶';
                    other.querySelector('.progress-fill').style.width = '0%';
                    if (other._audio.duration) {
                        other.querySelector('.audio-time').textContent = '0:00 / ' + formatTime(other._audio.duration);
                    }
                }
            });

            if (isPlaying) {
                audio.pause();
                playBtn.textContent = '▶';
            } else {
                audio.play();
                playBtn.textContent = '⏸';
            }
            isPlaying = !isPlaying;
        });

        progressBar.addEventListener('click', function(e) {
            var rect = progressBar.getBoundingClientRect();
            var pct = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pct * audio.duration;
        });

        // Store audio reference on the player element
        player._audio = audio;

        // Try to load the audio to get duration
        audio.load();
    });
});
