(function () {
    'use strict';

    // Shows the language of each code block in its top-right corner. The label
    // lives on a wrapper so it stays put when the code scrolls horizontally.
    function labelCodeBlocks() {
        document.querySelectorAll('.prose pre').forEach(pre => {
            if (pre.parentElement.classList.contains('code-block')) return;

            const code = pre.querySelector('code');
            const lang = code ? (code.dataset.lang || '') : '';
            if (!lang) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'code-block';

            const label = document.createElement('span');
            label.className = 'code-lang';
            label.setAttribute('aria-hidden', 'true');
            label.textContent = lang;

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.append(pre, label);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', labelCodeBlocks);
    } else {
        labelCodeBlocks();
    }
})();
