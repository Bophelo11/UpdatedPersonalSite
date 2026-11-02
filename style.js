document.addEventListener('DOMContentLoaded', () => {
    console.log("Mama Haba script loaded.");

    // =========================================
    // SLIDESHOW FUNCTIONALITY
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        function showSlide(index) {
            // Handle index wraps
            if (index >= slides.length) currentIndex = 0;
            else if (index < 0) currentIndex = slides.length - 1;
            else currentIndex = index;

            // Toggle active classes
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        // Event listeners for control buttons
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                showSlide(targetIndex);
                resetTimer();
            });
        });

        // Auto slide interval (every 3 seconds)
        function startTimer() {
            slideInterval = setInterval(nextSlide, 3000);
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        startTimer();
    }

    // =========================================
    // CONTACT FORM VALIDATION FUNCTIONALITY
    // =========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const messageError = document.getElementById('messageError');
            const successMessage = document.getElementById('successMessage');

            nameError.textContent = '';
            emailError.textContent = '';
            phoneError.textContent = '';
            messageError.textContent = '';
            if (successMessage) successMessage.style.display = 'none';

            if (name.value.trim() === '') {
                nameError.textContent = 'Please enter your full name.';
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                emailError.textContent = 'Please enter your email address.';
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (phone.value.trim() !== '' && phone.value.trim().length < 10) {
                phoneError.textContent = 'Please enter a valid phone number (at least 10 digits).';
                isValid = false;
            }

            if (message.value.trim() === '') {
                messageError.textContent = 'Please type a message before submitting.';
                isValid = false;
            }

            if (isValid && successMessage) {
                successMessage.textContent = 'Thank you! Your message has been sent to Mama Haba.';
                successMessage.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
});