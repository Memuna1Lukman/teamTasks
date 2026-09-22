from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm  import Session
from .. import models,utils,schemas,oauth
from ..database import get_db
from sqlalchemy.exc import IntegrityError
from typing import List


router = APIRouter(
    tags=["Users"],
    prefix = "/users"
)


@router.post("/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_users (user:schemas.UserCreate,db:Session = Depends(get_db)):
    new_user = user.model_dump()  # make the user a dict
    new_user["password"] = utils.get_password_hash()
    new_user_obj = models.User(**new_user)
    try:
        db.add(new_user_obj)
        db.commit()
        db.refresh(new_user_obj)
    except IntegrityError: # if user alrady exist 
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exist"
        )
    return new_user_obj


@router.get("/",response_model=List[schemas.UserOut])
def get_all_users(db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # did you add any users?
    users = db.query(models.Users).all()
    return users

@router.get("/{id}",response_model=schemas.UserOut)
def get_one_user(id:int,db:Session = Depends(get_db),current_user:models.Users = Depends(oauth.get_current_user)):
    # does the user exist?
    user = db.query(models.Users).filter(models.Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not Found")
    return user

