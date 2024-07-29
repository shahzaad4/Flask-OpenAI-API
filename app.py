from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    user_message = request.json.get('message')
    if user_message:
        # Call OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_message,
            max_tokens=150
        )
        ai_message = response.choices[0].text.strip()
        return jsonify({'status': 'success', 'message': ai_message})
    return jsonify({'status': 'error', 'message': 'No message provided'})

@app.route('/get_messages', methods=['GET'])
def get_messages():
    # This is just a placeholder since we're not storing messages here
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)