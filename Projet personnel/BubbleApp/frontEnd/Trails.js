
erase_width = 30;
pencil_width = 30;
let particles = [];
let outline = null;

const ClickThroughButton  = document.getElementById("clickThroughButton")
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 0);
    strokeWeight(2);
    stroke(255, 0, 0)
}

function draw() {
    if(outline != null) {
        outline.erase()
        outline = null;
    }

    if (mouseIsPressed) {
        if(mouseButton === LEFT){
            line(mouseX, mouseY, pmouseX, pmouseY);
        }
        else if (mouseButton === RIGHT){
            erase();
            circle(mouseX, mouseY, erase_width);
            noErase();

            outline = new EraserOutlineCircle(mouseX, mouseY, erase_width);
            outline.draw()
            /*
            particles.push(new Particle(mouseX, mouseY, erase_width));

            for(let p of particles){
                p.update()
                p.show()
            }
             */
        }
    }
}

class EraserOutlineCircle{
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.borderRadius = 3
    }
    draw() {
        ellipse(this.x, this.y, this.radius);
        erase();
        ellipse(this.x, this.y, this.radius-this.borderRadius);
        noErase();
    }
    erase(){
        erase();
        ellipse(this.x, this.y, this.radius + .8);
        noErase();
    }
}

class Particle {
    constructor(x, y, r) {
        this.pos = createVector(x, y, r);
        this.vel = p5.Vector.random2D().mult(random(1, 3));
        this.lifetime = 255;
        this.radius = r;
    }
    update() {
        this.pos.add(this.vel);
        this.lifetime -= 5;
    }
    show() {
        noStroke();
        fill(0, 150, 255, this.lifetime);
        ellipse(this.pos.x, this.pos.y, this.radius);
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

document.getElementById("side_color")
    .addEventListener("input", (e) => {
        document.getElementById('color_front').style.backgroundColor = e.target.value;
        rgb = hexToRgb(e.target.value)
        stroke(rgb.r, rgb.g, rgb.b);
    })

let cc = document.getElementById("cc");
cc.innerHTML += kelp.world();


ClickThroughButton.addEventListener('click', () => {
    ClickThrough.changeState()
})





