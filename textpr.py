# Temporary file for backup


import nltk
#nltk.download('punkt',halt_on_error=False)
#nltk.download('stopwords', halt_on_error=False)
#nltk.download('wordnet',halt_on_error=False)
#nltk.download('averaged_perceptron_tagger',halt_on_error=False)
#nltk.download('omw-1.4',halt_on_error=False)
from nltk.tokenize import sent_tokenize, word_tokenize
import re
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
from nltk import pos_tag
from bs4 import BeautifulSoup


anion = {'nitrate': 'nitrate', 'sulphate':'sulphate', 'phosphate':'phosphate', 'chloride':'chloride', 'carbonate':'carbonate', 'cyanide':'cyanide', 'dichromate':'dichromate','ferrocyanide':'ferrocyanide', 'hydroxide':'hydroxide'}
cation = {'copper':'copper','ferrous': 'ferrous', 'ferric':'ferric', 'sodium':'sodium', 'potassium':'potassium', 'ammonium':'ammonium', 'barium':'barium', 'strontium':'strontium','calcium':'calcium','hydrogen':'hydrogen'}
acids={'sulphuric':'sulphuric', 'hydrochloric':'hydrochloric', 'nitric':'nitric'}


a = []
global text, text2, text3
f = open("static/text/titration.txt", "r")
text = f.read()

f = open("static/text/basic_radical.txt", "r")
text2= f.read()

f= open("static/text/salt_analysis.txt", "r")
text3 = f.read()

def getObjects(line):
    line = re.sub(r"[^a-zA-Z0-9]", " ", line.lower())
    words = line.split()
    
    stop_words = set(stopwords.words('english'))
    filtered_sentence = [w for w in words if not w.lower() in stop_words]
    
    lemmed = [WordNetLemmatizer().lemmatize(w) for w in filtered_sentence]

    print("\n\nPOS tagged-\n")
    tagged = pos_tag(words)   #should have been lemmed not words
    print(tagged)
    with open('data.xml', 'r') as f:
        data = f.read()
    bs = BeautifulSoup(data, "xml")

    verb_count=0
    objects =[]
    positionx={}
    positiony={}
    colours={}
    verbs={}
    count=0
    temp=""
    verb_temp=""
    positionx_temp ="300"
    positiony_temp ="-600"
    colour_temp=""
    verb="default";posx=""; flag=0;posy=""
    colour="#cccccc"
    check_verb = ["add", "pour"]
    chemical=""
    chemicals={}
    chemical_temp=[]   #to hold temp values
    chemical_object=[]

    for i in tagged:

        try:
            
            chemical+=cation[i[0]]
            print(i[0],"is i of 0")
            print(chemical,"Ae all the chemicals")
        
        except:
            pass

        try:
            chemical+= acids[i[0]]
            if temp!="":
                chemicals[temp].append(chemical+" acid")
                
            else:
                chemical_temp.append(chemical+" acid")
               
            
            chemical=""
            
        except:
            pass

        try:
            chemical+=" " + anion[i[0]]
            print(i[0],"is i of 0")
            print(chemical,"Ae all the chemicals")
            if temp!="":
                chemicals[temp].append(chemical)
                print("This is also final", chemicals)
            else:
                chemical_temp.append(chemical)
                print("THIS IS FINAL", chemical_temp)
            chemical=""
        except:
            pass

        if i[1] == 'NN':
            if bs.find('obj', {'name':i[0]}) != None:
                objects.append(i[0])
                a.append(i[0])
                
                if temp=="" and verb_temp!="" :
                    verbs[i[0]]=verb_temp
                if temp=="" and positiony_temp !="":
                    
                    positionx[i[0]]=positionx_temp
                    positiony[i[0]]=positiony_temp
                if temp=="" and colour_temp != "":
                    
                    colours[i[0]] = colour_temp
                    colour_temp=""   
                if len(chemical_temp)!=0 and temp=="":
                    chemicals[i[0]] = chemical_temp
                    print("THE LIST FOR CHEMICALS", chemicals)                
                temp=i[0]
                
                count+=1
        if i[1]=='IN':
            p=bs.find('pos',{'name':i[0]})
            
            
            if p != None:
                if temp!="":
                    positionx[temp]= p.get('x')
                    positiony[temp]= p.get('y')

            
                else:
                    positionx_temp=p.get('x')
                    positiony_temp=p.get('y')
                    

        if i[1][0]=='V' or i[1]=='NNS' or i[1] == 'JJ' or i[1] == 'RB':
            if temp!="" and verb_count==0:
                verbs[temp]=i[0]
            elif verb_count==0:
                verb_temp =i[0];
            verb_count+=1

        if i[1]=="JJ" or i[1]=='IN':
            cc = bs.find('colour', {'name':i[0]})

            if cc != None:
                if temp!="":
                    colours[temp]=cc.get('hex')
                else:
                    colour_temp= cc.get('hex')
    x=[]
    
    print("\n\n\nobj",objects,)
    print("position",positionx,positiony)
    print("Verbs", verbs)
    print("chemicals ", chemicals)
    for i in range(count):
        
        name=objects[i]
        fill=0
        img=bs.find('img',{"name": objects[i]})
        src= img.get('src')
        try:
            colour = colours[objects[i]]
            
        except:
            colour="#cccccc"

        try:
            posx= positionx[objects[i]]
            posy= positiony[objects[i]]
        except:
           pass
        try:
            verb = verbs[objects[i]]            
            
        except:
           pass
        try:
            chemical_object = chemicals[objects[i]]
            print("\n\n\n\n\n typeeeeee", type(chemical_object) )
        except:
            pass
        if posx == "" or posy=="":
            posx= "300"
            posy= "-600"
        if verb in check_verb:
            src="static/"+name+"_pour.png"
            posx="110"        
            posy="-425"       
        if name=='precipitate':
            posx="307"
            posy="-593"
        if name == 'ring':
            posx="270"
        if name == "burner" and colour=="#cccccc":
            colour = "#e25822"
        
        x.append({"name":name, "fill":fill,"src":src, "colour":colour,"verb":verb,"positionx":posx, "positiony":posy, "chemicals":chemical_object})
        posx=""; posy=""
        verb="default"
        chemical_object=[]
        if i==1:
            temp_array = x[1]
            x[1]= x[0]
            x[0]=temp_array
        print(x)
    return x


def sen():
    #abc = sent_tokenize(text2)
    abc = sent_tokenize(text3)
    sent_len=len(abc)
    return(sent_len) 


def main():         
    #sentence = sent_tokenize(text)
    sentence = sent_tokenize(text3)
    #print(sent_tokenize(text))
    print(sent_tokenize(text3))
    obj=[]
    for i in sentence:
        x=getObjects(i)
        obj.append(x)
    print("Final output-\n",obj)
    return obj
        
main()

