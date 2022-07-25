// const synth = window.speechSynthesis;
// var wordToSpeakIndex = 0;
// document.addEventListener('DOMContentLoaded', () => {
//     const voiceSelect = document.querySelector("select");
//     const playpausebtn = document.querySelector("#playpause");
//     let voices = [];

//     populateVoiceList();

//     if (speechSynthesis.onvoiceschanged !== undefined) {
//       speechSynthesis.onvoiceschanged = populateVoiceList;
//     }
//     speak();

//     function populateVoiceList() {
//         voices = synth.getVoices().sort();
//         const selectedIndex =
//           voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
//         voiceSelect.innerHTML = "";
      
//         for (let i = 0; i < voices.length; i++) {
//           const option = document.createElement("option");
//           option.textContent = `${voices[i].name} (${voices[i].lang})`;
      
//           if (i === 0) {
//             option.textContent += " -- DEFAULT";
//           }
      
//           option.setAttribute("data-lang", voices[i].lang);
//           option.setAttribute("data-name", voices[i].name);
//           voiceSelect.appendChild(option);
//         }
//         voiceSelect.selectedIndex = selectedIndex;
//       }

//       higlightWord = function (text, index) {
//         var words = text.match(/\w+/g);
//         if (index >= words.length) {
//             return text;
//         }
//         words.splice(index, 0, "<span class='highlight'>");
//         words.splice(index + 2, 0, "</span>");
//         return words.join(' ');
//     };
      
//       function speak() {
//           synth.cancel();
//           $('#textt').html("Pour dilute hcl from beaker to testube");
//           index = 0;
//           const utterThis = new SpeechSynthesisUtterance("Pour dilute hcl from beaker to testube");
//           utterThis.addEventListener('boundary', ()=>{
//             var sentence = higlightWord($('#textt').text(), wordToSpeakIndex);
//             wordToSpeakIndex += 1;
//             $('#textt').html(sentence);
//         });
//         utterThis.addEventListener('end', ()=>{
//             $('#textt').html("Pour dilute hcl from beaker to testube");
//             wordToSpeakIndex = 0;
//         });

//           const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
//           for (let i = 0; i < voices.length; i++) {
//             if (voices[i].name === selectedOption) {
//               utterThis.voice = voices[i];
//               break;
//             }
//           }
//           synth.speak(utterThis);
//       }
      
//       voiceSelect.onchange = () => {
//         speak();
//       };
      
//       playpausebtn.onclick = () => {
//           if(synth.paused){
//             synth.resume(); 
//             playpausebtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
//           } 
//           else{
//             synth.pause(); 
//             playpausebtn.innerHTML = "<i class='fa-solid fa-play'></i>";
//           } 
//       }  
// });

function randomColor(){
  return ("#" + Math.floor(Math.random()*16777215).toString(16));
}

document.addEventListener('DOMContentLoaded', () => {

  const text = "Pour K234(d) dilute HCl from beaker to test tube.";
  const colorWords = text.split(" ");
  const statement = document.getElementById('statement');
  statement.innerHTML = " ";
  colorWords.forEach(word => {
    span = document.createElement('span');
    span.innerHTML = word + " ";
    span.style.color = randomColor();
    // span.style.backgroundColor = randomColor();
    statement.appendChild(span);
  });

  const spans = document.querySelectorAll('#statement span');
  spans[3].style.backgroundColor = "#D6EFED";
});