from flask import Flask
import CORS

app = Flask(__name__)

cors = CORS(app)

@app.route('/')
def hello():
    return "hello world"