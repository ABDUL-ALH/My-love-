class HeartParticles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.resize();
        this.init();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create particles in heart shape
        const numParticles = 3000;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const scale = 15; // Size of the heart

        // Create heart outline particles
        for (let i = 0; i < numParticles * 0.7; i++) {
            // Parametric equations for heart shape
            const t = (i / (numParticles * 0.7)) * 2 * Math.PI;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            
            // Add some randomness for more organic look
            const randX = (Math.random() - 0.5) * 2;
            const randY = (Math.random() - 0.5) * 2;

            this.particles.push({
                x: centerX + (x * scale) + randX,
                y: centerY - (y * scale) + randY,
                originX: centerX + (x * scale),
                originY: centerY - (y * scale),
                color: 'rgba(255, 107, 156, 0.8)',
                size: Math.random() * 2 + 1,
                vx: 0,
                vy: 0
            });
        }

        // Add particles for letter H
        const hPoints = this.getLetterPoints('H', centerX - 15, centerY - 5, 20);
        // Add particles for letter A
        const aPoints = this.getLetterPoints('A', centerX + 15, centerY - 5, 20);

        // Add letter particles
        [...hPoints, ...aPoints].forEach(point => {
            this.particles.push({
                x: point.x,
                y: point.y,
                originX: point.x,
                originY: point.y,
                color: 'rgba(255, 255, 255, 0.9)',
                size: Math.random() * 1.5 + 1,
                vx: 0,
                vy: 0
            });
        });
    }

    getLetterPoints(letter, startX, startY, size) {
        const points = [];
        const segments = 10; // Number of points per line segment

        if (letter === 'H') {
            // Left vertical line
            for (let i = 0; i <= segments; i++) {
                points.push({
                    x: startX - size/4,
                    y: startY - size/2 + (i * size/segments)
                });
            }
            // Right vertical line
            for (let i = 0; i <= segments; i++) {
                points.push({
                    x: startX + size/4,
                    y: startY - size/2 + (i * size/segments)
                });
            }
            // Middle horizontal line
            for (let i = 0; i <= segments; i++) {
                points.push({
                    x: startX - size/4 + (i * size/2/segments),
                    y: startY
                });
            }
        } else if (letter === 'A') {
            // Left diagonal
            for (let i = 0; i <= segments; i++) {
                points.push({
                    x: startX - size/3 + (i * size/3/segments),
                    y: startY + size/2 - (i * size/segments)
                });
            }
            // Right diagonal
            for (let i = 0; i <= segments; i++) {
                points.push({
                    x: startX + (i * size/3/segments),
                    y: startY - size/2 + (i * size/segments)
                });
            }
            // Middle horizontal line
            for (let i = 0; i <= segments/2; i++) {
                points.push({
                    x: startX - size/6 + (i * size/3/segments),
                    y: startY
                });
            }
        }

        return points;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            // Spring force towards original position
            const dx = particle.originX - particle.x;
            const dy = particle.originY - particle.y;
            particle.vx += dx * 0.03;
            particle.vy += dy * 0.03;

            // Mouse interaction
            const mouseDistance = Math.hypot(
                this.mouseX - particle.x,
                this.mouseY - particle.y
            );
            if (mouseDistance < 100) {
                const angle = Math.atan2(particle.y - this.mouseY, particle.x - this.mouseX);
                const force = (100 - mouseDistance) * 0.2;
                particle.vx += Math.cos(angle) * force;
                particle.vy += Math.sin(angle) * force;
            }

            // Apply velocity with damping
            particle.vx *= 0.9;
            particle.vy *= 0.9;
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Draw particle with glow effect
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add canvas to the page
    const canvas = document.createElement('canvas');
    canvas.id = 'heartCanvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        background: transparent;
    `;
    document.body.appendChild(canvas);

    // Create heart particles
    new HeartParticles('heartCanvas');
}); 