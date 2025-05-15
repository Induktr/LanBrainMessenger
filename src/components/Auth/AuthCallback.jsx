import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import { useSnackbar } from 'notistack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        
        if (error) throw error;

        enqueueSnackbar('Email verified successfully!', { 
          variant: 'success',
          autoHideDuration: 3000
        });
        
        // Redirect to home or dashboard
        navigate('/');
      } catch (error) {
        console.error('Auth callback error:', error);
        enqueueSnackbar('Verification failed. Please try again.', { 
          variant: 'error',
          autoHideDuration: 5000
        });
        navigate('/auth/login');
      }
    };

    handleAuthCallback();
  }, [navigate, enqueueSnackbar]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AuthCallback;
