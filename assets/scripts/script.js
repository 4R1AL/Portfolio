const ham  = document.getElementById('ham');
const menu = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
});

document.body.classList.add('dark-theme');

function closeMenu() {
    menu.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', false);
}

// Improve mobile anchor behavior: programmatically scroll to targets
// taking the sticky navbar height into account, then close the menu.
document.querySelectorAll('#mobileMenu a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);

        if (!target) {
            closeMenu();
            return;
        }

        const navEl = document.querySelector('nav');
        const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;

        const top = window.scrollY + target.getBoundingClientRect().top - navHeight - 8;

        window.scrollTo({ top, behavior: 'smooth' });

        // close the mobile menu after starting the scroll
        closeMenu();
    });
});

const observer = new IntersectionObserver(

    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add('in');

                observer.unobserve(entry.target);
            }

        });
    },

    {
        threshold:   0.12,
        rootMargin:  '0px 0px -30px 0px'
    }

);

document.querySelectorAll('.rv').forEach((el) => {
    observer.observe(el);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
        closeMenu();
    }
});

const year = new Date().getFullYear();
document.getElementById('year').textContent = year;

// ── COPY ON CLICK ─────────────────────────────────────────────
document.querySelectorAll('.copy-on-click').forEach(el => {
    el.addEventListener('click', async (e) => {
        const textToCopy = el.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Show feedback
            const originalText = el.innerHTML;
            el.innerHTML = '<span>Discord</span>✓ Copied: ah_duo';
            el.classList.add('copied');
            
            // Reset after 2 seconds
            setTimeout(() => {
                el.innerHTML = originalText;
                el.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });
});