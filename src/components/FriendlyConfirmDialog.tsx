
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, X, Heart } from 'lucide-react';

interface FriendlyConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

const FriendlyConfirmDialog: React.FC<FriendlyConfirmDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText
}) => {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <motion.div
          className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 max-w-md w-full shadow-2xl border-4 border-purple-300"
          initial={{ scale: 0.5, opacity: 0, y: -50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: -50 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
        >
          <div className="text-center space-y-6">
            {/* Friendly icon */}
            <motion.div
              className="flex justify-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-purple-300 rounded-full p-4">
                <RefreshCw size={48} className="text-purple-700" />
              </div>
            </motion.div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-purple-800 kids-text">
              {title}
            </h2>
            
            {/* Message */}
            <div className="bg-white/80 p-4 rounded-xl border-2 border-purple-200">
              <p className="text-lg text-purple-700 kids-text">
                {message}
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onConfirm}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white kids-text text-xl py-4 h-auto"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {confirmText}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="w-full bg-green-100 hover:bg-green-200 text-green-800 border-green-300 kids-text text-xl py-4 h-auto"
                  size="lg"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {cancelText}
                </Button>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="flex justify-center gap-2 pt-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FriendlyConfirmDialog;
