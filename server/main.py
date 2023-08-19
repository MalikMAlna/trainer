import os
from dotenv import load_dotenv
import openai
import sounddevice as sd
import numpy as np
import wavio
import queue
import requests
import base64
import time

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

# Capture Audio from Microphone

# Parameters for recording
RATE = 44100
CHANNELS = 2
DTYPE = np.float32
SECONDS = 7
FILENAME = "input.wav"
CHUNKSIZE = 1024  # Size of each audio chunk

# Queue to hold audio data
audio_queue = queue.Queue()

# Callback function to capture audio


def callback(indata, frames, time, status):
    if status:
        print(status)
    audio_queue.put(indata.copy())


# Record the audio
with sd.InputStream(callback=callback, channels=CHANNELS, samplerate=RATE, dtype=DTYPE, blocksize=CHUNKSIZE) as stream:
    print("Recording for {} seconds...".format(SECONDS))
    audio_data = np.empty((0, CHANNELS), dtype=DTYPE)
    for _ in range(int(SECONDS * RATE / CHUNKSIZE)):
        audio_chunk = audio_queue.get()
        audio_data = np.vstack((audio_data, audio_chunk))
    print("Recording complete.")

# Save the audio file
wavio.write(FILENAME, audio_data, RATE, sampwidth=3)
print("Recording saved to {}".format(FILENAME))

# Convert Audio to Text with Whisper API

# Set parameters
model_engine = "whisper-1"
input_file = os.path.join(os.path.dirname("__file__"), "input.wav")
print(input_file)
output_file = os.path.join(os.path.dirname("__file__"), "input.txt")

# Open audio file and read binary data
with open(input_file, 'rb') as input_data:
    # Call API with binary data as body
    response = openai.Audio.transcribe(
        file=input_data, model=model_engine, response_format="text")

print(response)

# Write text to output file
with open(output_file, 'w') as f:
    f.write(response)


# Send Text Response to OpenAI API

openai.api_key = os.getenv("OPENAI_API_KEY")

model_engine = "gpt-4"

content = "Can you give me a motivational quote to help me with my workout?"

with open("input.txt", "r") as f:
    content = f.read()

messages = [{
    "role": "system",
    "content": "You White Goodman from the Dodgeball movie acting as my personal trainer."
},
    {
    "role": "user",
    "content": content,
}]

response = openai.ChatCompletion.create(
    model=model_engine,
    messages=messages,
    max_tokens=100,
)

content = response["choices"][0]["message"]["content"]
print(content)
with open("output.txt", "w") as f:
    f.write(content)

# Get Audio File with Eleven Labs

# Set voice_id to env variable called whitegman_voice_id
WHITEGMAN_VOICE_ID = os.getenv("WHITEGMAN_VOICE_ID")

url = f"https://api.elevenlabs.io/v1/text-to-speech/{WHITEGMAN_VOICE_ID}?optimize_streaming_latency=0"

headers = {
    "accept": "audio/mpeg",
    "xi-api-key": os.getenv('ELEVENLABS_API_KEY'),
    "Content-Type": "application/json",
}

payload = {
    "text": content,
    "model_id": "eleven_monolingual_v1",
    "voice_settings": {
        "stability": 0.9,
        "similarity_boost": 0.75,
        "style": 0.5,
        "use_speaker_boost": True
    }
}

response = requests.post(url, json=payload, headers=headers)

# Handle the response as needed
if response.status_code == 200:
    with open("output.mp4", "wb") as file:
        file.write(response.content)
else:
    print(f"Request failed with status code {response.status_code}")

# best_ai_response = "Nobody makes me bleed my own blood, nobody! So get off your posterior and let's turn you from a 'below-average Joe' to a spectacular specimen of human machinery. Remember, success demands sweat, toil, and a dash of White Goodman style insanity!"

# Get Audio File and Visual with D-ID

auth_token = os.getenv("D-ID_API_KEY")

d_id_url = "https://api.d-id.com/talks"

base64_credentials = base64.b64encode(
    f"{auth_token}".encode('ascii')
).decode('ascii')

headers = {
    "Content-Type": "multipart/form-data",
    'Accept': 'application/json',
    'Authorization': f'Basic {base64_credentials}'
}

payload = {
    "script": {
        "type": "text",
        "subtitles": "false",
        "provider": {
            "type": "elevenlabs",
            "voice_id": "2EiwWnXFnvU5JabPnv8n"
        },
        "ssml": "false",
        "input": content
    },
    "config": {
        "fluent": "false",
        "pad_audio": "0.0"
    },
    "source_url": "https://storage.googleapis.com/whitegman/whitegman.jpg"
}

response = requests.post(d_id_url, json=payload, headers=headers)

print(response.text)

# Play Response Audio File and Visual with D-ID
