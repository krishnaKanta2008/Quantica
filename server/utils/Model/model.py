import os
import google.generativeai as genai
from dotenv import load_dotenv
from models import User

load_dotenv()

# Configure the API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Define model configuration
generation_config = {
    "temperature": 0.5,  # Adjust randomness
    "top_p": 0.95,
    "top_k": 50,
    "max_output_tokens": 500,  # Limit the response length
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Predefined prompt to guide the chatbot's behavior
pre_prompt = """
You are a mathematics expert. You will only answer mathematics-related questions, providing step-by-step solutions for all problems. 
If the user asks something not related to mathematics, kindly remind them that you are specialized in math. 
Please provide solutions with detailed explanations in the following format: 
1. Restate the problem
2. Break down each step of the solution clearly
3. Conclude with the final answer.
"""

# Start chat session with initial history
chat_session = model.start_chat(
    history=[
        {
            "role": "user",
            "parts": [
                "What is this model about?"
            ],
        },
        {
            "role": "model",
            "parts": [
                "Welcome to Quantica. this model is about solving maths problem"
            ],
        },
    ]
)

def get_math_solution(question, username):
    try:
        response = chat_session.send_message(question)
        
        # Convert chat session history to a serializable format
        serializable_history = []
        for part in chat_session.history:
            role = part.role if hasattr(part, 'role') else 'unknown'
            message = part.parts[0].text if hasattr(part, 'parts') and part.parts else 'No content available'
            serializable_history.append({
                "role": role,
                "message": message
            })
        
        # Save the question and response to chat history
        User.save_chat_history(username, serializable_history)
        return response.text
    except Exception as e:
        print(f"Error in get_math_solution: {e}")
        return "An error occurred while processing your request."
