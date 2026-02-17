from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    college = Column(String)
    branch = Column(String)
    semester = Column(String)
    reputation = Column(Integer, default=0)

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subject = Column(String)
    description = Column(Text)
    tags = Column(String)
    privacy = Column(String)  # Public / Private
    college = Column(String)
    file_path = Column(String)
    uploader_id = Column(Integer, ForeignKey("users.id"))
    avg_rating = Column(Float, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    comment = Column(Text)
    user_id = Column(Integer)
    resource_id = Column(Integer)
