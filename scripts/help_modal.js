document.addEventListener('DOMContentLoaded', () => {
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const closeHelpModal = document.getElementById('close-help-modal');
    const helpTabs = document.querySelectorAll('.help-tab');
    const helpSectionsContainer = document.querySelector('.help-sections');

    let helpContentLoaded = false;

    // load help content from JSON and create divs
    async function loadHelpContent() {
        if (helpContentLoaded) return;

        try {
            const response = await fetch('help_content.json');
            const helpData = await response.json();

            // create and append content divs
            for (const sectionKey in helpData) {
                const sectionData = helpData[sectionKey];
                const contentDiv = document.createElement('div');
                contentDiv.id = `help-section-${sectionKey}`;
                contentDiv.classList.add('help-content');
                contentDiv.style.display = 'none';
                contentDiv.innerHTML = `<h3>${sectionData.title}</h3>${sectionData.content}`;
                helpSectionsContainer.appendChild(contentDiv);
            }
            helpContentLoaded = true;
        } catch (error) {
            console.error("Could not load help content:", error);
        }
    }

    const openModal = async () => {
        await loadHelpContent();
        helpModal.style.display = 'block';

        if (helpTabs.length > 0) {
            activateTab(helpTabs[0]);
        }
    };

    const closeModal = () => {
        helpModal.style.display = 'none';
    };

    const activateTab = (tab) => {
        const section = tab.dataset.section;
        const helpContents = helpSectionsContainer.querySelectorAll('.help-content');

        helpTabs.forEach(t => t.classList.remove('active'));
        helpContents.forEach(c => c.style.display = 'none');

        tab.classList.add('active');
        const activeContent = document.getElementById(`help-section-${section}`);
        if (activeContent) {
            activeContent.style.display = 'block';
        }
    };

    helpButton.addEventListener('click', openModal);
    closeHelpModal.addEventListener('click', closeModal);

    // close modal if clicked outside the content area
    window.addEventListener('click', (event) => {
        if (event.target === helpModal) {
            closeModal();
        }
    });

    helpTabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab));
    });

});
