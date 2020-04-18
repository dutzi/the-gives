import { useEffect, useState } from 'react';

export default function () {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    function handleScroll() {
      let page;

      if (window.scrollY < window.innerHeight) {
        page = 'home';
      } else if (window.scrollY < (window.innerHeight + 340) * 2) {
        page = 'pricing';
      } else if (window.scrollY < (window.innerHeight + 340) * 3) {
        page = 'faq';
      } else {
        page = 'contact';
      }

      if (page !== activePage) {
        setActivePage(page);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePage]);

  return activePage;
}
