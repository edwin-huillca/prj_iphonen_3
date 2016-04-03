var navigator = window.navigator || {};

navigator.camera =  (function() {
  function resizeImage(img, maxHeight, maxWidth) {
    var ratio = maxHeight/maxWidth;
    if (img.height/img.width > ratio){
         // height is the problem
        if (img.height > maxHeight){
          img.width = Math.round(img.width*(maxHeight/img.height));
          img.height = maxHeight;
        }
    } else {
       // width is the problem
       if (img.width > maxHeight){
          img.height = Math.round(img.height*(maxWidth/img.width));
          img.width = maxWidth;
        }
    } 
  }

  // Always succeeds. Returns data URL for a local static photo
  function getPicture(onSuccess, onFail, options) {
    // We're just going to always succeed.
    var img = document.createElement('img');
    img.src = 'circle-red.png';
    img.style.position = 'absolute';
    img.style.left     = '-999em';

    img.onload = function() {
      if (options.targetHeight && options.targetWidth) {
        resizeImage(img, options.targetHeight, options.targetWidth);
      }
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/jpeg");
      onSuccess(dataURL.replace('data:image/jpeg;base64,', ''));
      alert("ejecuto custom");
    };
    document.body.appendChild(img);
  }

  return {
    getPicture: getPicture
  };
})();


var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    takePicture: function() {

      navigator.camera.getPicture( function( fotoURI ) {

        if (fotoURI !="") {
            alert("image en memoria.");
            $("#img_src").attr("src", fotoURI);
        };
      },
      function(message) {
        alert("ERROR: Cancel\xD3 toma de foto!");
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
     
    }
};


app.initialize();