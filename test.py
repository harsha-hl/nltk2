from translate import Translator
from gtts import gTTS
import os
text="good morning"
translator= Translator(from_lang="English",to_lang="kannada")
translation = translator.translate(text)
print(translation)
language = 'kn'
myobj = gTTS(text=translation, lang=language, slow=False)
myobj.save("welcome.mp3")

os.system("mpg321 welcome.mp3")