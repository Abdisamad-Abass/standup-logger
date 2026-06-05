from datetime import datetime
from extensions import db

# ADDED: USER MODEL FOR LOGIN + ROLES
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    # CHANGED: password now hashed
    password = db.Column(db.String(255), nullable=False)

    role = db.Column(db.String(20), default="member")  # admin | member

    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# EXISTING MODEL (UNCHANGED)
class StandupPost(db.Model):
    __tablename__ = "standup_posts"

    id = db.Column(db.Integer, primary_key=True)

    author = db.Column(db.String(100), nullable=False)
    yesterday = db.Column(db.Text, nullable=False)
    today = db.Column(db.Text, nullable=False)
    blockers = db.Column(db.Text, nullable=True)

    has_blocker = db.Column(db.Boolean, default=False)
    file = db.Column(db.String(255), nullable=True)
    file_name = db.Column(db.String(255), nullable=True)

    timestamp = db.Column(db.DateTime, default=datetime.utcnow)