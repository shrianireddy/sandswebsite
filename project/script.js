// Carousel functionality with auto-slide
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let slideInterval; // Variable to store the interval ID
    const autoSlideDelay = 5000; // Time between slides in milliseconds (5 seconds)
    
    // Initialize the carousel
    function initCarousel() {
        // Set up initial slide positions
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });
        
        // Create dots for navigation
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide(); // Reset timer when manually changing slides
            });
            dotsContainer.appendChild(dot);
        });
        
        // Start auto-sliding
        startAutoSlide();
    }
    
    // Go to a specific slide
    function goToSlide(slideIndex) {
        // Update dots
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        // Move slides
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
        
        currentSlide = slideIndex;
    }
    
    // Next slide function
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        // Clear any existing interval
        clearInterval(slideInterval);
        // Set new interval
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Reset auto-slide timer (call this when manually changing slides)
    function resetAutoSlide() {
        startAutoSlide();
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide(); // Reset timer when manually changing slides
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide(); // Reset timer when manually changing slides
    });
    
    // Pause auto-slide when hovering over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume auto-slide when mouse leaves carousel
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Initialize carousel
    initCarousel();
});

// script.js - S&S Automation Form to Google Form Integration

document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        // Remove the PHP action and add event listener
        enquiryForm.removeAttribute('action');
        enquiryForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Form validation functions
    setupFormValidation();
});

function setupFormValidation() {
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(field);
        });
    });
    
    // Email specific validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            validateEmail(emailField);
        });
    }
    
    // Phone number validation
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            validatePhone(phoneField);
        });
    }
}

function validateField(field) {
    if (field.value.trim() === '') {
        field.classList.add('error');
        
        // Add error message if it doesn't exist
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('error-message');
            errorMsg.textContent = 'This field is required';
            field.insertAdjacentElement('afterend', errorMsg);
        }
        return false;
    } else {
        field.classList.remove('error');
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.nextElementSibling.remove();
        }
        return true;
    }
}

function validateEmail(field) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value)) {
        field.classList.add('error');
        
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('error-message');
            errorMsg.textContent = 'Please enter a valid email address';
            field.insertAdjacentElement('afterend', errorMsg);
        }
        return false;
    } else {
        field.classList.remove('error');
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.nextElementSibling.remove();
        }
        return true;
    }
}

function validatePhone(field) {
    // Basic phone validation - can be adjusted based on your requirements
    const phonePattern = /^[\d\+\-\(\)\s]{10,20}$/;
    if (!phonePattern.test(field.value)) {
        field.classList.add('error');
        
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.classList.add('error-message');
            errorMsg.textContent = 'Please enter a valid phone number';
            field.insertAdjacentElement('afterend', errorMsg);
        }
        return false;
    } else {
        field.classList.remove('error');
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.nextElementSibling.remove();
        }
        return true;
    }
}

function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    const emailField = document.getElementById('email');
    if (emailField && !validateEmail(emailField)) {
        isValid = false;
    }
    
    const phoneField = document.getElementById('phone');
    if (phoneField && !validatePhone(phoneField)) {
        isValid = false;
    }
    
    return isValid;
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Replace with your Google Form URL
    // This should be the form submission URL, which you can get from your Google Form
    const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfy20KpqJA_18MKWDw8BFIG7Pd999sGm_vQQhnsU647dRyLEQ/formResponse';
    
    // Map your form fields to Google Form field names
    // You'll need to inspect your Google Form to get the correct field names
    // They usually look like 'entry.123456789'
    const formData = new FormData();
    formData.append('entry.972888119', document.getElementById('fullName').value); // Replace XXXXXX1 with actual entry ID
    formData.append('entry.1706520724', document.getElementById('companyName').value); // Replace XXXXXX2 with actual entry ID
    formData.append('entry.1702461683', document.getElementById('email').value); // Replace XXXXXX3 with actual entry ID
    formData.append('entry.653672321', document.getElementById('phone').value); // Replace XXXXXX4 with actual entry ID
    formData.append('entry.774633051', document.getElementById('productCategory').value); // Replace XXXXXX5 with actual entry ID
    formData.append('entry.456686742', document.getElementById('productName').value); // Replace XXXXXX6 with actual entry ID
    formData.append('entry.616676591', document.getElementById('quantity').value); // Replace XXXXXX7 with actual entry ID
    formData.append('entry.1101204555', document.getElementById('message').value); // Replace XXXXXX8 with actual entry ID
    
    // Send the form data using fetch API
    submitFormData(formData, googleFormUrl);
}

function submitFormData(formData, url) {
    // Google Forms doesn't allow CORS, so we need to use a different approach
    // We'll create an invisible iframe to submit the form
    
    // Create a temporary form element
    const tempForm = document.createElement('form');
    tempForm.action = url;
    tempForm.method = 'POST';
    tempForm.target = 'hidden-iframe';
    tempForm.style.display = 'none';
    
    // Add form data as hidden fields
    for (const pair of formData.entries()) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = pair[0];
        hiddenField.value = pair[1];
        tempForm.appendChild(hiddenField);
    }
    
    // Create an invisible iframe
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden-iframe';
    iframe.style.display = 'none';
    
    // Add the iframe and form to the document
    document.body.appendChild(iframe);
    document.body.appendChild(tempForm);
    
    // Set up the success/error handling
    iframe.addEventListener('load', function() {
        showSuccessMessage();
        document.getElementById('enquiryForm').reset();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(iframe);
            document.body.removeChild(tempForm);
        }, 1000);
    });
    
    // Submit the form
    tempForm.submit();
}

function showSuccessMessage() {
    // Create a success message
    const formContainer = document.querySelector('.enquiry-form');
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Thank You!</h3>
        <p>Your enquiry has been submitted successfully. Our team will get back to you within 24 hours.</p>
    `;
    
    // Hide the form
    document.getElementById('enquiryForm').style.display = 'none';
    
    // Show the success message
    formContainer.appendChild(successMessage);
    
    // Add a button to make another enquiry
    const newEnquiryBtn = document.createElement('button');
    newEnquiryBtn.classList.add('btn');
    newEnquiryBtn.textContent = 'Make Another Enquiry';
    newEnquiryBtn.addEventListener('click', function() {
        document.getElementById('enquiryForm').style.display = 'block';
        successMessage.remove();
    });
    
    successMessage.appendChild(newEnquiryBtn);
    
    // Scroll to the success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
}