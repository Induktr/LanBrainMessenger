import { supabase, STORAGE_KEYS } from '../config/supabase';

class AuthService {
  async register(email, password, userData = {}) {
    try {
      console.log('Starting registration process...');

      // Validate email format
      if (!this.isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

      // Validate password requirements
      const passwordError = this.validatePassword(password);
      if (passwordError) {
        throw new Error(passwordError);
      }

      console.log('Validation passed, attempting signup...');

      // First, check if the user already exists
      const { data: existingUser } = await supabase
        .from('auth.users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        const err = new Error('Email already registered');
        err.code = 'user_already_exists';
        throw err;
      }

      // Attempt to create user with minimal data first
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        console.error('Signup error:', error);
        
        // Handle specific Supabase error codes
        switch (error.status) {
          case 422:
            throw new Error('Invalid email or password format');
          case 400:
            if (error.message.includes('already registered')) {
              const err = new Error('Email already registered');
              err.code = 'user_already_exists';
              throw err;
            }
            throw new Error(error.message);
          case 500:
            console.error('Supabase internal error:', error);
            throw new Error('Unable to complete registration. Please try again later');
          default:
            throw error;
        }
      }

      console.log('User created successfully, updating profile...');

      // If user creation was successful, update their profile
      if (data?.user?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: data.user.id,
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
              ...userData
            }
          ], {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Log the error but don't throw, as the user is already created
          await this.reportError('profile_creation_error', profileError);
        }
      }

      return data;
    } catch (error) {
      console.error('Registration process error:', error);
      await this.reportError('registration_error', error);
      throw this.handleError(error);
    }
  }

  async reportError(type, error) {
    try {
      const errorDetails = {
        message: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack,
      };

      console.error(`Reporting ${type}:`, errorDetails);

      const { error: logError } = await supabase
        .from('error_logs')
        .insert([
          {
            type,
            error_message: error.message,
            error_details: errorDetails,
            created_at: new Date().toISOString(),
          }
        ]);

      if (logError) {
        console.error('Error logging failed:', logError);
      }
    } catch (logError) {
      console.error('Error reporting failed:', logError);
    }
  }

  async login(email, password) {
    try {
      if (!this.isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        switch (error.status) {
          case 400:
            throw new Error('Invalid credentials');
          case 429:
            throw new Error('Too many attempts. Please try again later');
          default:
            throw error;
        }
      }

      if (data?.session) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.session.access_token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  getCurrentUser() {
    return supabase.auth.getUser();
  }

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validatePassword(password) {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter';
    if (!/[0-9]/.test(password)) return 'Password must include a number';
    return null;
  }

  handleError(error) {
    console.error('Auth Error:', error);
    
    // If it's already a handled error, return as is
    if (error.code || (error instanceof Error && error.message)) {
      return error;
    }

    // Generic error
    return new Error('An unexpected authentication error occurred');
  }
}

const authService = new AuthService();
export default authService;
