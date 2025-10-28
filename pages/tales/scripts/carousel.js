document.addEventListener('DOMContentLoaded', function () {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.from(track.querySelectorAll('.slide'));
    var prev = carousel.querySelector('.carousel-btn.prev');
    var next = carousel.querySelector('.carousel-btn.next');
    var index = 0;

    function update() {
        var slide = slides[index];
        var left = slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2;
        track.scrollTo({ left: left, behavior: 'smooth' });
    }

    prev && prev.addEventListener('click', function () {
        index = Math.max(0, index - 1); update();
    });
    next && next.addEventListener('click', function () {
        index = Math.min(slides.length - 1, index + 1); update();
    });

    // keyboard support
    carousel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prev && prev.click();
        if (e.key === 'ArrowRight') next && next.click();
    });

    // expose update on resize
    window.addEventListener('resize', function () { setTimeout(update, 120); });
    // init
    update();
});
