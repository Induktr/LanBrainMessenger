import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorMessageContext {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageContext> = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[var(--accent-red)] text-[var(--primary)] px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
    >
      <FiAlertCircle />
      {message}
    </motion.div>
  );
};

export default ErrorMessage;