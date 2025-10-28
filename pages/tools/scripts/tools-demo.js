// Simple client-side manuscript formatter demo
document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('formatBtn');
    var dl = document.getElementById('downloadBtn');
    var raw = document.getElementById('raw');
    var result = document.getElementById('result');

    function formatText(input) {
        // Normalize line endings
        var text = input.replace(/\r\n?/g, '\n').trim();
        // Collapse multiple blank lines into a single blank line
        text = text.replace(/\n{3,}/g, '\n\n');
        // Ensure single newlines inside paragraphs become spaces (common in pasted text)
        // Convert double-newline into paragraph breaks
        var paras = text.split(/\n\n+/).map(p => p.replace(/\n+/g, ' '));
        return paras.join('\n\n');
    }

    if (btn) {
        btn.addEventListener('click', function () {
            var out = formatText(raw.value || '');
            result.textContent = out;
        });
    }

    if (dl) {
        dl.addEventListener('click', function () {
            var content = result.textContent || raw.value || '';
            var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'manuscript.txt';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        });
    }
});
