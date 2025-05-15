import React from 'react';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';

const LoginPrompt = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-[var(--primary)] rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-[var(--accent-primary)] text-[var(--primary)]">
            <FiLock size={24} />
          </div>
          <h2 className="text-xl font-semibold">Sign in Required</h2>
        </div>
        <p className="text-[var(--text-secondary)] mb-6">
          Please sign in to vote in polls. This helps us prevent duplicate votes and maintain fair results.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {/* Implement sign in logic */}}
            className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--primary)] hover:bg-[var(--accent-hover)] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPrompt;