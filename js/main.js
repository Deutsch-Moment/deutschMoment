const body = document.body;

document.querySelector('#dark-mode').addEventListener('click', function() {
    body.classList.toggle('light');
});

// Menu Toggler 
const navMenu = document.querySelector('.nav .list--vertical');

document.getElementById('navMenuToggler').addEventListener('click', function() {
    navMenu.classList.toggle('collapsible--active');
})

// Nav bar link
const navLinks = document.querySelectorAll('.nav li');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedItem = e.target.closest('li');
        if(clickedItem) {
            navMenu.querySelector('.link-active')?.classList.remove('link-active');
            clickedItem.classList.add('link-active');
        }
    })
});

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if(e.target.classList.contains('card-cta')) {
            const currentDetails = card.querySelector('.card__details');
            const btn = e.target;
            const isCurrentlyOpen = currentDetails.classList.contains('card__details--active');

            cards.forEach(otherCard => {
                const otherDetails = otherCard.querySelector('.card__details');
                const otherBtn = otherCard.querySelector('.card-cta');
                if(otherDetails !== currentDetails) {
                    otherDetails.classList.remove('card__details--active');
                    otherBtn.textContent = 'View Details';
                    otherBtn.style.backgroundColor = 'var(--accent)';
                    otherBtn.style.color = '#fff';
                    otherCard.style.gridRow = 'auto';
                    otherCard.style.gridColumn = 'auto';
                }
            })

            if(isCurrentlyOpen) {
                currentDetails.classList.remove('card__details--active');
                btn.textContent = 'View Details';
                btn.style.backgroundColor = 'var(--accent)';
                btn.style.color = '#fff';
                card.style.gridRow = 'auto';
                card.style.gridColumn = 'auto';
            }
            else {
                currentDetails.classList.add('card__details--active');
                btn.textContent = 'Hide Details';
                btn.style.backgroundColor = 'var(--accent-secondary)';
                btn.style.color = 'var(--bg)';
                card.style.gridRow = 'span 10';
                card.style.gridColumn = 'span 1';
            }
        }
    });
});