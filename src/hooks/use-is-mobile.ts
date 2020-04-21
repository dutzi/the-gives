import { useEffect, useState } from 'react';
import * as utils from '../utils';

export default function () {
  const [isMobile, setIsMobile] = useState(utils.isMobile());

  useEffect(() => {
    function handleResize() {
      setIsMobile(utils.isMobile());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}
