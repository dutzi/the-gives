import { useEffect } from 'react';
export default function () {
  useEffect(() => {
    ga('set', 'page', window.location.pathname + window.location.search);
    ga('send', 'pageview');
  }, []);
}
