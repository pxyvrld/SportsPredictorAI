from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uvicorn
from fastapi import Depends

from database import SessionLocal, engine
import models
import schemas
import crud
from auth import get_current_user

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sports Predictor AI")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to Sports Predictor AI API"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    return crud.create_user(db=db, user=user)

@app.post("/predictions/", response_model=schemas.Prediction)
def create_prediction(
    prediction: schemas.PredictionCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Tu możesz dodać logikę predykcji, np. wywołanie prediction_service
    # Na razie zwróć przykładową predykcję lub zapisz do bazy
    from prediction_service import prediction_service

    if prediction.sport_type == "football":
        result = prediction_service.predict_football_match(
            prediction.home_team, prediction.away_team, prediction.match_date
        )
    else:
        result = prediction_service.predict_basketball_match(
            prediction.home_team, prediction.away_team, prediction.match_date
        )

    # Zapisz predykcję do bazy
    db_prediction = crud.create_prediction(db, prediction, current_user.id)
    # Możesz też dodać expert_opinions do bazy jeśli chcesz

    # Uzupełnij odpowiedź o wyniki predykcji
    db_prediction.predicted_home_score = result.get("predicted_home_score")
    db_prediction.predicted_away_score = result.get("predicted_away_score")
    db_prediction.home_win_probability = result.get("home_win_probability")
    db_prediction.draw_probability = result.get("draw_probability")
    db_prediction.away_win_probability = result.get("away_win_probability")
    db_prediction.predicted_total_points = result.get("predicted_total_points")
    db_prediction.predicted_home_points = result.get("predicted_home_points")
    db_prediction.predicted_away_points = result.get("predicted_away_points")
    db.commit()
    db.refresh(db_prediction)
    return db_prediction

@app.post("/token")
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = crud.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/predictions/", response_model=List[schemas.Prediction])
def get_predictions(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_user_predictions(db=db, user_id=current_user.id)

@app.get("/users/me", response_model=schemas.User)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 