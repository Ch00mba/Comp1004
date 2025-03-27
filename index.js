const canvas = document.querySelector('canvas'); // get the canvas element
const c = canvas.getContext('2d'); // get the canvas context

// set the canvas width and height
canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 2,
    height: canvas.height / 2
}

const collisions2D = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisions2D.push(collisions.slice(i, i + 70));    
}

const collisionBlocks = [];
collisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 578 || symbol === 579 || symbol === 580 || symbol === 583 || symbol == 584) {
            collisionBlocks.push(
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    },
                })
            )
        }
    })
})

console.log(collisionBlocks);

// create a new player object
const player = new Player({
    collisionBlocks,
    imageSrc: 'img/squirrel/idle/spritesheet.png',
    frameRate: 8,
    animations: {
        idle: {
            imageSrc: 'img/squirrel/idle/spritesheet.png',
            frameRate: 8,
        },
        run: {
            imageSrc: 'img/squirrel/run/spritesheets.png',
            frameRate: 6,
        },
        jump: {
            imageSrc: 'img/squirrel/jump/spritesheet.png',
            frameRate: 4,
        },
    },
});



// create a new background object
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: 'img/map.png',
})

const camera = {
    position: {
        x: 0,
        y: 0
    }
}

// animations
function animate() {

    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(3, 3);
    c.translate(camera.position.x, -background.image.height + 350);
    background.update();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })

    if (player.position.y > canvas.height) {
        window.alert('Game Over');
    }


    player.update();

    if (player.velocity.x > 0) {
        player.panLeft({canvas, camera});
    }

    if (player.velocity.x < 0) {
        player.panLeft({canvas, camera});
    }

    c.restore();


    

}


animate();

if (player.position.y > canvas.height) {
    console.log('game over');
}

window.addEventListener('keydown', (event) => { // listen for keydown events
    switch (event.key) {
        case 'd': // move right
            player.swapSprite('run');
            player.velocity.x = 1.5;
            
            break;
        case 'a': // move left
        player.swapSprite('run');
            player.velocity.x = -1.5;
            break;
        case 'w': // jump
        player.swapSprite('jump');
            if (player.velocity.y === 0) player.velocity.y = -4;
            
            
            break;
        case ' ': // jump
            player.swapSprite('jump');
            if (player.velocity.y === 0) player.velocity.y = -4;
            
            
            break;
    }
});


window.addEventListener('keyup', (event) => { // listen for keyup events
    switch (event.key) {
        case 'd': // stop moving right
            player.swapSprite('idle');
            player.velocity.x = 0;
            break;
        case 'a': // stop moving left
            player.swapSprite('idle');
            player.velocity.x = 0;
            break;
        case 'w': // stop jumping
            player.swapSprite('idle');
            break;
        case ' ': // stop jumping
            player.swapSprite('idle');
            break;
    }

    //Game data for JSON

    let startTime = Date.now();
    let username = 'Player';
    let level = 'level 0';

    function calculateElapsed() {
        let elapsedSeconds = (Date.now() - startTime) / 1000;
        let elapsedMinutes = Math.floor(elapsedSeconds / 60);
        return elapsedMinutes;
    }

    function generateJSON() {
        const elapsedTime = calculateElapsed();
        const data = {
            timeSpentMinutes: elapsedTime,
            username: username,
            level: level,
        };

        const jsonData = JSON.stringify(data, null, 2);

        console.log(jsonData);
    }

    generateJSON();

});


