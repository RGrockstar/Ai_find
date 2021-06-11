objects=[];
status="";
function setup(){
    canvas= createCanvas(300, 300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(300,300);
}
function start(){
    object_detector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Object Detecting";
    object_name=document.getElementById("name").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function draw(){
image(video, 0,0, 380, 380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="object detected";
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%", objects[i].x+ 15, objects[i].y+ 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == object_name){
        video.stop();
        object_detector.detect(gotResults);
        document.getElementById("nob.num").innerHTML=object_name+"found";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance(object_name+"found");
        synth.speak(utterThis);
        }
        else{
            document.getElementById("nob.num").innerHTML=object_name+"not found";
        }
    }
}
}
function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}