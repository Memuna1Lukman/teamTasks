from pydantic import BaseModel,EmailStr
from typing import Optional,List
from datetime import datetime


class TokenData(BaseModel):
    id: Optional[int]= None


class UserOut(BaseModel):
    id:  Optional[int] = None
    email : str
    full_name : str
    avatar_url: str | None = None
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str
    full_name : str
    avatar_url : str
    password: str


    #===================SCHEMA FOT TASKS===================
class CreateTasks(BaseModel):
    title : str
    description: Optional[str] = None 
    assigned_to_user_id:int


class AddTasks(BaseModel):
    id : Optional[int] = None
    title : str
    description: Optional[str] = None 
    assigned_to_user_id:int
    created_by_user_id :Optional[int] = None
    status: str
    due_date: Optional[datetime] = None
    created_at : Optional[datetime] = None
    updated_at : Optional[datetime] = None
    class Config:
        from_attributes = True


class BoardOut(BaseModel):
    todo: List[AddTasks]
    in_progress: List[AddTasks]
    review: List[AddTasks]
    done: List[AddTasks]


class CommentCreate(BaseModel):
    body: str
    task_id: int

class CommentOut(BaseModel):
    id: int
    body: str
    created_at: datetime
    author: UserOut   # nested, relies on the relationship being loaded

    class Config:
        from_attributes = True