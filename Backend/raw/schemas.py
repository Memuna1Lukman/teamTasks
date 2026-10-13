from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import TaskPriority, TaskStatus


class TokenData(BaseModel):
    id: Optional[int]= None


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id:  Optional[int] = None
    email : str
    full_name : str
    avatar_url: str | None = None
    created_at: Optional[datetime] = None
class UserCreate(BaseModel):
    email: EmailStr
    full_name : str
    avatar_url : str | None = None
    password: str


    #===================SCHEMA FOT TASKS===================
class CreateTasks(BaseModel):
    title : str
    description: Optional[str] = None 
    assigned_to_user_id: int | None = None
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: datetime | None = None


class UpdateTask(BaseModel):
    title: str | None = None
    description: str | None = None
    assigned_to_user_id: int | None = None
    status: TaskStatus | None = None
    priority: TaskPriority | None = None
    due_date: datetime | None = None


class AddTasks(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id : Optional[int] = None
    title : str
    description: Optional[str] = None 
    assigned_to_user_id: int | None = None
    created_by_user_id :Optional[int] = None
    status: TaskStatus
    priority: TaskPriority
    due_date: Optional[datetime] = None
    created_at : Optional[datetime] = None
    updated_at : Optional[datetime] = None
class BoardOut(BaseModel):
    todo: List[AddTasks]
    in_progress: List[AddTasks]
    review: List[AddTasks]
    done: List[AddTasks]


class CommentCreate(BaseModel):
    body: str
    task_id: int | None = None

class CommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    body: str
    created_at: datetime
    author: UserOut   # nested, relies on the relationship being loaded
