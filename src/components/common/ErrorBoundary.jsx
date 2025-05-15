import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--primary)]">
      <div className="max-w-md w-full p-6 bg-[var(--secondary)] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
          Something went wrong
        </h2>
        <div className="text-[var(--text-secondary)] mb-4">
          {error.message}
        </div>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-[var(--accent)] text-white rounded hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function withErrorBoundary(Component, options = {}) {
  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // Reset the state of your app here
          if (options.onReset) {
            options.onReset();
          }
        }}
        {...options}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
