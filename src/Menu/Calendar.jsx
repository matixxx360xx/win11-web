import { useState } from 'react';
import { useRef, useEffect } from 'react';
import './Calendar.css';

export default function Calendar({ isClosing }) {
    const [isOpen, setIsOpen] = useState(false);

    const [isDay, setDay] = useState("");
    const [isDayNumber, setDayNumber] = useState("");
    const [isMonth, setMonth] = useState("");
    const [isYear, setYear] = useState("");

    const [isCallndarMonth, setCalendarMonth] = useState("");
    const [isCallendarYear, setCalendarYear] = useState("");

    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("");

    const [isYearMonthDisplay, setIsYearMonthDisplay] = useState("grid");
    const [isYearDisplay, setIsYearDisplay] = useState("none");
    const [isFirstDisplay, setIsFirstDisplay] = useState("grid");
    const [isSecondDisplay, setIsSecondDisplay] = useState("none");
    const [isThirdDisplay, setIsThirdDisplay] = useState("none");

    const [mode, setMode] = useState("month");
    const monthRef = useRef(null);
    const yearRef = useRef(null);

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
        setDayNumber(Number(date.getDate()));
    }, []);

    function HandleClickChangeDateUp() {
        setDirection("up");
        setIsAnimating(true);

        setTimeout(() => {
            const newDate = new Date(currentDate);

            if (mode === "yearTen") {
                newDate.setFullYear(newDate.getFullYear() + 10);
            }
            else if (mode === "year") {
                newDate.setFullYear(newDate.getFullYear() + 1);
            }
            else {
                newDate.setMonth(newDate.getMonth() + 1);
            }

            setCurrentDate(newDate);
            setIsAnimating(false);
        }, 300);
    }

    function HandleClickChangeDateDown() {
        setDirection("down");
        setIsAnimating(true);

        setTimeout(() => {
            const newDate = new Date(currentDate);

            if (mode === "yearTen") {
                newDate.setFullYear(newDate.getFullYear() - 10);
            }
            else if (mode === "year") {
                newDate.setFullYear(newDate.getFullYear() - 1);
            }
            else {
                newDate.setMonth(newDate.getMonth() - 1);
            }

            setCurrentDate(newDate);
            setIsAnimating(false);
        }, 300);
    }
    let daysGridClass = "days-grid";

    if (isAnimating) {
        daysGridClass += ` animate-${direction}`;
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

        const today = new Date();

        const isToday =
            i === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

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

    const index = useRef(0);
    function HandleClickChangeMonthYear() {
        if(index.current < 2) {
        index.current++;
        }
        if (index.current == 1) {
            setMode(prev => prev === "month" ? "year" : "month");
            setIsYearMonthDisplay("none");
            setIsYearDisplay("grid");
            setIsFirstDisplay("none");
            setIsSecondDisplay("grid");
        } if (index.current == 2) {
            setIsYearDisplay("grid");
            setMode("yearTen");
            setIsSecondDisplay("none");
            setIsThirdDisplay("grid");

        }
    }

    let AllMonth = [];

    const today = new Date();
    const todayIndex =
        (today.getFullYear() - 1970) * 12 + today.getMonth();

    const currentIndex =
        (currentDate.getFullYear() - 1970) * 12 + currentDate.getMonth();

    for (let i = 0; i < 1080; i++) {
        const year = 1970 + Math.floor(i / 12);
        const month = i % 12;

        const date = new Date(year, month, 1);

        const monthName = date.toLocaleString('pl-PL', {
            month: 'short'
        });

        const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth();

        const isSelected =
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth();

        AllMonth.push(
            <div
                key={i}
                data-index={i}
                onClick={() => {
                    setCurrentDate(date)
                    setIsFirstDisplay("grid")
                    setIsSecondDisplay("none")
                     setIsYearDisplay("none")
                     setIsYearMonthDisplay("grid")
                    index.current -= 1;
                }}  
                className={`month-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            >
                {monthName}  
            </div>
        );
    }




    useEffect(() => {
        if (isSecondDisplay !== "grid") return;

        const timeout = setTimeout(() => {
            const currentIndex =
                (currentDate.getFullYear() - 1970) * 12 +
                currentDate.getMonth();

            const el = monthRef.current?.querySelector(
                `[data-index="${currentIndex}"]`
            );

            el?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }, 0);

        return () => clearTimeout(timeout);
    }, [isSecondDisplay, currentDate]);

    let AllYears = [];

    const startYear = 1970;
    const totalYears = 200;


    const todayYear = today.getFullYear();

    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < totalYears; i++) {
        const year = startYear + i;

        const isToday = year === todayYear;
        const isSelected = year === currentYear;

        AllYears.push(
            <div
                key={i}
                data-index={i}
                onClick={() => {
                    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                    setMode("year");
                    setIsSecondDisplay("grid");
                    setIsThirdDisplay("none");
                    index.current -= 1;
                }}
                className={`year-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
            >
                {year}
            </div>
        );
    }

    useEffect(() => {
        if (isThirdDisplay !== "grid") return;

        const timeout = setTimeout(() => {
            const currentIndex = currentDate.getFullYear() - 1970;

            const el = yearRef.current?.querySelector(
                `[data-index="${currentIndex}"]`
            );

            el?.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }, 0);

        return () => clearTimeout(timeout);
    }, [isThirdDisplay, currentDate]);

    return (
        <div className={classNames}>
            <div className="calendar-top-bg"></div>

            <div className='calendar-header'>
                <div className='header-day'>{isDay},</div>
                <div className='header-month'>{isDayNumber}</div>
                <div className='header-year'>{isMonth}</div>
            </div>

            <div className="calendar-body">
                <div className='calendar-day-year'>
                    <div className='head-day-year' onClick={HandleClickChangeMonthYear}>
                        <div className='month-year' style={{ display: isYearMonthDisplay }}>{isCallndarMonth} {isCallendarYear}</div>
                        <div className='month-year' style={{ display: isYearDisplay }}>{isCallendarYear}</div>
                    </div>
                    <div className='change-month'>
                        <div className='bottom' onClick={HandleClickChangeDateDown}>v</div>
                        <div className='top' onClick={HandleClickChangeDateUp}>v</div>
                    </div>
                </div>
                <div className="weekdays-row">
                    {weekDays.map(day => (
                        <div key={day} className="weekday-name" style={{ display: isFirstDisplay }}>{day}</div>
                    ))}
                </div>

                <div className={daysGridClass} style={{ display: isFirstDisplay }}>
                    {daysGrid}
                </div>

                <div className='selection-month' ref={monthRef} style={{ display: isSecondDisplay }}>
                    {AllMonth}
                </div>
                <div className='selection-year' ref={yearRef} style={{ display: isThirdDisplay }}>
                    {AllYears}
                </div>

            </div>
        </div>
    );
}