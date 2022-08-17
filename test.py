from gtts import gTTS
import os
from nltk.tokenize import sent_tokenize
f = open("static/text/kan_exp.txt", "r")
text =  f.read()
language = 'kn'
count=0
sentences = sent_tokenize(text)
for i in sentences:
    print(i)
    count+=1
    myobj = gTTS(text=text, lang=language, slow=False)
    myobj.save("welcome.mp3")
    #os.system("mpg321 welcome.mp3")
print(count)
