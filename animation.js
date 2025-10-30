document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('animated-bg');
    
    // Check if canvas exists
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse position
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Area of effect around the cursor
    };
    
    window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX; // Use clientX for better compatibility
        mouse.y = e.clientY; // Use clientY for better compatibility
    });
    
    // Create particles
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            // Calculate distance between mouse and particle
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius && mouse.x != null && mouse.y != null) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;
                
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 10;
                }
            }
            
            // Move particles slightly
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
    }
    
    // Create floating dots
    class FloatingDot {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        draw() {
            ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        update() {
            // Move dots
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check - wrap around
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
            
            // Pulsate opacity
            this.opacity += Math.random() * 0.02 - 0.01;
            if (this.opacity > 0.7) this.opacity = 0.7;
            if (this.opacity < 0.1) this.opacity = 0.1;
        }
    }
    
    // Create particle array
    const particleArray = [];
    const numberOfParticles = 100;
    
    // Create floating dots array
    const floatingDotsArray = [];
    const numberOfDots = 50;
    
    function init() {
        particleArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particleArray.push(new Particle());
        }
        
        floatingDotsArray.length = 0;
        for (let i = 0; i < numberOfDots; i++) {
            floatingDotsArray.push(new FloatingDot());
        }
    }
    init();
    
    // Connect particles with lines
    function connect() {
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                let dx = particleArray[a].x - particleArray[b].x;
                let dy = particleArray[a].y - particleArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw floating dots
        for (let i = 0; i < floatingDotsArray.length; i++) {
            floatingDotsArray[i].update();
            floatingDotsArray[i].draw();
        }
        
        // Update and draw particles
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
            particleArray[i].draw();
        }
        
        connect();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Reset mouse position when it leaves the window
    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });
});