from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from models import SportType

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_subscribed: bool
    subscription_end_date: Optional[datetime]
    predictions_used: int

    class Config:
        from_attributes = True

class ExpertOpinionBase(BaseModel):
    expert_name: str
    opinion: str
    confidence_score: float

class ExpertOpinionCreate(ExpertOpinionBase):
    pass

class ExpertOpinion(ExpertOpinionBase):
    id: int
    prediction_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class PredictionBase(BaseModel):
    sport_type: SportType
    home_team: str
    away_team: str
    match_date: datetime

class PredictionCreate(PredictionBase):
    pass

class Prediction(PredictionBase):
    id: int
    user_id: int
    predicted_home_score: int
    predicted_away_score: int
    created_at: datetime
    home_win_probability: float
    draw_probability: float
    away_win_probability: float
    predicted_total_points: Optional[float]
    predicted_home_points: Optional[float]
    predicted_away_points: Optional[float]
    expert_opinions: List[ExpertOpinion] = []

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None 