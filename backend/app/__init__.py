from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db = SQLAlchemy(app)

from .routes import friends

app.register_blueprint(friends.bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
