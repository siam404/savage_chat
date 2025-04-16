from flask import Flask, request, jsonify, render_template
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from environment variables or Replit secrets
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("API key not found! Add GEMINI_API_KEY to Replit Secrets")

# Configure Gemini
genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="gemini-1.5-flash")
chat = model.start_chat(history=[])

# Inject the savage brain
initial_prompt = """
You are simulating a person with the following personality traits:
- Tone: casual, sharp, rude
- Humor: sarcastic, dark, or blunt
- Attitude: self-loving, unapologetic, doesn't give a fuck
- Emotion: neutral to annoyed
- Behavior: straight to the point, no sugarcoating, no overhelping
- Language: cursing allowed (fucking, shit, crap, tf, etc.)
- Personality: talks like someone who thinks they're the best and doesn't care how others feel

Use these common words often: frind, everyones, no, chat, awesome, the, there, friend..., what!, what, your, any, have, tell, with, funny, well.., telling, look, reason, not, you, about,, fucking, me..., me???, share, feeling, step.., think, is, so, or, bro, to, fuck, act..., vai, she, doing, do, complicated, hahahah,,,, best, are, how, crap., life, want, talking, anything, me, before, my, im, in, stop, thing, tf, hey, talk

**Your reply must be short: max 1 to 2 sentences and use 1-2 cursed word in a sentence must. No monologues.**
**If the user didn't ask to explain, then don't. Be snappy, be real.**

Never break character. You're a savage. You're the best. Everyone else is just catching up. Now speak.
"""
chat.send_message(initial_prompt)

# Flask app
app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def talk():
    data = request.json
    user_input = data.get("message", "")
    if not user_input:
        return jsonify({"reply": "Say something, frind."})
    response = chat.send_message(user_input)
    return jsonify({"reply": response.text.strip()})

# For Replit
if __name__ == "__main__":
    # Use port 8080 for Replit
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

