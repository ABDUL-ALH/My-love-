class HeartAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;
        this.handleResize();
        this.initializeParticles();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    initializeParticles() {
        const particleCount = Math.min(Math.floor(this.width * this.height / 20000), 50);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            size: Math.random() * 10 + 5,
            speedX: Math.random() * 2 - 1,
            speedY: -Math.random() * 2 - 0.5,
            hue: Math.random() * 60 - 30, // Variation in red color
            opacity: Math.random() * 0.5 + 0.5
        };
    }

    drawHeart(x, y, size) {
        this.ctx.beginPath();
        const topCurveHeight = size * 0.3;
        
        // Start at the bottom point
        this.ctx.moveTo(x, y + size/2);
        
        // Left curve
        this.ctx.bezierCurveTo(
            x - size/2, y + size/4,
            x - size/2, y - topCurveHeight,
            x, y - topCurveHeight
        );
        
        // Right curve
        this.ctx.bezierCurveTo(
            x + size/2, y - topCurveHeight,
            x + size/2, y + size/4,
            x, y + size/2
        );
        
        this.ctx.closePath();
        this.ctx.fill();
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Reset if out of bounds
            if (particle.y < -particle.size) {
                particle.y = this.height + particle.size;
                particle.x = Math.random() * this.width;
            }

            // Wrap horizontally
            if (particle.x < -particle.size) particle.x = this.width + particle.size;
            if (particle.x > this.width + particle.size) particle.x = -particle.size;

            // Draw heart
            this.ctx.fillStyle = `hsla(350, 100%, ${70 + particle.hue}%, ${particle.opacity})`;
            this.drawHeart(particle.x, particle.y, particle.size);
        });

        requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }

    stop() {
        this.isActive = false;
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeartAnimation;
}

// Initialize heart animations for each page
document.addEventListener('DOMContentLoaded', () => {
    const canvasIds = [
        'heartCanvas-password',
        'heartCanvas-home',
        'heartCanvas-story',
        'heartCanvas-gift',
        'heartCanvas-choices',
        'heartCanvas-messages'
    ];

    canvasIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            new HeartAnimation(canvas);
        }
    });
});