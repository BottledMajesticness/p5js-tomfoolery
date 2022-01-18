var def_size = 50;
var cubedepth = 2;

class Sponge {

    constructor(size) {
        this.size = size;
        this.boxmap = new Array(3);
    }

    static make(size) {
        if (size == 0) {
            return 1
        }

        var sponge = new Sponge(size);
        sponge.boxmap = new Array(3);

        for (let x = 0; x < 3; x++) {
            sponge.boxmap[x] = new Array(3);
            for (let y = 0; y < 3; y++) {
                sponge.boxmap[x][y] = new Array(3);
                for (let z = 0; z < 3; z++) {
                    sponge.boxmap[x][y][z] = Sponge.make(size - 1);
                }
            }
        }

        sponge.boxmap[1][0][1] = 0;
        sponge.boxmap[1][2][1] = 0;

        sponge.boxmap[1][1][2] = 0;
        sponge.boxmap[1][1][0] = 0;

        sponge.boxmap[0][1][1] = 0;
        sponge.boxmap[2][1][1] = 0;

        sponge.boxmap[1][1][1] = 0;

        return sponge
    }

    draw () {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    if (this.boxmap[x][y][z] == 1) {
                        let shift = def_size / cubedepth;
                        translate(x * shift, y * shift, z * shift);
                        box(shift);
                        translate(-x * shift, -y * shift, -z * shift);
                    } else if (this.boxmap[x][y][z] instanceof Sponge) {
                        translate(x * def_size * 2, y * def_size, z * def_size);
                        this.boxmap[x][y][z].draw()
                        translate(-x * def_size * 2, -y * def_size, -z * def_size);
                    }
                }
            }
        }
    }
}

var sponge = Sponge.make(cubedepth);

function setup() {
    createCanvas(500, 500, WEBGL);

}
  
function draw() {
    background(200);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    translate(-def_size, -def_size, -def_size)
    sponge.draw();
}