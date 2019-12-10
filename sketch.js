
let url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe';
let pitch;
let audioContext;
let audioStream;

let inputPitches = []; // //Array to hold detected frequency values
let birdImg = [];
// let birdgif;

// Keyboard variables
// const cornerCoords = [10, 40];
// const rectWidth = 90;
// const rectHeight = 300;
// const keyRatio = 0.58;
// const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let currentNote = '';
let adjust = 0;
let noteNum = 5;
let initPlay = 0;
let frameRate1;

let birds = [];
let BIRD_SIZE = 50;
let BIRD_NUMBER = 10;
let your_score = 0;

var perm = [];
for (let n = 0; n < 400; n++){
  perm[n] = 200;
}


let t = 0;
let speed = 0;
let player; 

let created = false;
// --------- 

function preload(){
  img = loadImage("assets/background.jpg");
  startimg = loadImage("assets/startScreen.jpg");
  insimg = loadImage("assets/instruction.jpg");
  bird1 = loadImage("assets/bird1.png");
  bird2 = loadImage("assets/bird2.png");
  bird3 = loadImage("assets/bird3.png");
  bird4 = loadImage("assets/bird4.png");
  bgm = loadSound('assets/bgm.wav');
  birdSound = loadSound('assets/crow.wav');
  startSound = loadSound('assets/start.ogg');
  myFont = loadFont('assets/Bungee-Regular.ttf');
  gif = loadGif('assets/ins.gif');
}


function setup(){
	 // createCanvas(1400,600);
   let cvs = createCanvas(windowWidth, windowHeight);
   cvs.position(0,0);
   frameRate(30);
   birdImg = [bird1,bird2,bird3,bird4];
   
   textFont(myFont);
   // image(img,0,0);
  	audioContext = getAudioContext();
  	mic = new p5.AudioIn();
  	mic.start(startPitch);

    fill(255);
    player = new Player;

    for(let i = 0; i < BIRD_NUMBER; i++){
      let createBird = new Bird;
      birds.push(createBird);
    }

    button_s = select('#start');
    button = select('#play');
    button_r = select('#restart');

    button.style('visibility', 'hidden');
    button_r.style('visibility', 'hidden');
    
    bgm.play();
  // buttonB.mousePressed(function() {
  //   addExample('Paper');
  // });
}



// add resume()to let the audio start
// function mousePressed() { audioContext.resume() }

function startPitch() {
  pitch = ml5.pitchDetection(url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#play').html('Model Loaded');
  getPitch();
}

function getPitch() {
  // if(initPlay >= 1){
    pitch.getPitch(function(err, frequency) {
      if(initPlay == 2){
      if(adjust%10 == 0){
        if (frequency > 10) {
        // let midiNum = freqToMidi(frequency);
        // currentNote = scale[midiNum % 12];

        inputPitches.push(frequency);
        perm[noteNum] = 0.6*frequency + 0.4*perm[noteNum-1];

      }else{
        inputPitches.push(0); 
      }
      adjust = 0;
      noteNum += 1;
    }
    console.log(noteNum)
    adjust += 1;
  }
    getPitch();

  })
  // }
}

function draw() {
  // textSize(64)
  // text(currentNote,width/2, height/2);
  // frameRate1 = frameRate(50);
  // console.log(frameRate())
  console.log(initPlay)
  if (initPlay == 0) {
    startScreen();
  }

  if(initPlay == 1){
    instruction();
  }

  if(initPlay == 3){
    endGame();
  }

  if(initPlay == 2){

  speed -= (speed - (k.ArrowUp - k.ArrowDown))*0.01;
  t += 20;
  // background(0,0,255);

  image(img,-(t%width),0,width,height);
  image(img,width-(t%width),0,width,height);
  textSize(28);

  beginShape();
    fill(255);
    noStroke();
    vertex(0,height);
    for (let i = 0; i < width; i++){
      vertex(i, height - noise_1(t+i+30)*0.25);
      // console.log(noteNum)
      // if((t+i-20) == noteNum){
      //   console.log("drawLine")
      //   line(t+i-20,0,t+i-20,height);
      //   strokeWeight(5);
      //   stroke(255,0,0);
      // }
    }
    vertex(width,height);
  endShape();

  // if(noteNum > 60) initPlay = true;
  if(noteNum >= 200) {
    playing = false;
      this.rSpeed = 5;
    initPlay = 3;
    // text('Play End', width/2, height/2)
  }

  
  // if(initPlay) {

    for(let i = 0; i < birds.length; i++){
      player.react(birds[i]);
    }

    player.draw();
    birds.forEach(Bird => {
      Bird.draw();
    })
  // }
  
  
  drawFreq();
  drawNote();
  drawScore();
}
} 




