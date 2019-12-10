
let k = {ArrowUp:0, ArrowDown:0, ArrowLeft:0, ArrowRight:0};
onkeydown = d => k[d.key] = 1;
onkeyup = d =>k[d.key] = 0;
let playing = true;


function lerp_number(a,b,t){
  return a+(b-a)*(1-Math.cos(t*Math.PI))/2; //smooth it
}

function noise_1(x){
  x = x*0.01%(perm.length); 
  return 2.5*lerp_number(perm[Math.floor(x)], perm[Math.ceil(x)], x-Math.floor(x));
}


function Player(){
  this.x = width/4;
  this.y = 0;
  this.ySpeed = 0;
  this.rotate = 0;
  this.rSpeed = 0;
  this.img = loadImage('assets/skateboard.png');

  this.draw = function(){

    let p1 = height - noise_1(t+this.x)*0.25;
    let p2 = height  - noise_1(t+5+this.x)*0.25;

    let grounded = 0;
    let angle = 0.5* Math.atan2(p2-10-this.y, (this.x+5) - this.x);

    if(p1-12 > this.y){
      this.ySpeed += 0.1;
    }else{
      this.ySpeed -= (this.y - (p1 - 12))*0.001;
      this.y = p1-12;
      grounded = 1;
    }

    if (!playing || (grounded && Math.abs(this.rotate > Math.PI*0.5))){
      playing = false;
      initPlay = 3;
      this.rSpeed = 5;
      k.ArrowUp = 1;
      this.x -= speed*2.5;
    }

     this.y += this.ySpeed;

    if(grounded && playing){
      this.rotate -= (this.rotate - angle)*0.5;
      this.rSpeed = this.rSpeed - (angle - this.rotate);
    }
    
    this.rSpeed += (k.ArrowLeft - k.ArrowRight)*0.5;
    
    this.rotate -= this.rSpeed*0.1;

    if(this.rotate > Math.PI) this.rotate = -Math.PI;
    if(this.rotate < -Math.PI) this.rotate = -Math.PI;

    push();
      translate(this.x,this.y);
      rotate(this.rotate);
      image(this.img, -10, -10, 50,50);
    pop();
  }

  this.react = function(b){
    if (sq(this.x+10 - b.x)+sq(this.y+10-b.y) < 50*50){
      if(!b.hit){
        console.log("collide")
        birdSound.play();
        b.hit = true;
        your_score ++;
      }
    }
  }
}

let upperFreq = 2000;
let lowerFreq = 100;
let barGravity = 0.4;
let barHeight = 0;



function drawFreq(){
  rect(width-30, height-650, 15, 600, 10);

  let currentFreq = 1.5*inputPitches[inputPitches.length-1];
  // console.log(currentFreq);
  let currentBY = map(currentFreq,0,upperFreq,0,600);

  if(currentBY > 0){
    barHeight = currentBY;
  }else{
    barHeight-= barGravity;
  } 
  if(barHeight < 0) barHeight = 0;

  if(barHeight < 600){
    push();
      translate(width-30,height-50);
      fill('rgb(12, 148, 99)');
      rect(0, -barHeight, 15, barHeight, 10);
    pop();
  }else{
    push();
      translate(width-30,height-50);
      fill(255,0,0);
      rect(0, -600, 15, 600, 10);
      barHeight = 0;
    pop();
  }
  
  // console.log(noteNum, perm[noteNum])
}

function drawNote(){
  fill(0);
  text('Time Left:', 40, 40);
  text(200-noteNum, 230, 40);

}

function drawScore(){
	fill(0);
  image(bird2,width-330,0,50,50);
	text('Your Score:', width-280, 40);
	text(your_score, width-60, 40);
}
