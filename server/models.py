from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv('MONGODB_URI'))
db = client['quantica'] 

class User:
    @staticmethod
    def create_user(data):
        user_data = {
            "firstname": data['firstname'],
            "lastname": data['lastname'],
            "username": data['username'],
            "email": data['email'],
            "password": data['password'],
            "bio": data.get('bio', ''),
            "image": data.get('image', '')
        }
        db.users.insert_one(user_data)
        return user_data

    @staticmethod
    def validate_user(username, password):
        user = db.users.find_one({"username": username, "password": password}) 
        return user
    
    @staticmethod
    def find_by_username(username):
        return db.users.find_one({"username": username})
    
    @staticmethod
    def find_username_profile(username):
        return db.users.find_one({"username": username})
    
    @staticmethod
    def save_chat_history(username, chat_history):
        db.users.update_one(
            {"username": username},
            {"$set": {"chat_history": chat_history}}
        )

    @staticmethod
    def get_chat_history(username):
        user = db.users.find_one({"username": username})
        return user.get("chat_history", []) if user else []
    
    @staticmethod
    def update_user_settings(username, data):
        update_data = {
            "firstname": data.get('firstname'),
            "lastname": data.get('lastname'),
            "email": data.get('email'),
            "bio": data.get('bio', ''),
            "image": data.get('image', '')
        }
        db.users.update_one(
            {"username": username},
            {"$set": update_data}
        )
        return db.users.find_one({"username": username})
