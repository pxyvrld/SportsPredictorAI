from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import models
import schemas
from auth import get_password_hash, verify_password, create_access_token

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token_for_user(user: models.User):
    access_token_expires = timedelta(minutes=30)
    return create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

def get_user_predictions(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Prediction).filter(
        models.Prediction.user_id == user_id
    ).offset(skip).limit(limit).all()

def create_prediction(db: Session, prediction: schemas.PredictionCreate, user_id: int):
    db_prediction = models.Prediction(**prediction.dict(), user_id=user_id)
    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)
    return db_prediction

def create_expert_opinion(
    db: Session, opinion: schemas.ExpertOpinionCreate, prediction_id: int
):
    db_opinion = models.ExpertOpinion(**opinion.dict(), prediction_id=prediction_id)
    db.add(db_opinion)
    db.commit()
    db.refresh(db_opinion)
    return db_opinion

def update_user_subscription(db: Session, user_id: int, subscription_days: int):
    user = get_user(db, user_id)
    if not user:
        return None
    
    user.is_subscribed = True
    user.subscription_end_date = datetime.utcnow() + timedelta(days=subscription_days)
    db.commit()
    db.refresh(user)
    return user

def increment_predictions_used(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        return None
    
    user.predictions_used += 1
    db.commit()
    db.refresh(user)
    return user 