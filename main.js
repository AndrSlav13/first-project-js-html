// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(2000000000);
  console.log('Two second later');
}

demo();

//----------------------------------------------------------------
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
//----------------------------------------------------------------
function Ball(x, y, velX, velY, color, size, ty) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
this.flag = true;
this.ind = 1000;
this.type = ty;
}
//----------------------------------------------------------------

function BallE(x, y, color, size) {
  Ball.call(this, x, y, 0, 0, color, size, "BallE");


};
BallE.prototype = Object.create(Ball.prototype);
//BallE.constructor = BallE;
Object.defineProperty(BallE.prototype, 'constructor', {
    value: BallE,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });
//----------------------------------------------------------------
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
//----------------------------------------------------------------
BallE.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.arc(this.x, this.y, this.size * 0.5, 0, 2 * Math.PI);
  ctx.fill();
}
//----------------------------------------------------------------
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

//----------------------------------------------------------------
Ball.prototype.collisionDetect = function() {
//'use strict'; // see strict mode
  for (let j = 0; j < balls.length; j++) {
	if (this === balls[j]) continue;

      let dx = this.x - balls[j].x;
      let dy = this.y - balls[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

if(distance<0.00000001) 
{
//alert(`${this.x}   ${balls[j].x}   ${this.y}   ${balls[j].y}`);
continue;
};

//if()
//alert(`${this.x}   ${balls[balls.length-2].x}   ${this.y}   ${balls[balls.length-2].y}`);

if ((this.ind !== 1000) && (this.ind === balls[j].ind) && (distance > (this.size + balls[j].size) ) )
{this.ind = balls[j].ind = 1000;};
	if (distance > this.size + balls[j].size || (this.flag === false) || (balls[j].flag === false) || ((this.ind !== 1000) && (this.ind === balls[j].ind))) continue;


if(!distance)
{
//alert(`eee    ${j}`);
};

if((balls[j].constructor.name === 'BallE') && (distance < (this.size + balls[j].size)))
{
 //alert(`${distance}   ${this.size}   ${balls[j].size}`);
	this.velX = this.velY = 0;
	this.x = this.y = -100;
 break;
};

//alert(`${this.constructor.name}      ${balls[j].constructor.name}`);
/*
//if(this.constructor.name === 'BallE') 
if(this.type === 'BallE') 
{
 //alert(`${distance}   ${this.size}   ${balls[j].size}`);
	balls[j].velX = balls[j].velY = 0;
	balls[j].x = balls[j].y = -100000;
 continue;
};
*/
this.ind = balls[j].ind = j;
this.flag = balls[j].flag = false;

        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        dx /= distance;
        dy /= distance;
if(!distance)
{
//alert(`${this.x}   ${balls[j].x}   ${this.y}   ${balls[j].y}    ${dx}    ${dy}`);
};
//dx /= distance ? distance : 1;
//dy /= distance ? distance : 1;

	let dxp = -dy;
	let dyp = dx;
	if(Math.sign(dx * dyp - dxp * dy) < 0){ dxp = -dxp; dyp = -dyp; };

	let vdt = this.velX * dxp + this.velY * dyp;  
	let vdb = balls[j].velX * dxp + balls[j].velY * dyp;  
	let vt = this.velX * dx + this.velY * dy;  
	let vb = balls[j].velX * dx + balls[j].velY * dy; 
	let c = vb - vt;
	let a = vb + vt;

this.velX = this.velY = 0;
balls[j].velX = balls[j].velY = 0;

this.velX += vdt * dxp;
this.velY += vdt * dyp;

balls[j].velX += vdb * dxp;
balls[j].velY += vdb * dyp;

this.velX += 0.5 * (a + c) * dx;
this.velY += 0.5 * (a + c) * dy;

balls[j].velX += 0.5 * (a - c) * dx;
balls[j].velY += 0.5 * (a - c) * dy;





/*
	const distT = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
	const cosT = this.velX/distT;
	const sinT = this.velY/distT;
	const distB = Math.sqrt(balls[j].velX * balls[j].velX + balls[j].velY * balls[j].velY);
	const cosB = balls[j].velX/distB;
	const sinB = balls[j].velY/distB;

	let vT, vB;
	const dT = (cosT*sinB-sinT*cosB);
	vT = (a*sinB-b*cosB)/dT;
	const dB = (sinT*cosB-cosT*sinB);
	vB = (a*sinT-b*cosT)/dB;
//alert('${this.velY}ererte${vB}');
alert(vxT);
alert(this.velX);
alert(vyT);
alert(this.velY);
alert(vxB);
alert(balls[j].velX);
alert(vyB);
alert(balls[j].velY);
	this.velX = vT*cosT;
	this.velY = vT*sinT;
	balls[j].velX = vB*cosB;
	balls[j].velY = vB*sinB;
*/
      }
}



//----------------------------------------------------------------
let balls = [];
  let size = random(10,20);
  let bE = new BallE(
    random(0 + size,width - size),
    random(0 + size,height - size),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );


while (balls.length < 100) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    "Ball"
  );

  balls.push(ball);
}
balls.push(bE);





//----------------------------------------------------------------
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  };

  for (let i = 0; i < balls.length; i++) {
    balls[i].collisionDetect();
  };

for (let i = 0; i < balls.length; i++) { balls[i].flag = true;};

    //bE.draw();
    //bE.update();

  requestAnimationFrame(loop);
}
//----------------------------------------------------------------
window.addEventListener("keypress", event => {

  if (event.keyCode === 37) {
    bE.velX = -4;
  };
  if (event.keyCode === 39) {
    bE.velX = 4;
  };
  // do something
});

window.addEventListener("keyup", event => {

  if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
    bE.velX = bE.velY = 0;
  };
  // do something
});






loop();