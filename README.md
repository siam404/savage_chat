# Your Fucking Friend Chat App

A savage chatbot built with Flask and Google's Gemini API.

## Deployment Instructions for Render.com

Follow these steps to deploy this application on Render.com:

1. Create a Render.com account at https://render.com/
2. Connect your GitHub account to Render
3. Push this project to your GitHub repository
4. On Render dashboard, click "New" and select "Web Service"
5. Connect your repository
6. Configure the following settings:
   - **Name**: Choose a name for your app
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Add Environment Variable**: `GEMINI_API_KEY=your_actual_api_key_here`
7. Click "Create Web Service"

## Getting a Gemini API Key

To get your Gemini API key:

1. Visit https://makersuite.google.com/ and sign in
2. Click on "Get API key" in the top right
3. Create a new API key or use an existing one
4. Copy the API key and add it to your Render.com environment variables

## Local Development

1. Clone this repository
2. Create a `.env` file with your Gemini API key: `GEMINI_API_KEY=your_key_here`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the app: `python app.py` 