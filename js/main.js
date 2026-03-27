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


const idSearchBtn = document.getElementById('id-search-btn');
const clearSearchBtn = document.getElementById('reset-btn');
const userIdInput = document.getElementById('id-input');
const certificatePanel = document.getElementById('certificate-panel');
const errorMessage = document.getElementById('error-message');

const studentName = document.getElementById('student-name');
const studentLevel = document.getElementById('student-level');
const studentGrade = document.getElementById('student-grade');
const completionDate = document.getElementById('completion-date');
const issueDate = document.getElementById('issue-date');
const certificateId = document.getElementById('certificate-id');
const verifiedDate = document.getElementById('verified-date');

const certificates = {
    'DM-B1-2026-HR0016' : {
        id: "DM-B1-2026-HR0016",
        studentName: "Husna Rahmani",
        level: "B1",
        grade: "320/400",
        completionDate: "March 15, 2026",
        issueDate: "March 20, 2026",
        verifiedDate: "3/20/2026",
        isValid: true
    },
    'DM-B1-2026-SE0007' : {
        id: 'DM-B1-2026-SE0007',
        studentName: 'Sahil Emran',
        level: 'B1',
        grade: '320/400',
        completionDate: 'January 13, 2026',
        issueDate: 'January 18, 2026',
        verifiedDate: '1/18/2026',
        isValid: true
    },
    'DM-A1-2025-SN0001' : {
        id: 'DM-A1-2025-SN0001',
        studentName: 'Sara Naziri',
        level: 'A1',
        grade: '70/100',
        completionDate: 'July 10, 2025',
        issueDate: 'July 15, 2025',
        verifiedDate: '7/15/2025',
        isValid: true
    }
}

clearSearchBtn.addEventListener('click', clearSearch);
idSearchBtn.addEventListener('click', searchId);
userIdInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        searchId();
    }
})

function searchId() {
    const trimmedId = userIdInput.value.trim();

    if(!trimmedId) return;

    if(certificates[trimmedId]) {
        showVerifiedCertificate(trimmedId);
    } else {
        showErrorMessage();
    }
}

function showErrorMessage() {
    errorMessage.style.display = 'block';
}

function clearSearch() {
    userIdInput.value = "";
    certificatePanel.style.display = 'none';
    errorMessage.style.display = 'none';
    
    studentName.textContent = '';
    studentLevel.textContent = '';
    studentGrade.textContent = '';
    completionDate.textContent = '';
    issueDate.textContent = '';
    certificateId.textContent = '';
    verifiedDate.textContent = '';
}

function showVerifiedCertificate(trimmedId) {
    errorMessage.style.display = 'none';

    studentName.textContent = certificates[trimmedId].studentName;
    studentLevel.textContent = certificates[trimmedId].level;
    studentGrade.textContent = certificates[trimmedId].grade;
    completionDate.textContent = certificates[trimmedId].completionDate;
    issueDate.textContent = certificates[trimmedId].issueDate;
    certificateId.textContent = certificates[trimmedId].id;
    verifiedDate.textContent = certificates[trimmedId].verifiedDate;

    certificatePanel.style.display = 'block';
}

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

// logo
document.getElementById('logo').addEventListener('click', (e) => {
    e.preventDefault();
    setActivePage('#home');
})

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