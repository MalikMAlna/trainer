import os
from dotenv import load_dotenv
import openai

load_dotenv()

# Capture Audio from Microphone


# Convert Audio to Text with Whisper API

# Send Text Response to OpenAI API

openai.api_key = os.getenv("OPENAI_API_KEY")

model_engine = "gpt-4"

content = "Can you give me a motivational quote to help me with my workout?"

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
