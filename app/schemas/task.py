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

# schemas/task.py
class TaskOut(BaseModel):
    id: int
    title: str
    description: str
    status: str
    due_date: Optional[datetime]
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


    class Config:
        orm_mode = True
