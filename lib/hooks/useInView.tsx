import { RefObject, useEffect, useState } from "react";

export default function useInView(ref: RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return { isInView };
}
