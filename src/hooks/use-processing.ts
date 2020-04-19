import { useState, useCallback } from 'react';

export default function useProcessing(state: boolean = false) {
  const [isProcessing, setIsProcessing] = useState(state);

  const startProcessing = useCallback(() => {
    setIsProcessing(true);
  }, []);

  const stopProcessing = useCallback(() => {
    setIsProcessing(false);
  }, []);

  return {
    state: isProcessing,
    start: startProcessing,
    stop: stopProcessing,
  };
}
