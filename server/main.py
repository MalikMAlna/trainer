import os
from dotenv import load_dotenv
import openai
import sounddevice as sd
import numpy as np
import wavio
import queue
import requests
import base64
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get("/api/get_talk_id")
async def read_talk_id():
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
        "content": "You White Goodman from the Dodgeball movie acting as my personal trainer. Keep responses under 100 tokens."
    },
        {
        "role": "user",
        "content": content,
    }]

    response = openai.ChatCompletion.create(
        model=model_engine,
        messages=messages,
        max_tokens=150,
    )

    content = response["choices"][0]["message"]["content"]
    print(content)
    with open("output.txt", "w") as f:
        f.write(content)

    # best_ai_response = "Nobody makes me bleed my own blood, nobody! So get off your posterior and let's turn you from a 'below-average Joe' to a spectacular specimen of human machinery. Remember, success demands sweat, toil, and a dash of White Goodman style insanity!"

    # Get Audio File and Visual with D-ID

    auth_token = os.getenv("D-ID_API_KEY")

    white_gman_voice_id = os.getenv("WHITEGMAN_VOICE_ID")

    d_id_url = "https://api.d-id.com/talks"

    base64_credentials = base64.b64encode(
        f"{auth_token}".encode('ascii')
    ).decode('ascii')

    headers = {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Basic {base64_credentials}'
    }

    payload = {
        "script": {
            "type": "text",
            "subtitles": "false",
            "provider": {
                "type": "elevenlabs",
                "voice_id": white_gman_voice_id
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

    print(response)

    talk_id = response.json()["id"]

    talk_url = f"https://api.d-id.com/talks/{talk_id}/"

    headers = {
        "accept": "application/json",
        'Authorization': f'Basic {base64_credentials}'
    }

    response = requests.get(talk_url, headers=headers)

    while response.json().get("result_url") is None:
        print("Waiting for D-ID to process audio...")
        print(response.json())
        response = requests.get(talk_url, headers=headers)
        time.sleep(3)

    result_url = response.json().get("result_url")

    return {"result_url": result_url}
