document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.series-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetId = btn.getAttribute('data-target');
            var el = document.getElementById(targetId);
            if (!el) return;
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            if (expanded) {
                el.hidden = true;
                btn.textContent = '▸';
            } else {
                el.hidden = false;
                btn.textContent = '▾';
                // focus first available book when opening
                var avail = el.querySelector('.book.available');
                if (avail) avail.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
