function preprocess(){
    const para = document.getElementById('para').value;
    toDisplaySentences = para.match( /[^\.!\?]+[\.!\?]+/g );
    const groups = document.getElementById('groups').value;
    toDisplayGroups = groups.match(/[^\.!\?]+[\.!\?]+/g);
    console.log("\n\n This is groups:-\n "+ toDisplayGroups[0]);
    var objs = document.getElementById('myData').value;
    objs = objs.slice(1, objs.length-1);
    o = [];
    while (objs.length > 0)
    {
        o.push(objs.slice(1,objs.indexOf(']')  - 1));
        objs = objs.slice(objs.indexOf(']') + 3);
    }
    numOfSentences = o.length;
    for(let i=0;i<numOfSentences;i++){
      let senten = [];
      while(o[i].length>0)
        {
        senten.push( JSON.parse(o[i].slice(1,o[i].indexOf('}') +1)));
  
        console.log("typeee"+typeof(senten[0]));
       
        o[i] = o[i].slice(o[i].indexOf('}') +4);
        }
        sentences.push(senten);
    }
}
