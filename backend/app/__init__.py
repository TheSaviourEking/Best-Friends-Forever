from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config

import os

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
# db = SQLAlchemy(app)
db.init_app(app)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")


# Serve Static files from dist folder
# @app.route("/", defaults={"filename": ""})
# @app.route("/<path:filename>")
# def index(filename):
#     if not filename:
#         filename = "index.html"
#     return send_from_directory(dist_folder, filename)

from .routes import friends

app.register_blueprint(friends.bp)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path.startswith("api/"):
        # Here you would handle API routes or return an appropriate response
        pass

    if path != "" and os.path.exists(os.path.join(dist_folder, path)):
        return send_from_directory(dist_folder, path)
    else:
        return send_from_directory(dist_folder, "index.html")


# api routes


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
