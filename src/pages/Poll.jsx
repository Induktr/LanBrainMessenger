import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiAward, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { pollData } from '../data/polls';
import { submitVote, getUserVotes, syncPolls } from '../utils/polls';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

const Poll = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [votes, setVotes] = useState({});
  const [voteCounts, setVoteCounts] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePolls, setActivePolls] = useState([]);
  const [completedPolls, setCompletedPolls] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const initializePollsData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Initialize with static data first
        if (!pollData || !pollData.activePolls || !pollData.completedPolls) {
          throw new Error('Poll data is not properly structured');
        }

        // Sync polls with database
        try {
          const syncResponse = await syncPolls();
          // Ensure syncResponse is an array before filtering
          const results = Array.isArray(syncResponse) ? syncResponse : [];
          const failedPolls = results.filter(r => !r.success);
          
          console.log('Poll sync results:', {
            total: results.length,
            failed: failedPolls.length,
            failedDetails: failedPolls
          });

          if (failedPolls.length > 0) {
            console.warn('Some polls failed to sync:', failedPolls);
            // Only show error to user if all polls failed
            if (failedPolls.length === results.length) {
              setError('Unable to sync polls with the database. Some features may be limited.');
            }
          }
        } catch (syncError) {
          console.error('Sync error:', syncError);
          if (syncError.message?.includes('permission')) {
            console.warn('Permission error syncing polls:', syncError);
            // Don't block the UI for permission errors
          } else if (syncError.code === 'PGRST116') {
            console.warn('No existing polls found in database');
          } else {
            throw syncError;
          }
        }

        setActivePolls(pollData.activePolls);
        setCompletedPolls(pollData.completedPolls);

        // If user is logged in, load their votes
        if (user) {
          try {
            const userVotes = await getUserVotes(user.id);
            setVotes(userVotes || {});
          } catch (voteError) {
            console.error('Error loading user votes:', voteError);
            // Show a warning but don't fail completely
            setError(prev => prev || 'Unable to load your previous votes. You can still vote, but may see duplicate options.');
          }
        }
      } catch (error) {
        console.error('Error initializing polls:', error);
        setError(error.message || 'Failed to load polls. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializePollsData();
  }, [user]);

  useEffect(() => {
    activePolls.forEach(poll => {
      fetchVoteCounts(poll.id);
    });
  }, [activePolls]);

  const fetchVoteCounts = async (pollId) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if Supabase is properly initialized
      if (!supabase) {
        throw new Error('Database connection not initialized');
      }

      const { data: voteData, error: fetchError } = await supabase
        .from('poll_votes')
        .select('option_id')
        .eq('poll_id', pollId);

      if (fetchError) {
        console.error('Error fetching votes:', fetchError);
        throw new Error('Failed to fetch vote counts');
      }

      // Initialize counts for all options to 0
      const initialCounts = {};
      const poll = activePolls.find(p => p.id === pollId);
      if (poll) {
        poll.options.forEach(option => {
          initialCounts[option.id] = 0;
        });

        // Count votes for each option
        voteData?.forEach(vote => {
          initialCounts[vote.option_id] = (initialCounts[vote.option_id] || 0) + 1;
        });

        setVoteCounts(prev => ({ ...prev, [pollId]: initialCounts }));
        setTotalVotes(prev => ({ ...prev, [pollId]: voteData?.length || 0 }));

        // Check if user has already voted
        if (user) {
          const userVote = voteData?.find(vote => vote.user_id === user.id);
          if (userVote) {
            setVotes(prev => ({
              ...prev,
              [pollId]: userVote.option_id
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching vote counts:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (pollId, optionId) => {
    const pollVoteCounts = voteCounts[pollId] || {};
    const totalVotes = Object.values(pollVoteCounts).reduce((sum, count) => sum + count, 0);
    return totalVotes === 0 ? 0 : Math.round((pollVoteCounts[optionId] || 0) / totalVotes * 100);
  };

  const handleVote = async (pollId, optionId) => {
    console.log('Attempting to vote:', { pollId, optionId, userId: user?.id });
    
    try {
      if (!user?.id) {
        throw new Error('Please log in to vote');
      }

      // Validate that option exists in poll options
      const poll = activePolls.find(p => p.id === pollId);
      if (poll) {
        const optionExists = poll.options.some(option => option.id === optionId);
        if (!optionExists) {
          throw new Error('Invalid voting option selected');
        }
      }

      setIsVoting(true);
      setError(null);

      const { data, error: voteError } = await submitVote(pollId, optionId, user.id);

      if (voteError) {
        throw new Error(voteError.message || 'Failed to submit vote');
      }

      // Update local vote counts
      setVoteCounts(prev => ({
        ...prev,
        [pollId]: {
          ...prev[pollId],
          [optionId]: (prev[pollId][optionId] || 0) + 1
        }
      }));
      setTotalVotes(prev => prev + 1);
      setVotes(prev => ({
        ...prev,
        [pollId]: optionId
      }));

      alert('Your vote has been recorded successfully!');
    } catch (error) {
      console.error('Vote submission error:', error);
      setError(error.message);
      alert(error.message);
    } finally {
      setIsVoting(false);
    }
  };

  const renderVoteCount = (pollId, optionId) => {
    if (isLoading) return '';
    const pollVoteCounts = voteCounts[pollId] || {};
    const count = pollVoteCounts[optionId] || 0;
    return `${count} ${count === 1 ? 'vote' : 'votes'}`;
  };

  const renderPollOption = (poll, option) => {
    const hasVoted = votes[poll.id] === option.id;
    const percentage = calculatePercentage(poll.id, option.id);
    
    return (
      <motion.button
        key={option.id}
        onClick={() => !hasVoted && handleVote(poll.id, option.id)}
        disabled={hasVoted || !user}
        className={`w-full relative overflow-hidden rounded-xl border ${
          hasVoted 
            ? 'border-[var(--accent-primary)]' 
            : 'border-[var(--border)]'
        } ${
          !hasVoted && user
            ? 'hover:border-[var(--accent-primary)] cursor-pointer'
            : 'cursor-default'
        }`}
        whileHover={!hasVoted && user ? { scale: 1.01 } : {}}
        transition={{ duration: 0.2 }}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[var(--primary)] p-2 flex-shrink-0">
              {option.icon ? (
                <img 
                  src={option.icon}
                  alt={option.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-[var(--border)] rounded-lg" />
              )}
            </div>
            <div className="flex-grow">
              <h4 className="text-lg font-medium mb-1 flex items-center gap-2">
                {option.title}
              </h4>
              <p className="text-[var(--text-secondary)] text-sm">
                {option.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{percentage}%</div>
              <div className="text-[var(--text-secondary)] text-sm">
                {renderVoteCount(poll.id, option.id)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-[var(--accent-primary)]"
          style={{ 
            width: `${percentage}%`,
            opacity: hasVoted ? 1 : 0.6
          }}
        />
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)]">
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-[var(--primary)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)] mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading polls...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !activePolls.length && !completedPolls.length && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-[var(--text-primary)] mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
          <Link 
            to="/"
            className="inline-flex items-center mt-8 gap-2 text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-4">Feature Polls</h1>
          <p className="text-[var(--text-secondary)]">
            Help shape the future of BrainMessenger by voting on upcoming features
          </p>
        </div>

        {/* Active Polls */}
        {activePolls.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <img 
                src="https://res.cloudinary.com/dsjalneil/image/upload/v1734719751/make-bold-changes-to-the-proportions--for-example-_yq3fcn.svg"
                alt="Active Polls"
                className="w-6 h-6"
              />
              Active Polls
            </h2>
            <div className="space-y-12">
              {activePolls.map(poll => {
                
                return (
                  <div key={poll.id} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{poll.title}</h3>
                      <p className="text-[var(--text-secondary)]">{poll.description}</p>
                    </div>
                    <div className="grid gap-4">
                      {poll.options.map(option => 
                        renderPollOption(poll, option)
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Poll ends on {new Date(poll.endDate).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Polls */}
        {completedPolls.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
              <img 
                src="https://res.cloudinary.com/dsjalneil/image/upload/v1734707344/boldly-change-the-proportions--for-example--enlarg_4_yjkprb.svg"
                alt="Completed Polls"
                className="w-6 h-6"
              />
              Completed Polls
            </h2>
            <div className="space-y-12">
              {completedPolls.map(poll => {
                
                return (
                  <div key={poll.id} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{poll.title}</h3>
                      <p className="text-[var(--text-secondary)]">{poll.description}</p>
                    </div>
                    <div className="grid gap-4">
                      {poll.options.map(option => 
                        renderPollOption(poll, option)
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Poll ended on {new Date(poll.endDate).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white
              px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50"
          >
            <FiAlertCircle />
            {error}
            <button 
              onClick={() => setError(null)} 
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Message */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-[var(--primary)]
              px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50"
          >
            <FiAward />
            Thank you for your vote!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Poll;
