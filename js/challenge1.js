class Star {
    x;
    y;
    z;

    constructor () {
        this.x = Math.random() * 640 - 320;
        this.y = Math.random() * 640 - 320;
        this.z = Math.random() * 640;
    }

    show () {
        fill(map(this.z, 0, 720, 255, 0));
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, width);

        ellipse(sx + 320, sy + 320, 640.0/this.z * 5, 640.0/this.z * 5);
    }

    update () {
        this.z += 15;

        if (this.z > 720) {
            this.x = Math.random() * 640 - 320;
            this.y = Math.random() * 640 - 320;
            this.z -= 640;
        }
    }
}

var stars = [];

function setup() {
    createCanvas(640, 640);
    for (let i = 0; i < 200; i++) {
        stars[i] = new Star();
    }
}
  
function draw() {
    background(0);

    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
}