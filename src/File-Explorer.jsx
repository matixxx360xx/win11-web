import { useState, useEffect } from 'react';
import './File-Explorer.css';

export default function FileExplorer({ onClose }) {

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);


  useEffect(() => {
    const openTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 10); 
    return () => clearTimeout(openTimeout);
  }, []);


  const handleCloseTrigger = () => {
    setIsClosing(true);
    setIsOpen(false);

 
    setTimeout(() => {
      onClose(); 
    }, 150); 
  };

  
  let classNames = 'file-explorer'; 
  
  if(isClosing) {
    classNames += ' closing';
  }else if(isOpen) {
    classNames += ' open';
  }

  return (
    <div className={classNames}>
      <div className="top-bar">

        <button className="Minimalize">-</button>
        <button className="FullScreen">▢</button>
        <button onClick={handleCloseTrigger} className="Close">X</button>
      </div>
    </div>
  );
}