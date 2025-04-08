from fastapi import FastAPI
from app.api import auth, tasks
from app.db.session import engine
from app.db import base

# uvicorn app.main:app --reload

# Create DB Tables
base.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
