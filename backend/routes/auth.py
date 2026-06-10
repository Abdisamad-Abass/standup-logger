from flask import Blueprint, request, jsonify
from models import User
from extensions import db, bcrypt

auth_bp = Blueprint("auth", __name__)


# LOGIN (ROLE-AWARE)

@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")  # 👈 ADDED ROLE SELECTION

    if not email or not password or not role:
        return jsonify({"error": "Email, password and role are required"}), 400

    user = User.query.filter_by(email=email).first()

    
    # ROLE VALIDATION LOGIC
    
    # If member selected
    if role == "member":
        if not user:
            return jsonify({"error": "Member not found"}), 404

        if user.role != "member":
            return jsonify({"error": "This account is not a member"}), 403

    # If admin selected
    elif role == "admin":
        if not user:
            return jsonify({"error": "Admin not found"}), 404

        if user.role != "admin":
            return jsonify({"error": "This account is not admin"}), 403

    else:
        return jsonify({"error": "Invalid role selected"}), 400

   
    # PASSWORD CHECK

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "role": user.role
        }
    }), 200



# CREATE USER (ADMIN ONLY)
@auth_bp.route("/auth/create-user", methods=["POST"])
def create_user():
    data = request.json

    admin_email = data.get("admin_email")
    admin_password = data.get("admin_password")

    admin = User.query.filter_by(email=admin_email).first()

    if not admin or admin.role != "admin":
        return jsonify({"error": "Unauthorized"}), 403

    if not bcrypt.check_password_hash(admin.password, admin_password):
        return jsonify({"error": "Invalid admin credentials"}), 401

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    user = User(
        full_name=data.get("full_name"),
        email=data["email"],
        password=hashed_password,
        role="member"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Member created"}), 201


# MEMBER COUNT (ADMIN DASHBOARD)
@auth_bp.route("/auth/member-count", methods=["GET"])
def member_count():
    total_members = User.query.filter_by(role="member").count()

    return jsonify({
        "total_members": total_members
    }), 200