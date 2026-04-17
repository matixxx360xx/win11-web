import { useState, useEffect } from 'react';
import './Search-Menu.css';

export default function SearchMenu({ isClosing }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const Timeout = setTimeout(() => {
            setIsOpen(true);
        }, 10)
        return () => clearTimeout(Timeout)
    }, []);

    let classNames = "SearchMenu";

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