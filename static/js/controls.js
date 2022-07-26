function position(x,y,deg,path,hex_image, len, chemical)
{
  const space = document.getElementById("imageSpace");
  const img1 = document.createElement('img');
  img1.src = path;

img1.style.width = "auto";
img1.style.height = "auto";
  img1.style.position = "absolute";
  img1.style.left = x + "px";
  img1.style.filter = hexToFilter(hex_image);
  img1.style.bottom = y+"px";
  img1.setAttribute('id', 'im');
  img1.style.transform = "rotate(" + deg + "deg)";
  space.appendChild(img1);
  const caption = document.createElement('p');
  caption.setAttribute('id', 'captions');
  caption.innerText=chemical;
  caption.style.width ="auto"
  caption.style.height= "auto"
  caption.style.position = "absolute";
  caption.style.left = x + "px";
  var caption_pos = y-40;
  caption.style.bottom = caption_pos+"px";
  space.appendChild(caption);

}

function position_new(x,y,deg,path, len)
{
  const space2 = document.getElementById("imageSpace");
  const img2 = document.createElement('img');
  img2.src = path;
img2.style.width = "auto";
img2.style.height = "auto";
  img2.style.position = "absolute";
  img2.style.left = x + "px";
  img2.style.bottom = y+"px";
  img2.setAttribute('id', 'im');
  img2.style.transform = "rotate(" + deg + "deg)";
  space2.appendChild(img2);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function prevSentence(){
  if(sentence_index > 0){
    sentence_index --;
    decodeSentence();
  }
}

function nextSentence(){
  if(sentence_index < numOfSentences-1){
    sentence_index ++;
    decodeSentence();
  }
}

function getRandomColor() {
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
  }
  return color;
}

function randomColor(){ 
  return ("#" + Math.floor(Math.random()*16777215).toString(16)); 
}




function decodeSentence()
{

    const voiceSelect = document.querySelector("#selectLanguages");
    const playpausebtn = document.querySelector("#playpause");
    playpausebtn.innerHTML = "<i class='fa-solid fa-pause'></i>";

    populateVoiceList();

    const progressbar = document.querySelector(".progress");

    const changeProgress = (progress) => {
      progressbar.style.width = `${progress}%`;
    };

    console.log(toDisplaySentences.length);
    console.log(sentence_index+1)
    changeProgress((sentence_index+1)/toDisplaySentences.length*100);
    var myCanvas = document.getElementById('confetti');
    if(toDisplaySentences[sentence_index].includes("confirm")){               
      var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
      });
      myConfetti({
        particleCount: 500,
        angle: 90,
        spread: 180,
        startVelocity: 90,
        drift: -1,
        origin:{
          x : 0.5,
          y : 1.25
        },
        zIndex: 200,
        colors : ["#ff2800", "#A020F0","#64b5f6","#7b1fa2", "#ff9800", "#88ffff", "#e1ffb1", "#880e4f", "#4dd0e1", "#43a047", "#d81b60", "#00227b"],
      });
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
    speak(0);

    function populateVoiceList() {
        voices = synth.getVoices().sort();
        voiceSelect.innerHTML = "";
      
        for (let i = 0; i < voices.length; i++) {
          const option = document.createElement("option");
          option.textContent = `${voices[i].name} (${voices[i].lang})`;
      
          if (i === 0) {
            option.textContent += " -- DEFAULT";
          }
      
          option.setAttribute("data-lang", voices[i].lang);
          option.setAttribute("data-name", voices[i].name);
          voiceSelect.appendChild(option);
        }
      }

      higlightWord = function (text, index) {
        var words = text.match(/\w+/g);
        // let words = text.split(" ");
        words[words.length-1] += ".";
        if (index >= words.length) {
            return text;
        }
        // ${randomColor()}
        words.splice(index, 0, `<span class='highlight' style='color: #3330E4'>`);
        words.splice(index + 2, 0, "</span>");
        return words.join(' ');
    };
      
      function speak(voice) {
        if (synth.speaking) {
          synth.cancel();
        }
          $('#statement').html(toDisplaySentences[sentence_index]);
          wordToSpeakIndex = 0;
          const utterThis = new SpeechSynthesisUtterance(toDisplaySentences[sentence_index]);
          utterThis.addEventListener('boundary', ()=>{
            var sentence = higlightWord($('#statement').text(), wordToSpeakIndex);
            wordToSpeakIndex += 1;
            $('#statement').html(sentence);
        });
        utterThis.addEventListener('end', ()=>{
            $('#statement').html(toDisplaySentences[sentence_index]);
            wordToSpeakIndex = 0;
        });
        utterThis.voice = voices[voice];
        utterThis.rate = 0.8;
          synth.speak(utterThis);
      }
      
      voiceSelect.onchange = () => {
        const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
        let i = 0;
        for (; i < voices.length; i++) {
          if (voices[i].name === selectedOption) {
            break;
          }
        }
        console.log(i);
        wordToSpeakIndex = 0;
        if (synth.speaking) {
          synth.cancel();
        }
        speak(i);
      };
      
      playpausebtn.onclick = () => {
          if(synth.paused){
            synth.resume(); 
            console.log("In resume"+synth.paused);
            playpausebtn.innerHTML = "<i class='fa-solid fa-pause'></i>";
          } 
          else{
            synth.pause(); 
            console.log("In pause"+synth.paused);
            playpausebtn.innerHTML = "<i class='fa-solid fa-play'></i>";
          } 
      }  

///////////////////////////
   
    group.innerText= toDisplayGroups[sentence_index];
    

    let images = Array.prototype.slice.call(document.getElementById("imageSpace").getElementsByTagName("img"));
    let caption = Array.prototype.slice.call(document.getElementById("imageSpace").getElementsByTagName("p"));
    for(let i=0;i<images.length;i++)
      images[i].remove();
    for(let i=0; i<caption.length; i++)
      caption[i].remove();
    
    expDetails = document.getElementById("expDetails");
    expDetails.innerHTML = '';
    const statement = document.getElementById("statement"); 
    statement.innerHTML = toDisplaySentences[sentence_index]; 
    statement.style.color = getRandomColor();
    const step = document.getElementById("step"); 
    step.innerHTML = "Step : " + (sentence_index + 1);
    let sentence = sentences[sentence_index];
    var k = sentence.length;                     //sentence has the objects in one sentence
    console.log("len of sentence in next"+k);

    for(let i=0; i<k; i++)
    {
      var name=sentence[i].name;
      var verb=sentence[i].verb;
      
      expDetails.innerHTML+='<br />'+'Name: '+name+'<br />';
      expDetails.innerHTML+='Verb: '+verb+'<br />';
    }
    k==0?0:expDetails.innerHTML+=JSON.stringify(sentence, null, 2);

    if(sentence.length===0)
    {
      console.log("SNETENCE_INDEXXXXXXX"+sentence_index);
      let no_object = sentence_index;
      no_object--;
       if(no_object.length===0)
       {
        while(no_object!==0)
        {
        no_object--;
        }
       }
       let images1 = Array.prototype.slice.call(document.getElementById("imageSpace").getElementsByTagName("img"));
       for(let i=0;i<images1.length;i++)
          images1[i].remove();
        let sents = sentences[no_object];
        var le=sents.length;
        for(var t=0;t<le;t++)
        {
            console.log("i am in the new pos"+sents[t].name);
          var z=0;
          var x_new=sents[t].positionx;
          var y_new=sents[t].positiony;
          var hex_image_new=sents[t].colour;
          var chemical = sents[t].chemicals;
          chemical = chemical.charAt(0).toUpperCase() + chemical.slice(1);
          console.log("Chemicals in empty sentence"+ chemical);
          

                  console.log("This is hex of image"+hex_image_new);
                  if(sents[t].name === 'gas')
                  {
                    console.log("in sents for gas");
                    var ka = "-380";
                    var kax = "300";
                    position(kax,ka,z,sents[t].src,hex_image_new, t, chemical);
                  }
                  else if(sents[t].name === 'burette')
                  {
                     var buu = "330";
                     position(buu,y,z,sents[t].src,hex_image,t, chemical);
                  }
                  else{
                  position(x_new,y_new,z,sents[t].src,hex_image_new, t, chemical);
                  }
                  var ppt_outline = (sents[t].name).localeCompare("precipitate");
                 if(sents[t].name !== 'precipitate' && sents[t].name !== 'gas' && sents[t].name !== 'ring')
                 {
                  if(sents[t].verb === 'pour' || sents[t].verb === 'add')
                  {
                  var src_new = "static/new_"+sents[t].name+"_pour.png";    /////////////////////////////////////////////////////////
                position_new((x_new),y_new,z,src_new, t);  ///////////////////////////////////////////////////////
                  }
                   else
                   {
                     var src_noverb_new="static/new_"+sents[t].name+".png";
                     if(sents[t].name === 'burette')
                     {
                       var bb = "330";
                       position_new(bb,y_new,z,src_noverb_new,t);
                     }
                     else{
                     position_new(x_new,y_new,z,src_noverb_new,t);
                     }
                  }  
                }
               }
            }
     else
     {

    for(var p = 0;p<k;p++)       //p is the number of objects in a sentence
    {
        console.log("inside sentence loop"+ sentence[p].name);
        console.log("sentence[p].pos bbbbbbb\n\n"+sentence[p].positionx);
        var x=sentence[p].positionx;
       
        var y = sentence[p].positiony;
        var z=0;
              console.log("just here");  
                    console.log(" heyyy i am in up sentence[p].src"+sentence[p].src);
                  console.log(" heyyy i am in  sentence[p].src"+sentence[p].src);
                  var hex_image=sentence[p].colour;
                  var chemical = sentence[p].chemicals;
                  chemical = chemical.charAt(0).toUpperCase() + chemical.slice(1);
                  console.log("Chemical of sentence "+p+"is "+": "+ chemical)
                  console.log("This is hex of image"+hex_image);
                  if(sentence[p].name === 'gas')
                  {
                    var ga = "-380";
                    var gax = "300";
                    position(gax,ga,z,sentence[p].src,hex_image, k, chemical);
                  }

                  else if(sentence[p].name === 'burette')
                  {
                     var buu = "330";
                     position(buu,y,z,sentence[p].src,hex_image,k,chemical);
                  }
                  
                  else{
                  position(x,y,z,sentence[p].src,hex_image, k,chemical);
                  }


                  var ppt_outline = (sentence[p].name).localeCompare("precipitate");
                 var a_verb = (sentence[p].verb).localeCompare("pour");
                // if(ppt_outline!==0)      /////////////////////////////////////////////////////////
                if(sentence[p].name !== 'precipitate' && sentence[p].name !== 'gas' && sentence[p].name !== 'ring') 
                {

                  if(sentence[p].verb === 'pour' || sentence[p].verb === 'add')
                  {
                  var src_new = "static/new_"+sentence[p].name+"_pour.png";    /////////////////////////////////////////////////////////
                position_new((x),y,z,src_new, k);  ///////////////////////////////////////////////////////
                  }
                   else
                   {
                     var src_noverb_new="static/new_"+sentence[p].name+".png";
                     
                     if(sentence[p].name === 'burette')
                     {
                        var bu = "330";
                        position_new(bu,y,z,src_noverb_new,k);
                     }
                     else{
                     position_new(x,y,z,src_noverb_new,k);
                     }
                   }
                  }
                   
               }        
    }
}