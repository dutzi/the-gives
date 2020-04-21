import React, { useEffect } from 'react';
import { useTypedSelector } from './state/store';

function useUpdateDirection() {
  const language = useTypedSelector((state) => state.ui.language);

  useEffect(() => {
    const direction = language === 'he' ? 'rtl' : 'ltr';

    document.body.style.direction = direction;
    document.body.setAttribute('dir', direction);

    if (direction === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);
}

export default ({ children }: { children: React.ReactNode }) => {
  useUpdateDirection();

  return <>{children}</>;
};
