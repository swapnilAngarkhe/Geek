document.addEventListener('DOMContentLoaded', () => {
    console.log('Geek Network — JS initialized');

    // ============ LOCOMOTIVE SCROLL ============
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
        const scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            lerp: 0.06,
            smartphone: { smooth: false },
            tablet: { smooth: true, breakpoint: 768 }
        });

        // Expose globally so modals can stop/start
        window.locomotiveScroll = scroll;

        console.log('Locomotive Scroll initialized');

        // ============ MODAL ↔ LOCOMOTIVE BRIDGE ============
        // Move all modals outside the scroll container to <body>
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            document.body.appendChild(modal);
        });

        // Update scroll on dynamic content changes
        setTimeout(() => scroll.update(), 500);

    } else {
        console.warn('No [data-scroll-container] found');
    }

    // ============ TEXTAREA AUTO-RESIZE ============
    const textareas = document.querySelectorAll('textarea.input-dark');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});

// ============ GLOBAL MODAL FUNCTIONS ============
// (available before DOMContentLoaded since they're called by onclick)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Ensure it's in body (might already be from init)
        if (modal.parentNode !== document.body) {
            document.body.appendChild(modal);
        }
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        if (window.locomotiveScroll) window.locomotiveScroll.stop();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        if (window.locomotiveScroll) window.locomotiveScroll.start();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            if (window.locomotiveScroll) window.locomotiveScroll.start();
        }
    }
});
