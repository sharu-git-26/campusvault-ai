from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Resource
from ..dependencies import get_current_user
from ..services import semantic_search
import shutil, os

router = APIRouter(prefix="/resources", tags=["Resources"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload")
def upload_resource(
    title: str = Form(...),
    subject: str = Form(...),
    description: str = Form(""),
    tags: str = Form(""),
    privacy: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resource = Resource(
        title=title,
        subject=subject,
        description=description,
        tags=tags,
        privacy=privacy,
        college=user.college,
        file_path=file_path,
        uploader_id=user.id
    )
    db.add(resource)
    db.commit()
    return {"message": "Resource uploaded successfully"}

@router.get("/")
def get_resources(db: Session = Depends(get_db),
                  user=Depends(get_current_user)):
    resources = db.query(Resource).all()

    # Access Control (PG Level Feature)
    visible = []
    for r in resources:
        if r.privacy == "Public" or r.college == user.college:
            visible.append(r)
    return visible

@router.get("/search")
def search_resources(q: str,
                     db: Session = Depends(get_db),
                     user=Depends(get_current_user)):
    resources = db.query(Resource).all()
    ranked = semantic_search(q, resources)
    filtered = [resources[i] for i in ranked
                if resources[i].privacy == "Public" or resources[i].college == user.college]
    return filtered
