class Player extends Sprite{
    constructor({collisionBlocks, imageSrc, frameRate, scale = 0.8, animations}) { // player's properties
        super({imageSrc, frameRate, scale});
        this.position = {
            x: 50,
            y: 400
        }

        this.velocity = { // player's velocity
            x: 0,
            y: 0
        }


        this.collisionBlocks = collisionBlocks;
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height: 10
        }

        this.gravity = 0.11; // gravity

        this.animations = animations;

        for (let key in this.animations) {
            const image = new Image();
            image.src = this.animations[key].imageSrc;
            
            this.animations[key].image = image;
        }

        this.camerabox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 200,
            height:80,
        }

    }

    swapSprite(key) {
        if (this.image === this.animations[key].image) return;
        this.image = this.animations[key].image;
        this.frameRate = this.animations[key].frameRate;
    }

    updateCamera() {
        this.camerabox = {
            position: {
                x: this.position.x - 65,
                y: this.position.y
            },
            width: 200,
            height:80,
        }
    }

    panLeft({canvas, camera}) { // pan the camera to the left
        const cameraBoxRight = this.camerabox.position.x + this.camerabox.width;
        const scaledWidth = canvas.width / 2;

        if (cameraBoxRight >= 1024) return;

        if (cameraBoxRight <= scaledWidth + Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
           
        }
    }

    panRight({canvas, camera}) { // pan the camera to the right
        if (this.camerabox.position.x <= 0) return;

        if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= this.velocity.x;
        }
    }

    panDown({canvas, camera}) { // pan the camera to the right
        if (this.camerabox.position.y >= 0) return;

        if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y;
        }
    }

    update() { // update the player
        this.updateFrames();
        this.updateCamera();
        this.updateHitbox();


        this.draw()

        this.position.y += this.velocity.y; 
        this.applyGravity();
        this.checkCollisionVert();
        
    }

    

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 26,
                y: this.position.y + 19
            },
            width: 16,
            height: 20
        }
    }

 
    applyGravity() {
        this.position.x += this.velocity.x;

        this.velocity.y += this.gravity; // apply gravity
    }

    checkCollisionVert() { // check for vertical collisionD
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            if (
                collision({
                    object1: this.hitbox,
                    object2: collisionBlock
                })
            ) {
                 if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;

                    this.position.y = collisionBlock.position.y - offset -0.01; 
                 }
            }
        }
    }
 

}   

