import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const remainingPredictions = user?.is_subscribed
    ? 'Unlimited'
    : Math.max(0, 3 - (user?.predictions_used || 0));

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom align="center">
              Welcome to Sports Predictor AI
            </Typography>
            <Typography variant="body1" paragraph align="center">
              Get accurate predictions for football and basketball matches using our
              advanced AI algorithms, historical data, and expert opinions.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 300, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Account
              </Typography>
              <Typography variant="body1">
                Email: {user?.email}
              </Typography>
              <Typography variant="body1">
                Subscription Status:{' '}
                {user?.is_subscribed ? 'Active' : 'Free Tier'}
              </Typography>
              <Typography variant="body1">
                Remaining Predictions: {remainingPredictions}
              </Typography>
            </CardContent>
            {!user?.is_subscribed && (
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate('/subscription')}
                >
                  Upgrade to Premium
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 300, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => navigate('/predictions')}
                >
                  Get New Prediction
                </Button>
                {!user?.is_subscribed && (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => navigate('/subscription')}
                  >
                    View Subscription Plans
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom align="center">
              How It Works
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6">1. Choose a Match</Typography>
                <Typography variant="body2">
                  Select from upcoming football or basketball matches.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">2. Get Predictions</Typography>
                <Typography variant="body2">
                  Our AI analyzes historical data, betting odds, and expert opinions.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">3. Make Informed Decisions</Typography>
                <Typography variant="body2">
                  Use our predictions to make better betting decisions.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 