# Sports Predictor AI

A web application for predicting sports match outcomes using machine learning, historical data, betting odds, and expert opinions.

## Features

- User authentication system
- Free tier with 3 match predictions
- Support for Football and Basketball predictions
- Prediction sources:
  - Historical match statistics
  - Betting odds
  - Expert opinions
- Additional statistics for betting
- Subscription system for unlimited predictions

## Tech Stack

- Frontend: React
- Backend: FastAPI (Python)
- Database: PostgreSQL
- Machine Learning: scikit-learn

## Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL
- npm or yarn

## Setup

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file in the backend directory with:
```
DATABASE_URL=postgresql://postgres:postgres@localhost/sports_predictor
SECRET_KEY=your-secret-key-here
```

4. Initialize the database:
```bash
# Create the database in PostgreSQL
createdb sports_predictor

# Run migrations (if using Alembic)
alembic upgrade head
```

5. Run the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:8000
```

3. Run the development server:
```bash
npm start
```

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 