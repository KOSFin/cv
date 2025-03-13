import Terminal from '../components/Terminal.js';
import Modal from '../components/Modal.js';
import resumeData from '../components/resumeData.js';

class App {
    constructor() {
        this.terminal = new Terminal();
        this.modal = new Modal();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.terminal.animationInProgress) {
                this.terminal.disableAnimations();
            }
        });

        this.modal.onSkipAnimations = () => {
            if (this.terminal.animationInProgress) {
                this.terminal.disableAnimations();
                this.terminal.clear();
                this.showResumeImmediately();
            }
        };

        this.modal.onRestartAnimation = () => {
            this.terminal.clear();
            this.terminal.enableAnimations();
            this.runSequence();
        };

        this.modal.onCloseTerminal = () => {
            window.close();
            // Если window.close() не сработает из-за политик безопасности
            this.terminal.addLine('Невозможно закрыть окно из-за политик безопасности браузера.', 'output error');
            this.terminal.addPrompt();
        };
    }

    async showResumeImmediately() {
        await this.terminal.addLine('\n[ПРОГРАММА ДЕАНОНИМИЗАЦИИ v3.7.1]', 'output success');
        await this.terminal.addLine('\n========== РЕЗУЛЬТАТЫ ПОИСКА ==========', 'output highlight');
        
        await this.terminal.addLine(`\n[ИДЕНТИФИКАЦИЯ ОБЪЕКТА]`, 'output info');
        await this.terminal.addLine(`Имя: ${resumeData.name}`, 'output');
        await this.terminal.addLine(`Специализация: ${resumeData.title}`, 'output');
        await this.terminal.addLine(`Теги: ${resumeData.tags.join(' ')}`, 'output');
        
        await this.terminal.addLine('\n[КОНТАКТНЫЕ ДАННЫЕ]', 'output info');
        await this.terminal.addLine(`Email: ${resumeData.contacts.email}`, 'output');
        await this.terminal.addLine(`Телефон: ${resumeData.contacts.phone}`, 'output');
        await this.terminal.addLine(`Telegram: ${resumeData.contacts.telegram}`, 'output');
        await this.terminal.addLine(`GitHub: ${resumeData.contacts.github}`, 'output');
        
        await this.terminal.addLine('\n[ЛИЧНЫЕ ДАННЫЕ]', 'output info');
        await this.terminal.addLine(`Возраст: ${resumeData.personal.age}`, 'output');
        await this.terminal.addLine(`Город: ${resumeData.personal.city}`, 'output');
        await this.terminal.addLine(`Готовность к переезду: ${resumeData.personal.relocation}`, 'output');
        
        await this.terminal.addLine('\n[КРАТКОЕ ОПИСАНИЕ]', 'output info');
        await this.terminal.addLine(resumeData.summary, 'output');
        
        await this.terminal.addLine('\n[ТЕХНИЧЕСКИЕ НАВЫКИ]', 'output info');
        for (const skill of resumeData.skills) {
            await this.terminal.addLine(`• ${skill}`, 'output');
        }
        
        await this.terminal.addLine('\n[ОПЫТ РАБОТЫ]', 'output info');
        await this.terminal.addLine(`Период: ${resumeData.experience.period}`, 'output');
        await this.terminal.addLine(`Проекты:`, 'output');
        
        for (const project of resumeData.experience.projects) {
            await this.terminal.addLine(`\n• ${project.name}`, 'output highlight');
            for (const detail of project.details) {
                await this.terminal.addLine(`  - ${detail}`, 'output');
            }
        }
        
        await this.terminal.addLine('\n[ОБРАЗОВАНИЕ]', 'output info');
        await this.terminal.addLine(resumeData.education, 'output');
        
        await this.terminal.addLine('\n[ЛИЧНЫЕ КАЧЕСТВА]', 'output info');
        for (const quality of resumeData.qualities) {
            await this.terminal.addLine(`• ${quality}`, 'output');
        }
        
        await this.terminal.addLine('\n[ЦЕЛИ]', 'output info');
        await this.terminal.addLine(resumeData.goals, 'output');
        
        await this.terminal.addLine('\nДанные загружены успешно.', 'output success');
        
        this.terminal.addPrompt();
    }

    async runSequence() {
        try {
            this.terminal.setAnimationInProgress(true);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            await this.terminal.addCommand('dir', 150);
            await this.terminal.addLine('\n Directory of C:\\Users\\Anonymous\n\n07/06/2024  10:15 AM    <DIR>          Documents\n07/06/2024  10:15 AM    <DIR>          Downloads\n07/06/2024  10:15 AM    <DIR>          Desktop\n07/06/2024  10:15 AM             2,048 DEANONIM.exe\n\n               1 File(s)          2,048 bytes\n               3 Dir(s)  239,315,423,232 bytes free', 'output');
            
            await this.terminal.addCommand('cd Desktop', 150);
            await this.terminal.addLine('', 'output');
            
            await this.terminal.addCommand('DEANONIM.exe', 150);
            await this.terminal.addLine('\n[ЗАПУСК ПРОГРАММЫ ДЕАНОНИМИЗАЦИИ v3.7.1]', 'output success');
            await this.terminal.addLine('ВНИМАНИЕ: Данная программа предназначена только для авторизованных пользователей', 'output error');
            
            await this.terminal.addSpinner('Инициализация системы...', this.terminal.getRandomDelay(800, 1500));
            await this.terminal.addSpinner('Подключение к защищенным базам данных...', this.terminal.getRandomDelay(1000, 2000));
            await this.terminal.addLine('Доступ получен. Начинаю поиск информации...', 'output success');
            
            await this.terminal.addCommand('search --target "Дмитрий Попов" --deep-scan', 200);
            await this.terminal.addSpinner('Поиск в базах данных...', this.terminal.getRandomDelay(1500, 2500));
            
            await this.terminal.addLine('[НАЙДЕНО] Объект идентифицирован', 'output success');
            await this.terminal.addSpinner('Загрузка основной информации...', this.terminal.getRandomDelay(800, 1200));
            
            await this.showResumeImmediately();
            
            await this.terminal.addCommand('exit --save-log', 150);
            await this.terminal.addSpinner('Завершение работы программы...', this.terminal.getRandomDelay(800, 1200));
            await this.terminal.addLine('Программа завершена. Данные сохранены.', 'output success');
            
            this.terminal.addPrompt();
        } finally {
            this.terminal.setAnimationInProgress(false);
        }
    }

    init() {
        this.runSequence();
    }
}

// Инициализация приложения при загрузке страницы
window.onload = () => {
    new App().init();
}; 