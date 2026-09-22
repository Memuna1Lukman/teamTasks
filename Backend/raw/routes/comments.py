from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm  import Session
from .. import models,utils,schemas,oauth
from ..database import get_db
from sqlalchemy.exc import IntegrityError
from typing import List






router = APIRouter(tags=["Comments"], prefix="/tasks/{task_id}/comments")


@router.get("/",response_model=List[schemas.CommentOut])
def get_comments(task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth.get_current_user)):
    
    query_task = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not query_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"The task is not found")
    comments = (
        db.query(models.Comments)
        .filter(models.Comments.task_id == task_id)
        .order_by(models.Comments.created_at.asc())
        .all()
    )
    return comments


@router.post("/",response_model=schemas.CommentOut, status_code=status.HTTP_201_CREATED)
def create_comment(comment: schemas.CommentCreate,task_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth.get_current_user)):
    
    query_task = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not query_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f"The task is not found")
    comments = comment.model_dump()
    new_comment = models.Comment(
        task_id=task_id,
        author_user_id=current_user.id,
        body=comment.body,
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment