class KeyboardHelper {
    constructor() {
        this.keyboardElement = null;
        this.visible = false;
        this.init();
    }

    init() {
        this.keyboardElement = document.createElement('div');
        this.keyboardElement.className = 'keyboard-helper';

        // Define keyboard layout with computer key -> note mapping
        const keyboardLayout = [
            {
                row: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D']
            },
        ];

        // Create HTML content
        let content = `
            <h4>Keyboard Note Map</h4>
        `;

        // Create rows of keys
        keyboardLayout.forEach(rowData => {
            content += '<div class="keyboard-row">';

            for (let i = 0; i < rowData.row.length; i++) {
                content += `
                    <div class="key" data-key="${rowData.row[i]}">
                        <span class="note-name">${rowData.notes[i]}</span>
                        <span class="keyboard-key">${rowData.row[i]}</span>
                    </div>
                `;
            }

            content += '</div>';
        });

        content += `
            <div class="help-text">
                Select an instrument then use your keyboard to play notes.<br>
                Adjust octaves using the <strong>Z</strong> and <strong>X</strong> keys.<br>
            </div>
        `;

        this.keyboardElement.innerHTML = content;

        // Append to body
        document.body.appendChild(this.keyboardElement);
    }

    show() {
        if (!this.visible) {
            this.keyboardElement.classList.add('visible');
            this.visible = true;
        }
    }

    hide() {
        if (this.visible) {
            this.keyboardElement.classList.remove('visible');
            this.visible = false;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const keyboardHelper = new KeyboardHelper();
    window.keyboardHelper = keyboardHelper;
});