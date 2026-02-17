from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, resources, reviews, users, admin

app = FastAPI(title="CampusVault AI - PG Level")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(resources.router)
app.include_router(reviews.router)
app.include_router(users.router)
app.include_router(admin.router)

@app.get("/")
def root():
    return {"message": "CampusVault AI Backend Running"}
