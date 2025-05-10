from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from app.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    predicted_score = Column(String)  # Format: "2-1"
    confidence_score = Column(Float)
    additional_stats = Column(JSON)  # Dla dodatkowych statystyk
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 