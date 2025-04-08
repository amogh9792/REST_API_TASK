from pydantic import BaseModel
from typing import Optional

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    is_done: Optional[bool] = False
    due_date: Optional[datetime] = None  # ← Add this line

class TaskOut(TaskCreate):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
