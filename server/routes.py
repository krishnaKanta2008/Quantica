from flask import Blueprint, request, jsonify
from utils.Auth.auth import signup_handler, signin_handler 
from utils.Model.model import get_math_solution
from models import User
import cloudinary
import cloudinary.uploader
import os

auth_routes = Blueprint('auth', __name__)
model_routes = Blueprint('model', __name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

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

@auth_routes.route('/profile/<username>', methods=['GET'])
def get_user(username):
    user = User.find_username_profile(username)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_data = {
        "username": user['username'],
        "firstname": user['firstname'],
        "lastname": user['lastname'],
        "email": user['email'],
        "bio": user.get('bio', ''),
        "image": user.get('image', '')
    }
    return jsonify({"user": user_data}), 200

@auth_routes.route('/profile/<username>', methods=['PUT'])
def update_user(username):
    data = request.json
    updated_user = User.update_user_settings(username, data)
    if not updated_user:
        return jsonify({"error": "User not found"}), 404
    
    user_data = {
        "username": updated_user['username'],
        "firstname": updated_user['firstname'],
        "lastname": updated_user['lastname'],
        "email": updated_user['email'],
        "bio": updated_user.get('bio', ''),
        "image": updated_user.get('image', '')
    }
    return jsonify({"user": user_data}), 200

@auth_routes.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        upload_result = cloudinary.uploader.upload(file)
        image_url = upload_result.get('secure_url')
        return jsonify({"imageUrl": image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
