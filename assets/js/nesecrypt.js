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
  cryptIt();
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
    var encryptedString = "";
    var encryptedArray = "";
    var encodedString = "";

    for (var i = 0; i < text.length; i++) {      
      var textCharCode = text.charCodeAt(i) || 0;
      var keyCharCode = key.charCodeAt(i % key.length) || 0;

      var xorCharCode = textCharCode ^ keyCharCode;

      encryptedString += String.fromCharCode(xorCharCode);
    }

    encryptedArray = StrToUint8Array(encryptedString);
    encodedString = btoa(String.fromCharCode.apply(null, encryptedArray));
    
    return encodedString;
  },

  decrypt : function(text, key) {
    var decryptedString = "";

    var decodedString = atob(text);
    var encryptedArray = new Uint8Array(decodedString.length);

    for(var i = 0; i < decodedString.length; i++) {
      encryptedArray[i] = decodedString.charCodeAt(i);
    }

    var encryptedString = Uint8ArrayToStr(encryptedArray);

    for (var i = 0; i < encryptedString.length; i++) {      
      var textCharCode = encryptedString.charCodeAt(i) || 0;
      var keyCharCode = key.charCodeAt(i % key.length) || 0;

      var xorCharCode = textCharCode ^ keyCharCode;

      decryptedString += String.fromCharCode(xorCharCode);
    }

    return decryptedString;
  }
}

function Uint8ArrayToStr(byteArray) {
  // Use TextDecoder if available
  if (window.TextDecoder) {
    return new TextDecoder('utf-8').decode(byteArray);
  }

  var utf8 = String.fromCharCode.apply(null, byteArray);
  return decodeURIComponent(escape(utf8));
}

function StrToUint8Array(str) {
  // Use TextEncoder if available
  if (window.TextEncoder) {
    return new TextEncoder('utf-8').encode(str);
  }

  var utf8 = unescape(encodeURIComponent(str));
  var result = new Uint8Array(utf8.length);
  for (var i = 0; i < utf8.length; i++) {
      result[i] = utf8.charCodeAt(i);
  }
  return result;
}