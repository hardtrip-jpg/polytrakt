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
            },
            'aqua': {
                name: 'Aqua',
                path: 'styles/themes/macos.css'
            }
        };
        
        this.themeLinks = {};
        
        this.initThemeSystem();
        
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
    }
    
    initThemeSystem() {
        Object.keys(this.themes).forEach(themeName => {
            const linkEl = document.createElement('link');
            linkEl.rel = 'stylesheet';
            linkEl.id = `theme-${themeName}-stylesheet`;
            linkEl.href = this.themes[themeName].path;
            linkEl.disabled = true;
            document.head.appendChild(linkEl);
            this.themeLinks[themeName] = linkEl;
        });

        this.loadSavedTheme();
    }
    
    setupEventListeners() {
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.value = this.currentTheme;
            
            themeSelector.addEventListener('change', (e) => {
                this.switchTheme(e.target.value);
            });
        }
    }
    
    switchTheme(themeName) {        
        // disable all themes first
        Object.keys(this.themeLinks).forEach(name => {
            this.themeLinks[name].disabled = true;
        });
        
        // enable only the selected theme
        this.themeLinks[themeName].disabled = false;
        
        // add timestamp to force reload (prevent caching issues)
        const timestamp = new Date().getTime();
        this.themeLinks[themeName].href = `${this.themes[themeName].path}?t=${timestamp}`;
        
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
