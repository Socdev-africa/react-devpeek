// components/ToggleButton.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Position } from '../types';

interface ToggleButtonProps {
    isOpen: boolean;
    onClick: () => void;
    position: Position;
    isDarkMode: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    isOpen,
    onClick,
    position,
    isDarkMode
}) => {
    // Determine position classes
    const positionClasses = {
        'top-left': 'top-3 left-3',
        'top-right': 'top-3 right-3',
        'bottom-left': 'bottom-3 left-3',
        'bottom-right': 'bottom-3 right-3',
    };

    return (
        <motion.button
            onClick={onClick}
            className={`fixed ${positionClasses[position]} z-devpeek rounded-full p-2 shadow-devpeek ${isDarkMode
                ? 'bg-devpeek-dark text-white hover:bg-gray-700'
                : 'bg-white text-devpeek-dark hover:bg-gray-100'
                }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            aria-label={isOpen ? "Close DevPeek" : "Open DevPeek"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-code"
            >
                {isOpen ? (
                    // X icon when open
                    <>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                ) : (
                    // Code icon when closed
                    <>
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </>
                )}
            </svg>
        </motion.button>
    );
};