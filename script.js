document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Animation ---
    const typingText = document.querySelector('.typing');
    const roles = [
        "Computer Engineering Student",
        "Embedded Systems Enthusiast",
        "Web Developer",
        "Problem Solver"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // --- Sticky Navbar & Active Links ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active Link on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Scroll to Top Button Visibility
        const scrollTopBtn = document.getElementById('scroll-top');
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }

        // Skill Bar Animation
        const skillsSection = document.getElementById('skills');
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos) {
            const progresses = document.querySelectorAll('.progress');
            progresses.forEach(progress => {
                progress.style.width = progress.getAttribute('data-width');
            });
        }

        // Reveal Sections on Scroll
        const reveals = document.querySelectorAll('.section, .about-content, .skill-card, .project-card');
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < screenPos) {
                reveal.classList.add('active');
            }
        });
    });

    // Add reveal class to elements
    document.querySelectorAll('.section, .about-content, .skill-card, .project-card').forEach(el => {
        el.classList.add('reveal');
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Scroll to Top ---
    document.getElementById('scroll-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Contact Form Validation & Submission ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showStatus('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showStatus('Sending message...', 'info');
        
        setTimeout(() => {
            showStatus('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.style.color = type === 'error' ? '#ff4d4d' : (type === 'success' ? '#00ff88' : '#00d2ff');
    }

    // --- Project Modal (Bonus) ---
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Add click event to project cards (excluding links)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-links')) return;
            
            const title = card.querySelector('h3').textContent;
            const img = card.querySelector('img').src;
            const desc = card.querySelector('p').textContent;
            const tech = card.querySelector('.tech-stack').innerHTML;

            modalBody.innerHTML = `
                <img src="${img}" alt="${title}" style="width:100%; border-radius:10px; margin-bottom:20px;">
                <h2 style="color:var(--primary-color); margin-bottom:15px;">${title}</h2>
                <p style="margin-bottom:20px;">${desc}</p>
                <div class="tech-stack">${tech}</div>
                <div class="project-links" style="margin-top:30px;">
                    <a href="#" class="btn primary-btn">View Source Code</a>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
