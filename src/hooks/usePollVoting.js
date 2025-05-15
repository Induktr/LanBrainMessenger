import { useState } from 'react';
import { submitVote } from '../utils/polls';

export function usePollVoting() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleVote = async (pollId, optionId, userId) => {
    if (!userId) {
      throw new Error('User must be logged in to vote');
    }

    setIsLoading(true);
    setError(null);

    try {
      await submitVote(pollId, optionId, userId);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleVote,
    isLoading,
    error,
    clearError: () => setError(null)
  };
}