class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            'default': {
                name: 'Default',
                path: 'styles/themes/default.css'
            },
            'dark': {
                name: 'Dark',
                path: 'styles/themes/dark.css'
            }
        };
        
        this.initThemeLink();
        
        // event listeners when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
    }
    
    initThemeLink() {
        // remove any existing theme stylesheet
        const existingThemeLink = document.getElementById('theme-stylesheet');
        if (existingThemeLink) {
            existingThemeLink.remove();
        }
    
        this.themeLink = document.createElement('link');
        this.themeLink.rel = 'stylesheet';
        this.themeLink.id = 'theme-stylesheet';
        
        document.head.appendChild(this.themeLink);

        this.loadSavedTheme();
    }
    
    setupEventListeners() {
        const themeSelector = document.getElementById('theme-selector');
        themeSelector.value = this.currentTheme;
        
        themeSelector.addEventListener('change', (e) => {
            this.switchTheme(e.target.value);
        });
    }
    
    switchTheme(themeName) {
        if (this.themeLink.parentNode) {
            this.themeLink.remove();
        }
        
        // add timestamp to prevent caching
        const timestamp = new Date().getTime();
        this.themeLink.href = `${this.themes[themeName].path}?t=${timestamp}`;
        document.head.appendChild(this.themeLink);
        
        this.currentTheme = themeName;
        
        document.body.className = '';
        document.body.classList.add(`theme-${themeName}`);
        
        localStorage.setItem('polytrakt-theme', themeName);
        
        // update dropdown value
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.value = themeName;
        }
        
        // dispatch theme change event
        document.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: themeName }
        }));
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('polytrakt-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.switchTheme(savedTheme);
        } else {
            this.switchTheme('default');
        }
    }
}

const themeManager = new ThemeManager();

window.themeManager = themeManager;
