class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.terminalBody = document.querySelector('.terminal-body');
        this.animationsEnabled = true;
        this.animationInProgress = false;
    }

    scrollToBottom() {
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }

    getRandomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async addLine(text, className = '', delay = 10) {
        return new Promise(resolve => {
            if (!this.animationsEnabled) {
                const line = document.createElement('div');
                line.className = className;
                line.textContent = text;
                this.terminal.appendChild(line);
                this.scrollToBottom();
                resolve();
                return;
            }
            
            const line = document.createElement('div');
            line.className = className;
            
            if (className.includes('typing')) {
                line.textContent = text;
                this.terminal.appendChild(line);
                this.scrollToBottom();
                setTimeout(resolve, 300);
            } else {
                this.terminal.appendChild(line);
                line.textContent = text;
                this.scrollToBottom();
                setTimeout(resolve, delay);
            }
        });
    }

    async addCommand(command, delay = 80) {
        return new Promise(resolve => {
            if (!this.animationsEnabled) {
                const line = document.createElement('div');
                line.innerHTML = `<span class="prompt">C:\\Users\\Anonymous></span> <span class="command">${command}</span>`;
                this.terminal.appendChild(line);
                this.scrollToBottom();
                resolve();
                return;
            }
            
            const line = document.createElement('div');
            line.innerHTML = '<span class="prompt">C:\\Users\\Anonymous></span> <span class="command"></span><span class="cursor"></span>';
            this.terminal.appendChild(line);
            
            const commandSpan = line.querySelector('.command');
            const cursor = line.querySelector('.cursor');
            
            let i = 0;
            const typeNextChar = () => {
                if (i < command.length) {
                    commandSpan.textContent += command[i];
                    i++;
                    this.scrollToBottom();
                    
                    const nextDelay = this.getRandomDelay(30, 150);
                    setTimeout(typeNextChar, nextDelay);
                } else {
                    cursor.remove();
                    setTimeout(resolve, 300);
                }
            };
            
            setTimeout(typeNextChar, delay);
        });
    }

    async addSpinner(text, duration = 1500) {
        return new Promise(resolve => {
            if (!this.animationsEnabled) {
                resolve();
                return;
            }
            
            const line = document.createElement('div');
            line.className = 'output';
            line.innerHTML = `${text} <span class="spinner">|</span>`;
            this.terminal.appendChild(line);
            this.scrollToBottom();
            
            const spinner = line.querySelector('.spinner');
            let frames = ['|', '/', '-', '\\'];
            let i = 0;
            
            const spinnerInterval = setInterval(() => {
                spinner.textContent = frames[i % frames.length];
                i++;
                this.scrollToBottom();
            }, 250);
            
            setTimeout(() => {
                clearInterval(spinnerInterval);
                line.removeChild(spinner);
                line.textContent = `${text} [Завершено]`;
                this.scrollToBottom();
                setTimeout(resolve, 300);
            }, duration);
        });
    }

    addPrompt() {
        const prompt = document.createElement('div');
        prompt.innerHTML = '<span class="prompt">C:\\Users\\Anonymous></span> <span class="cursor"></span>';
        this.terminal.appendChild(prompt);
        this.scrollToBottom();
    }

    disableAnimations() {
        this.animationsEnabled = false;
    }

    enableAnimations() {
        this.animationsEnabled = true;
    }

    setAnimationInProgress(status) {
        this.animationInProgress = status;
    }

    clear() {
        this.terminal.innerHTML = '<div class="output">Microsoft Windows [Version 10.0.19045.3693]<br>(c) Корпорация Майкрософт (Microsoft Corporation). Все права защищены.</div>';
    }
}

export default Terminal; 