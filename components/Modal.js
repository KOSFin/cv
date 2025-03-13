class Modal {
    constructor() {
        this.modal = document.getElementById('exitModal');
        this.closeButton = document.getElementById('closeButton');
        this.cancelExit = document.getElementById('cancelExit');
        this.skipAnimations = document.getElementById('skipAnimations');
        this.restartAnimation = document.getElementById('restartAnimation');
        this.closeTerminal = document.getElementById('closeTerminal');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeButton.addEventListener('click', () => {
            this.show();
        });

        this.cancelExit.addEventListener('click', () => {
            this.hide();
        });

        this.skipAnimations.addEventListener('click', () => {
            this.hide();
            this.onSkipAnimations();
        });

        this.restartAnimation.addEventListener('click', () => {
            this.hide();
            this.onRestartAnimation();
        });

        this.closeTerminal.addEventListener('click', () => {
            this.hide();
            this.onCloseTerminal();
        });
    }

    show() {
        this.modal.classList.add('active');
    }

    hide() {
        this.modal.classList.remove('active');
    }

    onSkipAnimations() {
        // Будет переопределено в основном коде
    }

    onRestartAnimation() {
        // Будет переопределено в основном коде
    }

    onCloseTerminal() {
        // Будет переопределено в основном коде
    }
}

export default Modal; 