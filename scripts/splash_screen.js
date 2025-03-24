document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');

    // fade out after 2 seconds
    setTimeout(function() {
        splashScreen.classList.add('fade-out');
        
        // remove after animation completes
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});
