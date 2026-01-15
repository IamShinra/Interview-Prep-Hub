import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const targetDate = new Date('2024-06-15T00:00:00');
  targetDate.setFullYear(targetDate.getFullYear() + 1);
  targetDate.setDate(targetDate.getDate() + 35);
  targetDate.setHours(targetDate.getHours() + 8);

  const calculateTimeRemaining = () => {
    const now = new Date();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      return {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const oneHourInMilliseconds = 60 * 60 * 1000;
    const oneMinuteInMilliseconds = 60 * 1000;

    const years = Math.floor(timeDifference / oneYearInMilliseconds);
    const remainingMilliseconds = timeDifference % oneYearInMilliseconds;
    const days = Math.floor(remainingMilliseconds / oneDayInMilliseconds);
    const remainingMilliseconds2 = remainingMilliseconds % oneDayInMilliseconds;
    const hours = Math.floor(remainingMilliseconds2 / oneHourInMilliseconds);
    const remainingMilliseconds3 = remainingMilliseconds2 % oneHourInMilliseconds;
    const minutes = Math.floor(remainingMilliseconds3 / oneMinuteInMilliseconds);
    const remainingMilliseconds4 = remainingMilliseconds3 % oneMinuteInMilliseconds;
    const seconds = Math.floor(remainingMilliseconds4 / 1000);

    return {
      years,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex flex-col'>
          <span className='text-xl font-bold'>DAYS: {timeRemaining.days}</span>
          <span className='text-xl font-semibold text-center'>
            {timeRemaining.hours}:{timeRemaining.minutes}:{timeRemaining.seconds}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CountdownTimer;
