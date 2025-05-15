import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ERROR_MESSAGES = {
    AUTH_ERROR: 'Authentication error. Please log in again.',
    TIMEOUT: 'Request timed out. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

// Wrapper to use hooks with class component
function ErrorBoundaryWrapper(props) {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    return <ErrorBoundaryClass {...props} navigate={navigate} signOut={signOut} />;
}

class ErrorBoundaryClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { 
            hasError: true,
            error 
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        if (error.code === 'AUTH_ERROR') {
            this.props.signOut();
            this.props.navigate('/login');
        }
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
        window.addEventListener('error', this.handleError);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
        window.removeEventListener('error', this.handleError);
    }

    handleUnhandledRejection = (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        this.setState({ 
            hasError: true,
            error: event.reason 
        });
    };

    handleError = (event) => {
        console.error('Unhandled error:', event.error);
        this.setState({ 
            hasError: true,
            error: event.error 
        });
        event.preventDefault();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Something went wrong</h2>
                    <p>
                        {this.state.error && 
                            (ERROR_MESSAGES[this.state.error.code] || 
                             this.state.error.message || 
                             'An unexpected error occurred')}
                    </p>
                    <button
                        onClick={() => {
                            this.setState({ hasError: false, error: null });
                            window.location.reload();
                        }}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export const ErrorBoundary = ErrorBoundaryWrapper;
