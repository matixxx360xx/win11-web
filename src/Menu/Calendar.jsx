import { useState, useEffect, use } from 'react';
import './Calendar.css';

export default function Calendar({ isClosing }) {
    const [isOpen, setIsOpen] = useState(false);

    const [isDay, setDay] = useState("");
    const [isMonth, setMonth] = useState("");
    const [isYear, setYear] = useState("");

    const [isCallndarMonth, setCalendarMonth] = useState("");
    const [isCallendarYear, setCalendarYear] = useState("");


    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpen(true);
        }, 10);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const date = new Date();
        const day = date.toLocaleString('pl-PL', { weekday: 'long' });
        const month = date.toLocaleString('pl-PL', { month: 'long' });
        const year = date.getFullYear();
        setDay(day);
        setMonth(month);
        setYear(year);
    }, []);

    function HandleClickChangeDateUp() {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCalendarMonth(newDate.toLocaleString('pl-PL', { month: 'long' }));
        setCalendarYear(newDate.getFullYear());
        setCurrentDate(newDate);
    }

    function HandleClickChangeDateDown() {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCalendarMonth(newDate.toLocaleString('pl-PL', { month: 'long' }));
        setCalendarYear(newDate.getFullYear());
        setCurrentDate(newDate);
    }




    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    useEffect(() => {
        setCalendarMonth(currentDate.toLocaleString('pl-PL', { month: 'long' }));

        setCalendarYear(currentDate.getFullYear());
    }, [currentDate]);

    const weekDays = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];
    const daysGrid = [];


    for (let i = 0; i < firstDayIndex; i++) {
        daysGrid.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }


    for (let i = 1; i <= daysInMonth; i++) {

        const isToday = i === currentDate.getDate();

        daysGrid.push(
            <div key={i} className={`calendar-cell number ${isToday ? 'today' : ''}`}>
                {i}
            </div>
        );
    }


    let classNames = "Calendar";
    if (isClosing) {
        classNames += ' closing';
    } else if (isOpen) {
        classNames += ' open';
    }

    return (
        <div className={classNames}>
            <div className="calendar-top-bg"></div>

            <div className='calendar-header'>
                <div className='header-day'>{isDay},</div>
                <div className='header-month'>{isMonth}</div>
                <div className='header-year'>{isYear}</div>
            </div>

            <div className="calendar-body">
                <div className='calendar-day-year'>
                    <div className='header-month'>{isCallndarMonth}</div>
                    <div className='header-year'>{isCallendarYear}</div>
                    <div className='change-month'>
                        <div className='bottom' onClick={HandleClickChangeDateDown}>v</div>
                        <div className='top' onClick={HandleClickChangeDateUp}>v</div>
                    </div>
                </div>
                <div className="weekdays-row">
                    {weekDays.map(day => (
                        <div key={day} className="weekday-name">{day}</div>
                    ))}
                </div>

                <div className="days-grid">
                    {daysGrid}
                </div>
            </div>
        </div>
    );
}