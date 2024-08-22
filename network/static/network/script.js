document.addEventListener('DOMContentLoaded', () => {
    console.log('connected to JS');
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        lerp: 0.06
    });
    console.log("locomotive connected");
    // Re-initialize Bootstrap's modal when shown
    document.body.addEventListener('show.bs.modal', function (event) {
        if (event.target.classList.contains('modal')) {
            scroll.stop();
        }
    });
    // Re-initialize Bootstrap's modal when hidden
    document.body.addEventListener('hide.bs.modal', function (event) {
        if (event.target.classList.contains('modal')) {
            scroll.start();
        }
    });
    // Re-append modals to the body element
    var modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        document.body.appendChild(modal);
    });
    // Like button js below.
    const heartIcons = document.querySelectorAll('.like-button .heart-icon');
    heartIcons.forEach(heartIcon => {
        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('liked');
        });
    });
});
