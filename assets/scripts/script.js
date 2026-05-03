const ham  = document.getElementById('ham');
const menu = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
});

function closeMenu() {
    menu.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', false);
}

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