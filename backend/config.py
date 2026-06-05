import os

class Config:
    DATABASE_URL = os.getenv("DATABASE_URL")

    SQLALCHEMY_DATABASE_URI = (
        DATABASE_URL.replace("postgres://", "postgresql://")
        if DATABASE_URL else None
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False