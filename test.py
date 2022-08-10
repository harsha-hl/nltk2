from translate import Translator
from gtts import gTTS
import os
from nltk.tokenize import sent_tokenize, word_tokenize
f = open("static/text/salt_analysis.txt", "r")
text= f.read()
words = word_tokenize(text)
print(words)
kan=""
for i in words:
    if i != '.':
        try:
            translator= Translator(from_lang="English",to_lang="kannada")
            translation = translator.translate(i)
            kan += translation
            print(translation)
        except:
            pass
print("The kannada sentence is ", kan)

language = 'kn'
myobj = gTTS(text=kan, lang=language, slow=False)
myobj.save("welcome.mp3")

os.system("mpg321 welcome.mp3")
