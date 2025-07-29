 // Fetch and insert header
fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Fetch and insert footer
fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;

        // Set current year AFTER footer is inserted
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    });
    
//-- Mathjax Configuration ---
MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
                packages: ['base', 'ams']
            },
            options: {
                ignoreHtmlClass: 'tex2jax_ignore',
                processHtmlClass: 'tex2jax_process'
            },
            loader: {
                load: ['[tex]/ams']
            }
        };

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mainContent = document.getElementById('main-content'); // To manage aria-hidden

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('mobile-menu-hidden');
        mobileMenu.classList.toggle('mobile-menu-visible');

        if (mainContent) {
            mainContent.setAttribute('aria-hidden', String(!isExpanded));
        }
    });
}

// --- Desktop Navigation Dropdowns (Hover controlled by CSS) ---
// JS is now primarily for accessibility (focus and escape key)
const desktopDropdowns = document.querySelectorAll('#desktop-nav .dropdown');

desktopDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a[role="button"]');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    if (link && dropdownMenu) {
        // Accessibility: Close dropdown with Escape key
        dropdown.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                // Use CSS to hide the menu
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(var(--spacing-2))';
                dropdownMenu.style.pointerEvents = 'none';

                link.setAttribute('aria-expanded', 'false');
                link.focus(); // Return focus to the dropdown toggle link
            }
        });

        // Accessibility: Handle focus leaving the dropdown area
        dropdown.addEventListener('focusout', (event) => {
            // Check if the focus is moving to an element outside the dropdown li
            if (!dropdown.contains(event.relatedTarget)) {
                    // Use CSS to hide the menu
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(var(--spacing-2))';
                dropdownMenu.style.pointerEvents = 'none';
                link.setAttribute('aria-expanded', 'false');
            }
        });

            // Accessibility: Handle focus entering the dropdown menu
            dropdownMenu.addEventListener('focusin', () => {
            // Ensure the link's aria-expanded is true when focus is inside the menu
            const parentDropdown = dropdownMenu.closest('.dropdown');
            if (parentDropdown) {
                    const link = parentDropdown.querySelector('a[role="button"]');
                    if (link) {
                        link.setAttribute('aria-expanded', 'true');
                    }
            }
            });
    }
});


// --- Mobile Navigation Dropdowns (Click toggle) ---
const mobileDropdownToggles = document.querySelectorAll('.mobile-nav .mobile-dropdown > a');

mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
        event.preventDefault();
        const currentDropdownLI = this.parentElement;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close other open mobile dropdowns
        document.querySelectorAll('.mobile-nav .mobile-dropdown.open').forEach(openDropdownLI => {
            if (openDropdownLI !== currentDropdownLI) {
                openDropdownLI.classList.remove('open');
                const link = openDropdownLI.querySelector('a');
                if (link) link.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle the current dropdown
        currentDropdownLI.classList.toggle('open', !isExpanded);
        this.setAttribute('aria-expanded', String(!isExpanded));
    });
});


// --- Click outside mobile menu to close ---
document.addEventListener('click', function(event) {
    if (mobileMenu && mobileMenu.classList.contains('mobile-menu-visible') &&
        !mobileMenu.contains(event.target) && mobileMenuButton && !mobileMenuButton.contains(event.target)) {
        mobileMenuButton.click(); // Simulate click on button to toggle menu
    }
});


// --- Collapsible Description Toggle (Hover) ---
// Select all content-card and event-card elements
document.querySelectorAll('.content-card, .event-card').forEach(card => {
    const extraDescription = card.querySelector('.collapsible-extra');

    if (extraDescription) {
        // Show extra description on mouseover
        card.addEventListener('mouseover', () => {
            extraDescription.classList.remove('hidden');
        });

        // Hide extra description on mouseout
        card.addEventListener('mouseout', (event) => {
                // Check if the mouse is moving to an element outside the card itself
                if (!card.contains(event.relatedTarget)) {
                extraDescription.classList.add('hidden');
                }
        });

        // Handle focus for accessibility (optional, but good practice)
            card.addEventListener('focusin', () => {
                extraDescription.classList.remove('hidden');
            });

            card.addEventListener('focusout', (event) => {
                // Check if focus is moving outside the card
                if (!card.contains(event.relatedTarget)) {
                    extraDescription.classList.add('hidden');
                }
            });
    }
});

// --- MSc Slideshow Script ---
let slideIndex = 0;
const slides = document.querySelectorAll('.msc-slide');
const slideshowInterval = 7000; // 7 seconds

function showSlides() {
    if (slides.length === 0) return; // Exit if no slides found

    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Increment slide index, reset if needed
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // Show the current slide
    slides[slideIndex - 1].classList.add('active');

    // Call showSlides again after the defined interval
    setTimeout(showSlides, slideshowInterval);
}

// Start the slideshow
// Use DOMContentLoaded to ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
        if (slides.length > 0) {
            slides[0].classList.add('active'); // Show the first slide initially
            slideIndex = 0; // Initialize index
            setTimeout(showSlides, slideshowInterval); // Start the loop
        }
});

// --- Removed Client-Side Search Script ---
// The search script has been removed as requested.
