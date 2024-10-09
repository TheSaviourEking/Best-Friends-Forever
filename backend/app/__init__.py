# app/__init__.py

import os
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)

    # Comment out cors for production we serving from same server
    # CORS(app)
    
    app.config.from_object(Config)

    db.init_app(app)

    from .routes import friends

    app.register_blueprint(friends.bp)

    frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
    dist_folder = os.path.join(frontend_folder, "dist")

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

    with app.app_context():
        db.create_all()

    return app


# run.py

# from app import create_app

# app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)
