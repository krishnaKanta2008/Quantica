from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler 
from utils.Model.model import get_math_solution
from models import User

auth_routes = Blueprint('auth', __name__)
model_routes = Blueprint('model', __name__)

@auth_routes.route('/signup', methods=['POST'])
def signup():
    return signup_handler()

@auth_routes.route('/signin', methods=['POST'])
def signin():
    return signin_handler()

@model_routes.route('/query', methods=['POST'])
def math_solution():
    data = request.json
    question = data.get('question')
    username = data.get('username')  # Assume username is sent with the request
    if not question or not username:
        return jsonify({"error": "Question and username are required"}), 400
    
    solution = get_math_solution(question, username)
    return jsonify({"solution": solution}), 200

@model_routes.route('/chat_history', methods=['GET'])
def get_chat_history():
    username = request.args.get('username')
    if not username:
        return jsonify({"error": "Username is required"}), 400
    
    chat_history = User.get_chat_history(username)
    return jsonify({"chat_history": chat_history}), 200
