from sqlalchemy import Column, Integer, String, DateTime, Float, Enum
from sqlalchemy.sql import func
import enum
from app.database import Base

class SportType(enum.Enum):
    FOOTBALL = "football"
    BASKETBALL = "basketball"

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    sport_type = Column(Enum(SportType))
    home_team = Column(String)
    away_team = Column(String)
    match_date = Column(DateTime)
    home_odds = Column(Float)
    draw_odds = Column(Float)
    away_odds = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now()) 