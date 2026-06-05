import os
import cloudinary
import cloudinary.uploader
import cloudinary.api

from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
if os.path.exists(".env"):
    load_dotenv()

from config import Config
from extensions import db, bcrypt
from models import User
from routes.standups import standups_bp
from routes.auth import auth_bp  

# APP INITIALIZATION
app = Flask(__name__)
app.config.from_object(Config)

# Enable Cross-Origin Resource Sharing for frontend access
CORS(app)

# INIT EXTENSIONS
db.init_app(app)
bcrypt.init_app(app)

# REGISTER BLUEPRINTS 
app.register_blueprint(standups_bp)
app.register_blueprint(auth_bp)   

# CLOUDINARY CONFIG
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

# DATABASE SETUP
with app.app_context():
    db.create_all()

    # AUTO CREATE ADMIN USER
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")
    admin_name = os.getenv("ADMIN_NAME")

     # Check if admin already exists
    existing_admin = User.query.filter_by(email=admin_email).first()

    if not existing_admin:
        # Hash admin password before saving
        hashed = bcrypt.generate_password_hash(admin_password).decode("utf-8")

        # Create admin user
        admin = User(
            full_name=admin_name,
            email=admin_email,
            password=hashed,
            role="admin"
        )

        db.session.add(admin)
        db.session.commit()

        print("Admin created from ENV")

# HEALTH CHECK ROUTE
@app.route("/")
def home():
    return {"message": "Standup API Running with Auth"}

# RUN SERVER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)