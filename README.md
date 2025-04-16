# Your Fucking Friend Chat App

A savage chatbot built with Flask and Google's Gemini API.

## Deployment Instructions for Replit

### Setting up on Replit:

1. Create a [Replit](https://replit.com/) account
2. Click "Create Repl" and select "Python"
3. Upload all project files or import directly from GitHub
4. In the Secrets panel (lock icon 🔒), add:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API key
5. Click "Run" to start your app
6. Share the generated URL with anyone to let them chat with your savage friend!

## Getting a Gemini API Key

To get your Gemini API key:

1. Visit [Google AI Studio](https://makersuite.google.com/) and sign in
2. Click on "Get API key" in the top right
3. Create a new API key or use an existing one
4. Copy the API key and add it to your Replit Secrets

## Features

- Dark-themed modern chat interface
- Mobile-friendly design
- Savage, sarcastic AI personality
- No setup required for users

## Local Development

1. Clone this repository
2. Create a `.env` file with your Gemini API key: `GEMINI_API_KEY=your_key_here`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the app: `python app.py` 