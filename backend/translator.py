from googletrans import Translator
translator = Translator()
def detect_language(text):
    detected = translator.detect(text)
    return detected.lang
def translate_text(text, dest='en'):
    translated = translator.translate(text, dest=dest)
    return translated.text