from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User, Resource

router = APIRouter(prefix="/admin", tags=["Admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/stats")
def stats(db: Session = Depends(get_db)):
    return {
        "total_users": db.query(User).count(),
        "total_resources": db.query(Resource).count()
    }
