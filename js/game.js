
let x = y = 0;
const tileSize = 64;
const numTiles = 9;
const uiWidth = 4;

function setupCanvas(){
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = tileSize*(numTiles+uiWidth);
    canvas.height = tileSize*numTiles;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
}

ctx.fillRect(0,0,20,20,20);


document.querySelector("html").onkeypress = function(e){
    if(e.key=="w") y--;
    if(e.key=="s") y++;
    if(e.key=="a") x--;
    if(e.key=="d") x++;
};

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect (x*tileSize,y*tileSize,tileSize,tileSize);
}

setInterval(draw, 15);