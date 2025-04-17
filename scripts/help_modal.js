document.addEventListener('DOMContentLoaded', function() {
    const helpBtn = document.getElementById('help-button');
    const modal = document.getElementById('help-modal');
    const closeBtn = document.getElementById('close-help-modal');
    const tabs = document.querySelectorAll('.help-tab');
    const sections = document.querySelectorAll('.help-content');

    if (helpBtn && modal && closeBtn && tabs.length > 0 && sections.length > 0) {
        helpBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            // Default to overview
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[0].classList.add('active');
            sections.forEach(sec => sec.style.display = 'none');
            const overviewSection = document.getElementById('help-section-overview');
            if (overviewSection) {
                overviewSection.style.display = '';
            }
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                sections.forEach(sec => sec.style.display = 'none');
                const targetSection = document.getElementById('help-section-' + this.dataset.section);
                if (targetSection) {
                    targetSection.style.display = '';
                }
            });
        });
    }
});
