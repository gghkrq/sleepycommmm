class FloatingImage {
    // Добавляем параметры width и height
    constructor(imageUrl, x, y, width, height) {
        this.el = document.createElement('img');
        this.el.className = 'draggable';
        this.el.src = imageUrl;
        
        // Устанавливаем индивидуальные размеры
        this.el.style.width = width + 'px';
        this.el.style.height = height + 'px';
        
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
        this.dragging = false;
        
        container.appendChild(this.el);
        this.addEvents();
        this.updatePosition();
    }

    addEvents() {
        this.el.addEventListener('mousedown', () => {
            this.dragging = true;
            this.vx = this.vy = 0;
        });

        document.addEventListener('mousemove', (e) => {
            if(this.dragging) {
                const rect = container.getBoundingClientRect();
                // Используем реальные размеры картинки
                this.x = e.clientX - rect.left - this.el.clientWidth/2;
                this.y = e.clientY - rect.top - this.el.clientHeight/2;
                this.updatePosition();
            }
        });

        document.addEventListener('mouseup', () => {
            if(this.dragging) {
                this.dragging = false;
                this.vx = (Math.random() - 0.5) * 8;
                this.vy = (Math.random() - 0.5) * 8;
            }
        });
    }

    update() {
        if(!this.dragging) {
            this.x += this.vx;
            this.y += this.vy;

            const containerRect = container.getBoundingClientRect();
            // Используем реальные размеры для расчета границ
            const elemWidth = this.el.clientWidth;
            const elemHeight = this.el.clientHeight;
            
            if(this.x < 0) {
                this.x = 0;
                this.vx *= -0.8;
            } else if(this.x + elemWidth > containerRect.width) {
                this.x = containerRect.width - elemWidth;
                this.vx *= -0.8;
            }

            if(this.y < 0) {
                this.y = 0;
                this.vy *= -0.8;
            } else if(this.y + elemHeight > containerRect.height) {
                this.y = containerRect.height - elemHeight;
                this.vy *= -0.8;
            }
        }
        this.updatePosition();
    }

    updatePosition() {
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

// Создаем картинки с разными размерами (путь, x, y, ширина, высота)
const images = [
    new FloatingImage('./pics/prek1.png', 100, 100, 150, 150),
    new FloatingImage('./pics/prek2.png', 300, 200, 200, 200),
    new FloatingImage('./pics/prek3.png', 300, 200, 450, 450),
    new FloatingImage('./pics/prek4.png', 900, 20, 450, 450),
    new FloatingImage('./pics/star1.png', 400, 50, 50, 50),
    new FloatingImage('./pics/star2.png', 234, 564, 120, 120),
    new FloatingImage('./pics/star3.png', 678, 450, 180, 180),
    new FloatingImage('./pics/star4.png', 456, 340, 230, 230),
    new FloatingImage('./pics/star5.png', 1000, 160, 300, 300),
    new FloatingImage('./pics/star6.png', 824, 350, 50, 50),
    new FloatingImage('./pics/star7.png', 1111, 400, 50, 50),
];

function animate() {
    images.forEach(img => img.update());
    requestAnimationFrame(animate);
}
animate();