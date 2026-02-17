from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User
from ..security import create_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(name:str,email:str,password:str,college:str,branch:str,semester:str,
             db:Session=Depends(get_db)):
    if db.query(User).filter(User.email==email).first():
        raise HTTPException(400,"Email exists")

    user=User(name=name,email=email,password=password,
              college=college,branch=branch,semester=semester)
    db.add(user)
    db.commit()
    return {"msg":"Registered"}

@router.post("/login")
def login(email:str,password:str,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.email==email,password==password).first()
    if not user:
        raise HTTPException(401,"Invalid credentials")
    token=create_token(user.id)
    return {"access_token":token}
