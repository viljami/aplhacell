//Based on:
// 2012 Chris Longo (cal@chrislongo.net)

var Particle = function(color)
{
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0;
    this.friction = 1;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.alpha = 1;
    this.color = (color) ? color : 'black';

    Particle.prototype.update = function(context)
    {
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.vy += this.gravity;
        
        this.x += this.vx;
        this.y += this.vy;

        this.rotation = Math.atan2(this.vy, this.vx);

        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, 2, 0, (Math.PI * 2), true);
        context.closePath();
        context.fill();
        context.restore();
    };
};


var ParticleSystem = new function()
{
    var canvas;
    var context;
    var buffer;
    var bufferContext;
    var width;
    var height;
    
    var particles = [];
    var gravity = 0;//0.15;
    var friction = 1;

    var life = 1.0;
    
    var start = new Date();
    var frames = 0;
    var paused = 0;

    this.init = function(canvasElement)
    {
        canvas = canvasElement;
        width = canvas.width;
        height = canvas.height;

        context = canvas.getContext('2d');
        context.fillStyle = 'black';

/*
        for(var i = 0; i < particles.length; i++)
        {
            var particle = new Particle(randomColor());
            
            initParticle(particle);
            particles[i] = particle;
        }
*/
        canvas.onclick = function()
        {
            //paused = !paused;
        };

        //initBuffer();
        //update();
    };

/*
    var initBuffer = function()
    {
        buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        buffer.style.visibility = 'hidden';
        
        bufferContext = buffer.getContext("2d");
    };
    */

    var initParticle = function(particle)
    {
        particle.x = canvas.width / 2;
        particle.y = canvas.height / 2;
        particle.vx = Math.random() * 1 - .5;
        particle.vy = Math.random() * 1 - .5;
        particle.scaleX = 1;
        particle.scaleY = 1;
        particle.gravity = gravity;
        particle.friction = friction;
        particle.alpha = 1;
        particle.life = 1.0;
    };

    this.addParticle = function(o) {
    	var particle = new Particle("white");
    	initParticle(particle);

    	if (o) {
    		if (o.x) particle.x = o.x;
    		if (o.y) particle.y = o.y;
    		if (o.life) particle.life = o.life;
    		if (o.velocity) {
    			particle.vx = Math.random() * o.velocity - o.velocity/2;
        		particle.vy = Math.random() * o.velocity - o.velocity/2;
    		}
    		if (o.color == "random")
    			particle.color = randomColor();
    		else if (o.color == "ground") {
    			var colorB = 150 + Math.random()*100;
    			particle.color = "rgb(255, "+Math.floor(colorB)+", "+Math.floor(colorB)+")";
    		}
    		else if (o.color == "worm")
    			particle.color = "rgb("+Math.floor(Math.random()*150)+", 50, 0)";
    		else particle.color = "red";
    	}

    	particles.push(particle);
    }

    // main render loop
    this.update = function(context, deltaTime)
    {
        if(!paused)
        {
            //bufferContext.fillRect(0, 0, width, height);

            for(var i = particles.length-1; i >= 0; i--)
            {
                var particle = particles[i];
                
                particle.update(context);

                if(particle.x > canvas.width ||
                    particle.y > canvas.height ||
                    particle.x < 0 ||
                    particle.y < 0 ||
                    particle.life < 0)
                {
                    particles.splice(i, 1);
                    continue;
                }

                particle.scaleX += deltaTime*3;
                particle.scaleY += deltaTime*3;
                particle.alpha -= deltaTime;
                if (particle.alpha < 0) particle.alpha = 0;
                particle.friction = friction;
                particle.gravity = gravity;
                particle.life -= deltaTime;
            }

            // z-order sort. alpha indicates depth ;)
            //particles.sort(function(a, b) { return b.alpha - a.alpha; });
            frames++;
        }
    };

    var randomColor = function()
    {
        var color =
            (Math.random() * 255) << 16 |
            (Math.random() * 255) << 8 |
            (Math.random() * 255);

        return "#" + ("00000" + (color).toString(16)).slice(-6);
    };

    this.updateParticleCount = function(value)
    {
        particleCount = value;

        for(var i = particleCount; i < particles.length; i++)
            initParticle(particles[i]);
    };

    this.updateGravity = function(value)
    {
        gravity = value;
    };

    this.updateFriction = function(value)
    {
        friction = value;
    };

    this.framerate = function()
    {
        var now = new Date();
        var seconds = (now - start) / 1000;
        var rate = frames / seconds;

        start = now;
        frames = 0;

        return Math.round(rate);
    };
};