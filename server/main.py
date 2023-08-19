import os
from dotenv import load_dotenv
import openai
import sounddevice as sd
import numpy as np
import wavio
import queue


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
    messages=messages
)

print(response["choices"][0]["message"]["content"])


best_ai_response = "Nobody makes me bleed my own blood, nobody! So get off your posterior and let's turn you from a 'below-average Joe' to a spectacular specimen of human machinery. Remember, success demands sweat, toil, and a dash of White Goodman style insanity!"

# Send Response Text to ElevenLabs API

# Receive Response Audio File from ElevenLabs API

# Send Audio File and White Gman Image to D-ID API

# Play Response Audio File and Visual with D-ID
