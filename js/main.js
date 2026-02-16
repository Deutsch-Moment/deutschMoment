const body = document.body;
let isDark = body.classList.contains('dark-mode');

document.querySelector('#dark-mode').addEventListener('click', function() {
    if(isDark) {
        body.classList.replace('dark-mode', 'light-mode');
        isDark = false;
        this.innerText = '🌙';
    }
    else {
        body.classList.replace('light-mode', 'dark-mode');
        isDark = true;
        this.innerText = '☀️';
    }
})

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