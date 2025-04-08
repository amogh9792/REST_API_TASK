from fastapi import FastAPI
from app.api import auth, tasks
from app.db.session import engine
from app.db import base
from fastapi.middleware.cors import CORSMiddleware

# uvicorn app.main:app --reload

# Create DB Tables
base.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for all origins (less secure)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
