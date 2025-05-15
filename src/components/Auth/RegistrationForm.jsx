import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import Link from '@mui/material/Link';
import { useTheme } from '../../context/ThemeContext';
import { styled } from '@mui/material/styles';
import authService from '../../services/authService';

// Styled components for themed elements
const StyledTextField = styled(TextField)(({ theme: muiTheme, customtheme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: customtheme.secondary,
    color: customtheme.text.primary,
    '& fieldset': {
      borderColor: customtheme.border,
    },
    '&:hover fieldset': {
      borderColor: customtheme.accent.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: customtheme.accent.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: customtheme.text.secondary,
    '&.Mui-focused': {
      color: customtheme.accent.primary,
    },
  },
  '& .MuiFormHelperText-root': {
    color: customtheme.accent.red,
  },
}));

const StyledButton = styled(Button)(({ theme: muiTheme, customtheme }) => ({
  backgroundColor: customtheme.accent.primary,
  color: customtheme.text.primary,
  '&:hover': {
    backgroundColor: customtheme.accent.hover,
  },
  '&.Mui-disabled': {
    backgroundColor: customtheme.tertiary,
    color: customtheme.text.muted,
  },
}));

const StyledLink = styled(Link)(({ theme: muiTheme, customtheme }) => ({
  color: customtheme.accent.primary,
  '&:hover': {
    color: customtheme.accent.hover,
  },
}));

const RegistrationForm = ({ onClose, onSuccess, onSwitchToLogin }) => {
  const { theme } = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  // Validate password strength
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (name) => {
    setFormTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setShowLoginPrompt(false);

    try {
      await authService.register(formData.email, formData.password);
      enqueueSnackbar('Registration successful! Please check your email to verify your account.', { 
        variant: 'success',
        autoHideDuration: 6000
      });
      onSuccess?.();
    } catch (err) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.';
      let variant = 'error';
      
      if (err.code === 'user_already_exists') {
        errorMessage = 'This email is already registered. Please use the Sign In link below.';
        variant = 'info';
        setShowLoginPrompt(true);
        if (typeof onSwitchToLogin === 'function') {
          setTimeout(() => {
            onSwitchToLogin();
          }, 2000);
        }
      }
      
      enqueueSnackbar(errorMessage, { 
        variant,
        autoHideDuration: 6000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: theme.secondary,
        color: theme.text.primary,
      }}
    >
      <StyledTextField
        customtheme={theme}
        required
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur('email')}
        error={formTouched.email && Boolean(errors.email)}
        helperText={formTouched.email && errors.email}
      />

      <StyledTextField
        customtheme={theme}
        required
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => handleBlur('password')}
        error={formTouched.password && Boolean(errors.password)}
        helperText={formTouched.password && errors.password}
      />

      <StyledTextField
        customtheme={theme}
        required
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('confirmPassword')}
        error={formTouched.confirmPassword && Boolean(errors.confirmPassword)}
        helperText={formTouched.confirmPassword && errors.confirmPassword}
      />

      <StyledButton
        customtheme={theme}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'REGISTER'}
      </StyledButton>

      {showLoginPrompt && (
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            mt: 2,
            color: theme.text.secondary 
          }}
        >
          Already have an account?{' '}
          <StyledLink
            customtheme={theme}
            component="button"
            type="button"
            onClick={onSwitchToLogin}
            underline="hover"
          >
            Sign In
          </StyledLink>
        </Typography>
      )}
    </Box>
  );
};

export default RegistrationForm;