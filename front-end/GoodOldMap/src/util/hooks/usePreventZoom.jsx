import { useEffect } from 'react'

function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
    useEffect(() => {
      const handleWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
        }
      };
  
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-'|| e.key==='=')) {
          e.preventDefault();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("wheel", handleWheel, { passive: false });
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("wheel", handleWheel);
      };
    }, [scrollCheck, keyboardCheck]);
  }

export default usePreventZoom