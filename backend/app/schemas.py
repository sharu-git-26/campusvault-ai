from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    college: str
    branch: str
    semester: str

class ResourceCreate(BaseModel):
    title: str
    subject: str
    description: Optional[str]
    tags: Optional[str]
    privacy: str  # Public / Private

class ReviewCreate(BaseModel):
    rating: int
    comment: Optional[str]
    resource_id: int
