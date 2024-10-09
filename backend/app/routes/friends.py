# from app import app
from flask import request, jsonify, Blueprint
from app.model import Friend
from app import db

bp = Blueprint("friends", __name__, url_prefix="/api")


# Get all friends
@bp.route("/friends", methods=["GET"])
def get_friends():
    """Get all friends from the database"""
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


@bp.route("/friends", methods=["POST"])
def create_a_friend():
    """Create a friend and add to the database"""
    try:
        data = request.json

        required_fields = ["firstName", "lastName", "role", "description", "gender"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field, {field}"}), 400

        first_name = data.get("firstName")
        last_name = data.get("lastName")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")
        img_url = ""

        if gender.lower() == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={first_name+' '+last_name}"
        elif gender.lower() == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={first_name+' '+last_name}"
        else:
            img_url = None

        new_friend = Friend(
            first_name=first_name,
            last_name=last_name,
            role=role,
            description=description,
            gender=gender,
            img_url=img_url,
        )

        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@bp.route("/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    """Delete a friend from the db"""
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        db.session.delete(friend)
        db.session.commit()

        return jsonify({"message": "Friend deleted successfully!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@bp.route("/friends/<int:id>", methods=["PATCH"])
def update_friend_profile(id):
    """Update friend data in the db"""
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 404

        data = request.json

        friend.first_name = data.get("firstName", friend.first_name)
        friend.last_name = data.get("lastName", friend.last_name)
        friend.role = data.get("role", friend.role)
        friend.gender = data.get("gender", friend.gender)
        friend.description = data.get("description", friend.description)

        db.session.commit()

        return jsonify(friend.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    from app import app

    app.register_blueprint(bp)
    app.run(debug=True)
