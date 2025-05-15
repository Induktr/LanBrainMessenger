import React from 'react';
import { motion } from 'framer-motion';

const PollOption = ({ option, onVote, isVoted, isDisabled, totalVotes }) => {
  const percentage = totalVotes > 0 ? Math.round((option.votes_count / totalVotes) * 100) : 0;
  
  return (
    <motion.button
      onClick={() => onVote(option.id)}
      disabled={isDisabled || isVoted}
      className={`relative w-full p-6 rounded-xl border transition-all duration-300
        ${isVoted 
          ? 'bg-[var(--secondary)] border-[var(--accent-primary)]'
          : 'bg-[var(--secondary)] border-[var(--border)] hover:border-[var(--accent-primary)]'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      whileHover={!isDisabled && !isVoted ? { scale: 1.02 } : {}}
    >
      <div className="flex items-start gap-4">
        <img 
          src={option.icon} 
          alt={option.title}
          className="w-8 h-8 object-contain"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">
              {option.title}
            </h3>
            <span className="text-[var(--accent-primary)] font-medium">
              {percentage}%
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mb-4">
            {option.description}
          </p>
          
          {/* Progress bar */}
          <div className="relative h-2 bg-[var(--tertiary)] rounded-full overflow-hidden">
            <motion.div
              className={`absolute left-0 top-0 h-full rounded-full
                ${isVoted ? 'bg-[var(--accent-primary)]' : 'bg-[var(--border)]'}`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="mt-2 text-sm text-[var(--text-secondary)]">
            {option.votes_count} votes
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default PollOption;