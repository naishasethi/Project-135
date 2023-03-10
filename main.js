img="";
objects=[];
status="";
function setup() {
    canvas= createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Staus: Detecting Object";
    Objectname=document.getElementById("object_name").value;
}
function modelLoaded() {
    console.log("Model is Loaded");
    status=true;
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}
function draw() {
    image(video, 0,0,640,400);
   if (status != "") {
       r= random(255);
       g=random(255);
       b=random(255);
    objectDetector.detect(video, gotResult);
       for(i=0; i < objects.length; i++) {
        document.getElementById("status").innerHTML="Staus: Object Detected";  
        document.getElementById("numberofobjects").innerHTML="Number Of Objects Detected Are " + objects.length;
        fill(r,g,b);
        percent= floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if (objects[i].label== Objectname) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML=Objectname+ " Found";
            synth=window.speechSynthesis;
            utterthis=new SpeechSynthesisUtterance(Objectname+"Found");
            synth.speak(utterthis);
        }
        else {
            document.getElementById("object_status").innerHTML=Objectname+ " Not Found";
        }
       }
   }
}