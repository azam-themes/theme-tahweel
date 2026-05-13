/**
 * ثيم تحويل - Tahweel Theme
 * JavaScript الرئيسي
 * مركز على الأداء وتحسين تجربة المستخدم
 */

(function() {
    'use strict';

    // ============================================
    // Lazy Loading Images
    // ============================================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // Product Card Hover Effect (Touch Devices)
    // ============================================
    if ('ontouchstart' in window) {
        document.querySelectorAll('.product-card').forEach(function(card) {
            card.addEventListener('touchstart', function() {
                this.classList.add('product-card--touched');
            });
            card.addEventListener('touchend', function() {
                var self = this;
                setTimeout(function() { self.classList.remove('product-card--touched'); }, 300);
            });
        });
    }

    // ============================================
    // Animation on Scroll
    // ============================================
    if ('IntersectionObserver' in window) {
        var animObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section').forEach(function(section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animObserver.observe(section);
        });
    }

    // ============================================
    // Copy Product Link
    // ============================================
    window.copyProductLink = function() {
        navigator.clipboard.writeText(window.location.href).then(function() {
            // Show toast notification
            showToast('تم نسخ الرابط بنجاح');
        });
    };

    // ============================================
    // Toast Notification
    // ============================================
    function showToast(message) {
        var toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1f2937;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;animation:fadeInUp 0.3s ease;';
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }

    window.showToast = showToast;

})();
