import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (): [
  React.Dispatch<React.SetStateAction<Element | undefined>>,
  ResizeObserverEntry?
] => {
  const [entry, setEntry] = useState<ResizeObserverEntry>();
  const [node, setNode] = useState<Element>();
  const observer = useRef<{ observer?: ResizeObserver }>({});

  const disconnect = useCallback(() => {
    const { current } = observer;
    current?.observer?.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current.observer = new ResizeObserver(([entry]) =>
      setEntry(entry)
    );
    node && observer.current.observer.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  return [setNode, entry];
};

export default useResizeObserver;
