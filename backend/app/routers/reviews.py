from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Review, Resource
from ..dependencies import get_current_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_review(resource_id: int, rating: int, comment: str = "",
               db: Session = Depends(get_db),
               user=Depends(get_current_user)):

    existing = db.query(Review).filter(
        Review.user_id == user.id,
        Review.resource_id == resource_id
    ).first()

    if existing:
        raise HTTPException(400, "You already reviewed this resource")

    review = Review(
        rating=rating,
        comment=comment,
        user_id=user.id,
        resource_id=resource_id
    )
    db.add(review)

    # Update average rating
    reviews = db.query(Review).filter(Review.resource_id == resource_id).all()
    avg = (sum(r.rating for r in reviews) + rating) / (len(reviews) + 1)

    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    resource.avg_rating = avg

    db.commit()
    return {"message": "Review added", "avg_rating": avg}
