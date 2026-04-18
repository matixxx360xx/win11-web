import { useState, useEffect } from 'react';
import './Simple-Option.css';

export default function SimpleOption({ isClosing }) {

  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    return () => clearTimeout(openTimeout);
  }, []);
  
  let classNames = 'Simple-Option';

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