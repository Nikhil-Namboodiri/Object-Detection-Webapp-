status = '';
objects = [];
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting objects';
    value = document.getElementById('input_object').value;
}
function modelLoaded(){
    console.log('Model loaded');
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,480,380);
    if(status != ''){
        for(i = 0; i<objects.length; i++){
            fill('#FF0000')
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);  
            if(objects[i.label == value]){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById('status').innerHTML = value + ' found';
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(value + ' found');
                synth.speak(utterThis);
            }
            else{
                document.getElementById('status').innerHTML =  value + ' not found';
            }
        }
    }
}
