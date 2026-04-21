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

  const [isOnBluetooth, setIsOnBluetooth] = useState(false);
  const [isShowBluetooth, setIsShowBluetooth] = useState(false);
  const [isWifiOn, setIsWifiOn] = useState(false);
  const [isAirPlane, setIsAriPlane] = useState(false);
  const [isHotSpot, setIsHotSpot] = useState(false);
  const [isEnergySaving, setIsEnergySaving] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const classNamesbluetooth = isOnBluetooth ? 'bluetooth-on true' : 'bluetooth-on';
  function HandlebluetoothOn() {
    setIsOnBluetooth(prev => !prev);
  }

  useEffect(() => {
    if (isOnBluetooth) {
      setIsShowBluetooth(true);
    } else {
      setIsShowBluetooth(false);
    }
  }, [isOnBluetooth]);

  const classNamesbluetoothShow = isShowBluetooth ? 'show-bluetooth true' : 'show-bluetooth';
  function HandlebluetoothShow() {
    // setIsShowBluetooth(prev => !prev);
  }

  const classNamesWifiOn = isWifiOn ? 'wifi-on true' : 'wifi-on';
  function HandleWifiOn() {
    setIsWifiOn(prev => !prev);
  }

  const classNamesAirPlane = isAirPlane ? 'air-plane true' : 'air-plane';
  function Handleairplane() {
    setIsAriPlane(prev => !prev);
  }

  const classNamesHotSpot = isHotSpot ? 'hot-spot true' : 'hot-spot';
  function Handlehotspot() {
    setIsHotSpot(prev => !prev);
  }

  const classNamesEnergySaving = isEnergySaving ? 'energy-saving true' : 'energy-saving';
  function Handleenergysaving() {
    setIsEnergySaving(prev => !prev);
  }

  const classNamesNightMode = isNightMode ? 'night-mode true' : 'night-mode';
  function Handlenightmode() {
    setIsNightMode(prev => !prev);
  }
  return (
    <div className={classNames}>

      <div className='wifi-wrapper'>
        <div className={classNamesWifiOn} onClick={HandleWifiOn}>
          <img src='./assets/wifi.png' />
        </div>
        <div className='show-Wifi'>
          <img src='./assets/arrowup.png' />
        </div>
      </div>

      <div className='bluetooth-wrapper'>
        <div className={classNamesbluetooth} onClick={HandlebluetoothOn}>
          <img src='./assets/bluetooth.png' />
        </div>
        <div className={classNamesbluetoothShow} onClick={HandlebluetoothShow}>
          <img src='./assets/arrowup.png' />
        </div>
      </div>
      <div className='airpalne-wrapper'>
        <div className={classNamesAirPlane} onClick={Handleairplane}>
          <img src='./assets/airplane.png' />
        </div>
      </div>
      <div className='energysaving-wrapper'>
        <div className={classNamesEnergySaving} onClick={Handleenergysaving}>
          <img src='./assets/energysaving.png' />
        </div>
      </div>
      <div className='hotspot-wrapper'>
        <div className={classNamesHotSpot} onClick={Handlehotspot}>
          < img src='./assets/hotspot.png' />
        </div>
      </div>
      <div className='nightmode-wrapper'>
        <div className={classNamesNightMode} onClick={Handlenightmode}>
          <img src='./assets/sun.png' />
        </div>
      </div>
      
      <div className='line'></div>
      

    </div>
  );
}