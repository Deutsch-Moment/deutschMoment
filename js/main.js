/*
  main.js
  Project: Deutsch_Moment
  Author: Milad Sarabi
  Purpose: Handles theme toggle, navigation routing, CTA behavior, and
           course card detail expand/collapse. Cleaned and reorganized
           for publishing on GitHub. License: MIT.
*/

"use strict";

const body = document.body;
const navMenu = document.querySelector('.nav .list--vertical');
const navMenuToggler = document.getElementById('navMenuToggler');
const navLinks = document.querySelectorAll('.nav li');
const ctaBtns = document.querySelectorAll('.buttons-container a');
const cards = document.querySelectorAll('.card');

function setActivePage(targetId) {
    const pages = document.getElementsByClassName('page');
    for (const page of pages) page.style.display = 'none';

    const activePage = document.querySelector(targetId);
    if (activePage) activePage.style.display = 'block';

    navLinks.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === targetId) link.classList.add('link-active');
        else link.classList.remove('link-active');
    });
}

document.querySelector('#dark-mode').addEventListener('click', function () {
    body.classList.toggle('light');
});

navMenuToggler.addEventListener('click', function () {
    navMenu.classList.toggle('collapsible--active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const clickedItem = e.target.closest('li');
        const pageId = clickedItem?.firstElementChild?.getAttribute('href');
        if (clickedItem && pageId) {
            navMenu.classList.remove('collapsible--active');
            setActivePage(pageId);
        }
    });
});

ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const newPageId = btn.getAttribute('href');
        if (newPageId) setActivePage(newPageId);
    });
});

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('card-cta')) return;

        const currentDetails = card.querySelector('.card__details');
        const btn = e.target;
        const isCurrentlyOpen = currentDetails.classList.contains('card__details--active');

        cards.forEach(otherCard => {
            const otherDetails = otherCard.querySelector('.card__details');
            const otherBtn = otherCard.querySelector('.card-cta');
            if (otherDetails !== currentDetails) {
                otherDetails.classList.remove('card__details--active');
                otherBtn.textContent = 'View Details';
                otherBtn.style.backgroundColor = 'var(--accent)';
                otherBtn.style.color = '#fff';
                otherCard.style.gridRow = 'auto';
                otherCard.style.gridColumn = 'auto';
            }
        });

        if (isCurrentlyOpen) {
            currentDetails.classList.remove('card__details--active');
            btn.textContent = 'View Details';
            btn.style.backgroundColor = 'var(--accent)';
            btn.style.color = '#fff';
            card.style.gridRow = 'auto';
            card.style.gridColumn = 'auto';
        } else {
            currentDetails.classList.add('card__details--active');
            btn.textContent = 'Hide Details';
            btn.style.backgroundColor = 'var(--accent-secondary)';
            btn.style.color = 'var(--bg)';
            card.style.gridRow = 'span 10';
            card.style.gridColumn = 'span 1';
        }
    });
});