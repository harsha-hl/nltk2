var sentence_index = 0, numOfSentences, sentences=[], o, paragraph, toDisplaySentences, wordToSpeakIndex = 0;
const synth = window.speechSynthesis;
var voices = []
document.addEventListener("DOMContentLoaded", function (){
  preprocess();  
  decodeSentence();
  });



