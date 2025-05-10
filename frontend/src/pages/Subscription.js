import React, { useState } from 'react';
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
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Subscription = () => {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscriptionPlans = [
    {
      name: 'Monthly',
      price: '19.99',
      duration: 30,
      features: [
        'Unlimited predictions',
        'Access to all sports',
        'Detailed statistics',
        'Expert opinions',
      ],
    },
    {
      name: 'Quarterly',
      price: '49.99',
      duration: 90,
      features: [
        'Unlimited predictions',
        'Access to all sports',
        'Detailed statistics',
        'Expert opinions',
        '15% discount',
      ],
    },
    {
      name: 'Yearly',
      price: '149.99',
      duration: 365,
      features: [
        'Unlimited predictions',
        'Access to all sports',
        'Detailed statistics',
        'Expert opinions',
        '40% discount',
        'Priority support',
      ],
    },
  ];

  const handleSubscribe = async (plan) => {
    try {
      // TODO: Implement actual payment processing
      await axios.post(`${process.env.REACT_APP_API_URL}/subscriptions/`, {
        plan_duration: plan.duration,
      });
      setSuccess(`Successfully subscribed to ${plan.name} plan!`);
      setError('');
    } catch (error) {
      setError('Failed to process subscription. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Subscription Plans
            </Typography>
            <Typography variant="body1" paragraph>
              Choose a plan that best suits your needs. All plans include unlimited
              predictions and access to all features.
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
          </Paper>
        </Grid>

        {subscriptionPlans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  ${plan.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  per {plan.name.toLowerCase()}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {plan.features.map((feature, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      • {feature}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubscribe(plan)}
                  disabled={user?.is_subscribed}
                >
                  {user?.is_subscribed ? 'Current Plan' : 'Subscribe'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Why Subscribe?
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Unlimited Predictions</Typography>
                <Typography variant="body2">
                  Get as many predictions as you need for any upcoming match.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Advanced Statistics</Typography>
                <Typography variant="body2">
                  Access detailed match statistics and betting insights.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Expert Analysis</Typography>
                <Typography variant="body2">
                  Get insights from professional sports analysts.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Subscription; 