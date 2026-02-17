from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from .security import decode_token
from .models import User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(authorization: str = Header(None),
                     db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token")

    token = authorization.split(" ")[1]
    user_id = decode_token(token)
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")

    return user
