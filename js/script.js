// Small interactivity: mobile nav toggle and footer year
document.addEventListener('DOMContentLoaded', function () {
    // Load shared header include if placeholder exists
    (function loadHeaderInclude() {
        var placeholder = document.getElementById('site-header-include');
        if (!placeholder) return;

        // determine depth (number of path segments) so we can prefix relative links correctly
        var segs = window.location.pathname.split('/').filter(Boolean);
        // depth = segments count - 1 (file in same folder counts as depth 0)
        var depth = Math.max(0, segs.length - 1);
        var basePrefix = depth ? '../'.repeat(depth) : './';

        var includePath = basePrefix + 'includes/header.html';

        // If we prefetched header HTML into sessionStorage earlier, use it immediately
        var cached = null;
        try { cached = sessionStorage.getItem('site_header_html'); } catch (e) { cached = null; }

        var fetchPromise;
        if (cached) {
            fetchPromise = Promise.resolve(cached);
        } else {
            fetchPromise = fetch(includePath).then(function (r) {
                if (!r.ok) throw new Error('not found');
                return r.text();
            }).catch(function () {
                // fallback attempts: try a few parent-relative locations
                var attempts = ['includes/header.html', '../includes/header.html', '../../includes/header.html'];
                return attempts.reduce(function (p, path) {
                    return p.catch(function () { return fetch(path).then(function (r) { if (!r.ok) throw new Error('not found'); return r.text(); }); });
                }, Promise.reject());
            }).then(function (text) {
                try { sessionStorage.setItem('site_header_html', text); } catch (e) { }
                return text;
            });
        }

        fetchPromise.then(function (html) {
            // parse and adjust local href/src paths so links work from pages at different depths
            var tmp = document.createElement('div');
            tmp.innerHTML = html;

            var elems = tmp.querySelectorAll('a[href], img[src], link[href]');
            elems.forEach(function (el) {
                var attr = el.hasAttribute('href') ? 'href' : (el.hasAttribute('src') ? 'src' : null);
                if (!attr) return;
                var val = el.getAttribute(attr);
                if (!val) return;
                // ignore absolute URLs, anchors, mailto
                if (/^(https?:|mailto:|#|\/)/i.test(val)) return;
                // prefix with basePrefix
                el.setAttribute(attr, basePrefix + val);
            });

            // insert into placeholder
            placeholder.innerHTML = tmp.innerHTML;

            // re-wire mobile nav toggle behavior for the newly-inserted header
            var newToggle = document.getElementById('nav-toggle');
            var newNav = document.getElementById('site-nav');
            if (newToggle && newNav) {
                newToggle.addEventListener('click', function () {
                    var expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', String(!expanded));
                    newNav.classList.toggle('open');
                });
            }
        }).catch(function (err) {
            console.error('Header include failed to load:', err);
            try {
                // show a lightweight in-page hint so users opening the file directly understand why
                placeholder.innerHTML = '<div style="padding:12px;border:1px solid rgba(91,104,112,0.2);background:#fff;color:var(--text);font-size:14px;">Header failed to load (fetch). If you opened this file via <code>file://</code>, start a local HTTP server and reload. See <a href="/README.md">README</a>.</div>';
            } catch (e) {
                // ignore if placeholder not available
            }
        });
    })();

    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
        });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
