document.addEventListener('DOMContentLoaded', function() {
    const emailElements = document.querySelectorAll('.email-protected');
    
    emailElements.forEach(function(element) {
        const user = element.getAttribute('data-user');
        const domain = element.getAttribute('data-domain');
        
        if (user && domain) {
            const email = user + '@' + domain;

            if (element.tagName.toLowerCase() === 'a') {
                element.href = 'mailto:' + email;
            } else {
                element.innerHTML = email;
            }
        }
    });
});
