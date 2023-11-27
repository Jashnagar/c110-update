Webcam.set({
    width:350,
    height:300,
    image_format :'png',
    png_quality:90
});

prediction_1 = "";

camera = document.getElementById("camera");

prediction_1 = "";

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    })
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aXFh55D-a/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_hand_gesture");
        prediction_1 = results[0].label;
        speak()
        if(results[0].label == "Thumbs Up")
        {
            document.getElementById("update_hand_gesture").innerHTML = "Amazing Job";
        }
        if(results[0].label == "Nice sign")
        {
            document.getElementById("update_hand_gesture").innerHTML = "Nice";
        }
        if(results[0].label == "thumbs down")
        {
            document.getElementById("update_hand_gesture").innerHTML = "Thats A Bad Job";
        } 
    }
}

function speak()    
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
