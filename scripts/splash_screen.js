document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    
    // timestamp SVG URLs to prevent caching
    const timestamp = new Date().getTime();
    const svgFrames = document.querySelectorAll('iframe[src*=".svg"]');
    
    svgFrames.forEach(frame => {
        const currentSrc = frame.getAttribute('src');
        // timestamp parameter to force reload
        frame.setAttribute('src', `${currentSrc}?t=${timestamp}`);
    });
    
    // fade out after 2 seconds
    setTimeout(function() {
        splashScreen.classList.add('fade-out');
        
        // remove after animation completes
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});
