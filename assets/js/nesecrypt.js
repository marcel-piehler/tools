var textInput = document.getElementById('input');
var keyInput = document.getElementById('key');
var textOutput = document.getElementById('output');

var encryptButton = document.getElementById('encrypt-button');
var decryptButton = document.getElementById('decrypt-button');

var illegalChar = false;
var mode = true;

textInput.addEventListener('input', cryptIt);
keyInput.addEventListener('input', cryptIt);

function switchInputOutput() {
  textInput.value = textOutput.value;
  changeMode(!mode);
  cryptIt();
}

function changeMode(newMode) {
  mode = newMode;
  cryptIt();
}

function generateKey() {
  var keyString = "";
  for(var i = 0; i < textInput.value.length; i++) {
    keyString += String.fromCharCode(Math.floor((Math.random() * 93) + 33));
  }
  keyInput.value = keyString;
}

function cryptIt() {
  var text = textInput.value;
  var key = keyInput.value;

  if (mode) {
    encryptButton.classList.add("selected");
    decryptButton.classList.remove("selected");
    textOutput.value = nesecrypt.encrypt(text, key);
  }
  else {
    encryptButton.classList.remove("selected");
    decryptButton.classList.add("selected");
    textOutput.value = nesecrypt.decrypt(text, key);
  }
}

var nesecrypt = {
  encrypt : function(text, key) {
    var encryptedText = "";

    for (var i = 0; i < text.length; i++) {      
      var textCharCode = text.charCodeAt(i) || 0;
      var keyCharCode = key.charCodeAt(i % key.length) || 0;

      var xorCharCode = textCharCode ^ keyCharCode;

      encryptedText += ("0" + xorCharCode.toString(16)).slice(-2);
    }

    return encryptedText;
  },

  decrypt : function(text, key) {
    var decryptedText = "";

    var hexArray = text.match(/.{2}/g);

    for (var i = 0; i < hexArray.length; i++) {
      var textCharCode = parseInt(hexArray[i], 16) || 0;
      var keyCharCode = key.charCodeAt(i % key.length) || 0;

      var xorCharCode = textCharCode ^ keyCharCode;

      decryptedText += String.fromCharCode(xorCharCode);
    }

    return decryptedText;
  }
}