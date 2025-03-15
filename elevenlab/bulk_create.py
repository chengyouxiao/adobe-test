import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Your ElevenLabs API Key
API_KEY = os.environ['ELEVEN_API_KEY']

# List of compound words
with open("elevenlab/words.csv") as f:
    buf = f.read()
    words = buf.split("\n")

# Select a Voice ID (Find one from ElevenLabs dashboard)
VOICE_ID = "D38z5RcWu1voky8WS1ja"  # Replace with an actual Voice ID

# ElevenLabs API URL
URL = "https://api.elevenlabs.io/v1/text-to-speech/" + VOICE_ID

# Headers for API request
HEADERS = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}



# Generate and save MP3 for each word
for word in words:
    data = {
        "text": word,
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }

    response = requests.post(URL, json=data, headers=HEADERS)

    if response.status_code == 200:
        with open(f"elevenlab/working/{word}.mp3", "wb") as file:
            file.write(response.content)
        print(f"Saved {word}.mp3")
    else:
        print(f"Error for {word}: {response.text}")

print("✅ All audio files generated!")
