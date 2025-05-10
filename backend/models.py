from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum
from datetime import datetime

class SportType(str, enum.Enum):
    FOOTBALL = "football"
    BASKETBALL = "basketball"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_subscribed = Column(Boolean, default=False)
    subscription_end_date = Column(DateTime, nullable=True)
    predictions_used = Column(Integer, default=0)
    
    predictions = relationship("Prediction", back_populates="user")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sport_type = Column(Enum(SportType))
    home_team = Column(String)
    away_team = Column(String)
    predicted_home_score = Column(Integer)
    predicted_away_score = Column(Integer)
    match_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Additional statistics
    home_win_probability = Column(Float)
    draw_probability = Column(Float)
    away_win_probability = Column(Float)
    
    # For basketball
    predicted_total_points = Column(Float, nullable=True)
    predicted_home_points = Column(Float, nullable=True)
    predicted_away_points = Column(Float, nullable=True)
    
    user = relationship("User", back_populates="predictions")
    expert_opinions = relationship("ExpertOpinion", back_populates="prediction")

class ExpertOpinion(Base):
    __tablename__ = "expert_opinions"

    id = Column(Integer, primary_key=True, index=True)
    prediction_id = Column(Integer, ForeignKey("predictions.id"))
    expert_name = Column(String)
    opinion = Column(String)
    confidence_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    prediction = relationship("Prediction", back_populates="expert_opinions") 