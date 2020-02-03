'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;


var constraints = {audio: false, video: true};

var start = document.querySelector('#start');
var snapshot = document.querySelector('#snapshot');
var filter = document.querySelector('#filter');
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');

var filters = ['blur', 'brightness', 'contrast', 'grayscale', 'hue', 'invert', 'saturate', 'sepia'];


function onError(error) {
   console.error(error);
};


start.addEventListener('click', function(stream) {
   start.style.display = 'none';
   snapshot.style.display = 'block';
   filter.style.display = 'block';

   navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      // Display your local video in #localVideo element
      video.srcObject = stream;
      // Add your stream to be sent to the conneting peer
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }, onError);
});




// function error(e) {
//    console.log('navigator.getUserMedia error: ', e);
// }

filter.addEventListener('click', function() {
   var index = (filters.indexOf(canvas.className) + 1) % filters.length;
   video.className = filters[index];
   canvas.className = filters[index];
});

snapshot.addEventListener('click', function() {
   canvas.width = 360;
   canvas.height = 270;
   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
});