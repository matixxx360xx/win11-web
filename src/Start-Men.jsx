import { useState, useEffect } from 'react';
import './Start-menu.css';

export default function StartMenu({ isClosing }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 10);
    return () => clearTimeout(openTimeout);
  }, []);

  let classNames = 'Menu';
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