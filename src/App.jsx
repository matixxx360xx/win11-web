import { useActionState, useEffect, useRef, useState } from 'react';
import './index.css'

function App() {
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

  return (
    <>

      <div className='taskbar'>
        <div className='icon-container'>
          <div className="icon-wrapper">
            <img src="../assets/win11.png" className='icon win-icon' />
          </div>
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search" ref={inputRef} className="input" />
          </div>
          <div className="icon-wrapper">
            <img src='../assets/file explorer.png' className='icon' />
          </div>
          <div className="right-option">
            <p>{sekundy} {data}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
