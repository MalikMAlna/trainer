# trAIner - AI Virtual Personal Trainer App

trAIner is an innovative AI-powered virtual personal trainer application that provides users with an interactive and motivating workout experience. With trAIner, users can engage in natural language conversations, receive personalized workout instructions, and enjoy an immersive training session with an AI-generated avatar.

## Features

- Conversational Interaction: trAIner utilizes advanced AI models to engage in natural language conversations with users, offering guidance, motivation, and exercise instructions.

- Generative Text-to-Speech: The app employs 11 Labs' powerful generative text-to-speech technology to give the AI avatar a lifelike and dynamic voice.

- Interactive Avatar: trAIner employs D-ID's interactive avatar technology, allowing users to interact with a lifelike virtual personal trainer who demonstrates exercises and provides feedback.

- Speech-to-Text Conversion: The application uses OpenAI's speech-to-text capabilities to convert user voice input into text, enabling seamless communication with the AI avatar.

## Tech Stack

- Frontend: The frontend of the trAIner app is built using Next.js and Tailwind CSS, offering a responsive and engaging user interface.

- Backend: The FastAPI Python backend powers the core functionalities of the app, integrating various AI services:

  - OpenAI: The backend utilizes OpenAI for speech-to-text conversion and for generating text-based responses.

  - ElevenLabs: Generative text-to-speech technology from ElevenLabs is employed to give the AI avatar a natural and expressive voice.

  - D-ID: The interactive talking avatar is created using D-ID's technology, providing users with a visually appealing and engaging experience.

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/trAIner.git`
2. Navigate to the project directory: `cd trAIner`

## Frontend

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the app in your browser at `http://localhost:3000`

## Backend

1. Navigate to the server directory: `cd server`
2. Install Python dependencies `pip install -r requirements.txt`
3. Set up environment variables by creating a `.env` file with the following:

```
OPENAI_API_KEY=your_openai_api_key
D-ID_API_KEY=your_did_api_key
WHITEGMAN_VOICE_ID=your_whitegman_voice_id
```

4. Run the FastAPI server: `uvicorn main:app --reload`

## Usage

1. Access the trAIner app in your browser.
2. Start a conversation with the AI avatar by speaking your requests after pressing the record button.
3. Follow the avatar's instructions for workouts, exercises, and motivation.
4. Interact with the lifelike avatar and engage in a dynamic workout session.
