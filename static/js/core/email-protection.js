window.addEventListener('load', function() {
    async function solveProofOfWork(base64Email, targetPrefix = 'a') {
        const encoder = new TextEncoder();
        let attempts = 0;
        
        while (true) {
            const nonce = Math.random().toString(36).substring(2, 15);
            const input = nonce + base64Email;
            
            const data = encoder.encode(input);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = new Uint8Array(hashBuffer);
            const hashHex = Array.from(hashArray)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            
            attempts++;
            
            if (hashHex.startsWith(targetPrefix)) {
                return atob(base64Email);
            }
            
            if (attempts > 10000) {
                return atob(base64Email);
            }
        }
    }

    const emailElements = document.querySelectorAll('.email-protected');
    
    emailElements.forEach(async function(element) {
        const base64Email = element.getAttribute('data-email');
        
        if (base64Email) {
            try {
                const email = await solveProofOfWork(base64Email, 'aaa');
                
                if (element.tagName.toLowerCase() === 'a') {
                    element.href = 'mailto:' + email;
                    // Only set text when the anchor has no child elements (icon-only links keep their SVG)
                    if (element.children.length === 0) {
                        element.textContent = email;
                    }
                } else {
                    element.innerHTML = email;
                }
            } catch (error) {
                console.error('Email protection failed:', error);
                try {
                    const email = atob(base64Email);
                    if (element.tagName.toLowerCase() === 'a') {
                        element.href = 'mailto:' + email;
                        if (element.children.length === 0) {
                            element.textContent = email;
                        }
                    } else {
                        element.innerHTML = email;
                    }
                } catch (fallbackError) {
                    console.error('Fallback decode failed:', fallbackError);
                }
            }
        }
    });
});
