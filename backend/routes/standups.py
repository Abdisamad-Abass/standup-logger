from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
from models import db, StandupPost
from flask import redirect
from urllib.parse import urlparse
from utils.stats import generate_stats
import os
import cloudinary.uploader
import requests
from io import BytesIO

standups_bp = Blueprint("standups", __name__)

# Allowed upload file types
ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "gif",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "txt",
    "xml"
}

# Check if uploaded file type is allowed
def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )

# GET ALL STANDUPS
@standups_bp.route("/standups/", methods=["GET"])
def get_standups():

    posts = (
        StandupPost.query
        .order_by(StandupPost.timestamp.desc())
        .all()
    )

    return jsonify([
        {
            "id": p.id,
            "author": p.author,
            "yesterday": p.yesterday,
            "today": p.today,
            "blockers": p.blockers,
            "has_blocker": p.has_blocker,
            "file": p.file,
            "file_name": p.file_name,
            "timestamp": p.timestamp.isoformat()
        }
        for p in posts
    ])

# CREATE NEW STANDUP
@standups_bp.route("/standups/", methods=["POST"])
def create_standup():

    data = request.form

    # Validate required fields
    if not data.get("author"):
        return jsonify({
            "error": "Author is required"
        }), 400

    if not data.get("yesterday"):
        return jsonify({
            "error": "Yesterday is required"
        }), 400

    if not data.get("today"):
        return jsonify({
            "error": "Today is required"
        }), 400

    file = request.files.get("file")
    
    file_url = None
    original_filename = None

    # Upload file to Cloudinary if provided
    if file and file.filename:

        # Validate file type
        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type"}), 400
        
        # Secure filenam
        original_filename = secure_filename(file.filename)

        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            file,
            folder="standups_files",
            resource_type="raw",
            use_filename=True,
            unique_filename=False
        )

        file_url = upload_result.get("secure_url")

    # Create database record
    post = StandupPost(
        author=data.get("author"),
        yesterday=data.get("yesterday"),
        today=data.get("today"),
        blockers=data.get("blockers"),
        has_blocker=data.get(
            "has_blocker"
        ) == "true",
        file=file_url,
        file_name=original_filename
    )

    db.session.add(post)
    db.session.commit()

    return jsonify({
        "message": "created"
    }), 201

# STANDUP STATS
@standups_bp.route(
    "/standups/stats/",
    methods=["GET"]
)
def stats():

    return jsonify(
        generate_stats()
    )

# DOWNLOAD FILE
@standups_bp.route("/standups/download/<int:post_id>", methods=["GET"])
def download_file(post_id):
    
    post = StandupPost.query.get(post_id)

    if not post or not post.file:
        return jsonify({"error": "File not found"}), 404

    # Fetch the file from Cloudinary
    response = requests.get(post.file)
    
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch file"}), 404
    
    # Get the original filename from the post
    original_filename = post.file_name if hasattr(post, 'file_name') else "download"
    
     # Prepare file for download
    file_data = BytesIO(response.content)
    
    # Send the file directly with proper headers
    return send_file(
        file_data,
        mimetype=response.headers.get('content-type', 'application/octet-stream'),
        as_attachment=True,
        download_name=original_filename
    )