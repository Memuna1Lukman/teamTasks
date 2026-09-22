from fastapi import APIRouter,HTTPException,status,Depends,Response
from .. import models,oauth,schemas
from ..database  import get_db
from sqlalchemy.orm import Session
from typing import List
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timezone


router = APIRouter(
    tags=["Tasks"],
    prefix="/tasks"
)


@router.post("/",response_model=schemas.AddTasks,status_code=status.HTTP_201_CREATED)
def create_tasks(task:schemas.CreateTasks,db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    task_dict = task.model_dump()
    # check if the assignee is available
    # users = db.query(models.Users).filter(models.Users.id == task.assigned_to_user_id).first()
    # if not users:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found")
    if task.assigned_to_user_id is not None:
        assignee = db.query(models.Users).filter(models.Users.id == task.assigned_to_user_id).first()
        if not assignee:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignee not found")
    add_tasks = models.Tasks(**task_dict,created_by_user_id = current_user.id)
    try:
        db.add(add_tasks)
        db.commit()
        db.refresh(add_tasks)

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="there was a conflict")
    return add_tasks


@router.get("/",response_model=List[schemas.AddTasks])
def get_all_tasks(db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # check if there are any task
    task = db.query(models.Task).filter(models.Tasks.deleted_at.is_(None)).all()
    return task


@router.get("/{id}",response_model=schemas.AddTasks)
def get_one_task(id:int,db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # does that particular task id exist?
    task = db.query(models.Tasks).filter(models.Tasks.id == id,models.Tasks.deleted_at.is_(None)).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found")
    return task


@router.patch("/{id}",response_model=schemas.AddTasks)
def update_one_task(task:schemas.CreateTasks,id:int,db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # make sure the task id exist
    task = db.query(models.Tasks).filter(models.Tasks.id == id, models.Tasks.deleted_at.is_(None)).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found")
    update_data  = task.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)
    try:
        db.commit()
        db.refresh(task)
        return task
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists or invalid update parameters."
        )


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_task(id:int,db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # check if the id task exist
    task = db.query(models.Tasks).filter(models.Tasks.id == id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found") 
    # only the created_by can delete a task
    
    if task.created_by_user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="Not allowd to delete")
    task.status = models.TaskStatus.DONE
    task.deleted_at = datetime.now(timezone.utc)
    db.commit()
    return

@router.patch("/{id}/complete", response_model=schemas.AddTasks)
def complete_task(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth.get_current_user)):
    task = db.query(models.Tasks).filter(models.Tasks.id == id, models.Tasks.deleted_at.is_(None)).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not Found")
    task.status = models.TaskStatus.DONE
    task.completed_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(task)
    return task