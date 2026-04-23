import { useActionState, useEffect, useRef, useState } from 'react';
import './Pulpit.css'


import FileExplorer from '../FileExplorer/File-Explorer';
import StartMenu from '../Menu/Start-Men';
import SearchMenu from '../Menu/Search-Menu';
import HideIcon from '../HideIcon/Hide-icon'; 
import SimpleOption from '../Menu/Simple-Option';

function Pulpit() {
  const inputRef = useRef(null);

  useEffect(() => {
    function handleGlobalMouseUp(e) {

      if (!inputRef.current) return;

      // sprawdza czy puszczenie myszki bylo w inpucie
      const isInsideSearch = inputRef.current.contains(e.target);

      if (isInsideSearch) {
      } else {
        inputRef.current.blur(); // usuwa focus
      }
    };

    // nasłuchiwanie na całym oknie
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const [sekundy, setSekundy] = useState("")
  const [data, setData] = useState("");
  useEffect(() => {
    let time = setInterval(() => {

      let currentTime = new Date().toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      setSekundy(currentTime);
    }, 1000);
    setData(new Date().toLocaleDateString('pl-PL'));
    return () => clearInterval(time);
  }, []);


  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);

  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  const [isSearchMenuOpen, setIsSearchOpen] = useState(false);
  const [isSearchMenuClosing, setIsSearchClosing] = useState(false);

  const [isArrowOpen, setIsArrowOpen] = useState(false);
  const [isArrrowClosing, setIsArrowClosing] = useState(false);

  const [isSimpleOptionOpen, setIsSimpleOptionOpen] = useState(false);
  const [isSimpleOptionClosing, setIsSimpleOptionClosing] = useState(false);

  const [valueSound, setValueSound] = useState('middlesound.png');


  function HandleClikFileExplorer() {
    const fileExplorer = document.querySelector('.file-explorer');
    if (fileExplorer) {
      fileExplorer.querySelector('.Close')?.click();
    } else {
      setIsFileExplorerOpen(true);
    }
  }

  function HandleClikStartMenu() {
    if (isStartMenuOpen) {
      setIsMenuClosing(true);
      setTimeout(() => {
        setStartMenuOpen(false);
        setIsMenuClosing(false);
      }, 150);
    } else {
      setStartMenuOpen(true);
    }
  }

  function HandleClikInput() {
    if (isSearchMenuOpen) {
      setIsSearchClosing(true);
      setTimeout(() => {
        setIsSearchOpen(false);
        setIsSearchClosing(false);
      }, 150);
    } else {
      setIsSearchOpen(true);
    }
  }

  const [rotated, setRotated] = useState(false);
  function ArrowClick() {
    setRotated(prev => !prev);
    if (isArrowOpen) {
      setIsArrowClosing(true);

      setTimeout(() => {
        setIsArrowOpen(false);
        setIsArrowClosing(false);
      }, 150);
    } else {
      setIsArrowOpen(true);
    }

  }

  function HandleClickSimpleOption() {
    if (isSimpleOptionOpen) {
      setIsSimpleOptionClosing(true);

      setTimeout(() => {
        setIsSimpleOptionOpen(false);
        setIsSimpleOptionClosing(false);
      }, 150);

    } else {
      setIsSimpleOptionOpen(true);
    }
  }

  return (
    <>
      {isFileExplorerOpen && (
        <FileExplorer onClose={() => setIsFileExplorerOpen(false)} />
      )}
      {isStartMenuOpen && (
        <StartMenu isClosing={isMenuClosing} />
      )}
      {isSearchMenuOpen && (
        <SearchMenu isClosing={isSearchMenuClosing} />
      )}
      {isArrowOpen && (
        <HideIcon isClosing={isArrrowClosing} />
      )}
      {isSimpleOptionOpen && (
        <SimpleOption isClosing={isSimpleOptionClosing} onSoundChange={setValueSound}/>
      )}
      <div className='taskbar'>
        <div className='icon-container'>
          <div className="icon-wrapper">
            <img src="../assets/win11.png" className='icon win-icon' onClick={HandleClikStartMenu} />
          </div>
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" ref={inputRef} className="input" onClick={HandleClikInput} />
          </div>
          <div className="icon-wrapper">
            <img src='../assets/file explorer.png' className='icon' onClick={HandleClikFileExplorer} />
          </div>
          <div className="right-option">
            <div className='hide-icon'>
              <img className={`arrow ${rotated ? "rotated" : ""}`} src='../assets/arrowup.png' alt='arrow' onClick={ArrowClick} />
            </div>

            <div className='wifi-sound' onClick={HandleClickSimpleOption}>
              <img src={`../assets/${valueSound}`} alt='sound' />
              <img src='../assets/wifi.png' alt='wifi' />
            </div>
            <div className="time-date">
              <span className="time-text">{sekundy}</span>
              <span className="date-text">{data}</span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Pulpit
