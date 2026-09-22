from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, UniqueConstraint,Boolean,Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum

class TaskStatus(str, Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    REVIEW = "REVIEW"
    DONE = "DONE"
 
 
class TaskPriority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    URGENT = "URGENT"


class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True, default=None)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # relationships

    assigned_tasks = relationship("Task", foreign_keys="[Task.assigned_to_user_id]", back_populates="assigned_to")
    created_tasks = relationship("Task", foreign_keys="[Task.created_by_user_id]", back_populates="created_by")
    comments = relationship("Comment", back_populates="author", cascade="all, delete-orphan")
    attachments = relationship("Attachment", back_populates="uploaded_by", cascade="all, delete-orphan")


class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title =  Column(String,nullable=False)
    description = Column(String,nullable=True,default=None)
    status = Column(Enum(TaskStatus), nullable=False, default=TaskStatus.TODO,index=True)
    priority = Column(Enum(TaskPriority),nullable=False, default=TaskPriority.MEDIUM)
    assigned_to_user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    created_by_user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    due_date = Column(DateTime(timezone=True), nullable=True, default=None)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True, default=None)
    deleted_at = Column(DateTime(timezone=True), nullable=True, default=None)

    # relationships
    assigned_to = relationship("Users",back_populates="assigned_tasks",foreign_keys=[assigned_to_user_id])
    created_by = relationship("Users",back_populates="created_tasks",foreign_keys=[created_by_user_id]) 
    comments = relationship("Comments",back_populates="task",cascade="all,delete-orphan")
    attachments = relationship("Attachment", back_populates="task", cascade="all, delete-orphan")


class Comments(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    task_id = Column(Integer,ForeignKey("tasks.id",ondelete="CASCADE"),nullable=False)
    author_user_id = Column(Integer,ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    body = Column(Text,nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
# relationships
    task = relationship("Tasks",back_populates="comments")
    author = relationship("Users",back_populates="comments")

class Attachments(Base):
    __tablename__ = "attachments"

    id = Column(Integer, primary_key=True)
    task_id = Column(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    file_key = Column(String, nullable=False)        # S3/R2 object key — never store a raw public URL
    file_name = Column(String, nullable=False)        # original filename for display
    content_type = Column(String, nullable=True)
    size_bytes = Column(Integer, nullable=True)
    uploaded_by_user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
 
    # Relationships
    task = relationship("Task", back_populates="attachments")
    uploaded_by = relationship("User", back_populates="attachments")      