from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from translator import detect_language, translate_text
app = FastAPI()
# CORS settings
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Message(BaseModel):
    message: str
@app.post("/webhook")
async def webhook(message: Message):
    """
    Route to handle incoming messages from the web interface and
    forward them to the Rasa server.
    """
    user_message = message.message
    # Detect language and translate to English
    detected_language = detect_language(user_message)
    translated_message = translate_text(user_message, dest='en')
    # Send translated message to Rasa
    rasa_response = requests.post(
        "http://localhost:5005/webhooks/rest/webhook",  # Rasa server webhook URL
        json={"sender": "user", "message": translated_message},
    )
    response_json = rasa_response.json()
    response_text = response_json[0].get("text", "") if response_json else "Sorry, I didn't understand that."
    # Translate Rasa response back to user language
    final_response = translate_text(response_text, dest=detected_language)
    return {"response": final_response}
@app.get("/")
async def root():
    """
    Root endpoint for testing if the server is running.
    """
    return {"message": "Hello, World!"}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)