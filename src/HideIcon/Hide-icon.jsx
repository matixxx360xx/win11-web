import { useState, useEffect } from 'react';
import './Hide-icon.css';

export default function HideIcon({ isClosing }) {

   const [isOpen, setIsOpen] = useState(false);
 

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    return () => clearTimeout(openTimeout);
  }, []);
  
  let classNames = 'Hide-icon';

  if (isClosing) {
    classNames += ' closing';
  } else if (isOpen) {
    classNames += ' open';
  }

  return (
    <div className={classNames}>
     
    </div>
  );
}