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

        for (let i = 0; i < numParticles; i++) {
            // Parametric equations for heart shape
            const t = (i / numParticles) * 2 * Math.PI;
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

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
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