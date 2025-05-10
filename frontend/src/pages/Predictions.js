import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import mockMatches from '../mockMatches';

const leagues = [
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1"
];

const Predictions = () => {
  const { user } = useAuth();
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canGetPrediction = user?.is_subscribed || (user?.predictions_used || 0) < 3;

  const handleLeagueChange = (event, newValue) => {
    setSelectedLeague(newValue);
    setSelectedMatch(null);
    setPrediction(null);
    setError('');
  };

  const handleMatchClick = async (match) => {
    if (!canGetPrediction) {
      setError('You have used all your free predictions. Please upgrade to premium.');
      return;
    }
    setSelectedMatch(match);
    setLoading(true);
    setError('');
    setPrediction(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/predictions/`,
        {
          sport_type: "football",
          home_team: match.homeTeam,
          away_team: match.awayTeam,
          match_date: match.date,
        }
      );
      setPrediction(response.data);
    } catch (error) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const matchesInLeague = mockMatches.filter(m => m.league === selectedLeague);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom align="center">
          Football Predictions
        </Typography>
        <Tabs
          value={selectedLeague}
          onChange={handleLeagueChange}
          centered
          sx={{ mb: 3 }}
        >
          {leagues.map((league) => (
            <Tab key={league} label={league} value={league} />
          ))}
        </Tabs>
        {!canGetPrediction && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            You have used all your free predictions. Please upgrade to premium for unlimited predictions.
          </Alert>
        )}
        <Grid container spacing={2} justifyContent="center">
          {matchesInLeague.map((match) => (
            <Grid item xs={12} md={8} key={match.id}>
              <Button
                variant={selectedMatch && selectedMatch.id === match.id ? "contained" : "outlined"}
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => handleMatchClick(match)}
              >
                {match.homeTeam} vs {match.awayTeam} ({new Date(match.date).toLocaleString()})
              </Button>
            </Grid>
          ))}
        </Grid>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {prediction && selectedMatch && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Prediction for {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
            </Typography>
            <Typography>
              Predicted Score: {prediction.predicted_home_score} - {prediction.predicted_away_score}
            </Typography>
            <Typography>
              Home Win: {(prediction.home_win_probability * 100).toFixed(1)}%
            </Typography>
            <Typography>
              Draw: {(prediction.draw_probability * 100).toFixed(1)}%
            </Typography>
            <Typography>
              Away Win: {(prediction.away_win_probability * 100).toFixed(1)}%
            </Typography>
            {/* Dodaj więcej statystyk jeśli chcesz */}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Predictions; 