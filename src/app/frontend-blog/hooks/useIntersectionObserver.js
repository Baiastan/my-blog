import { useEffect } from "react";

const useIntersectionObserver = (ref, callback, options) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      callback(entries);
    }, options);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, callback, options]);
};

export default useIntersectionObserver;
