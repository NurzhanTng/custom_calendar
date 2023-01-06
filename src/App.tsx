import React, {useState} from 'react';
import Calendar from "./components/calendar/Calendar";
import {formatDate} from "./utils/helpers/date";

import './static/css/global.css'

export  const App: React.FC = () => {
  const [selectedDate, selectDate] = useState(new Date());

  return (
    <div className="app__container">
      <div className='date__container'>{formatDate(selectedDate, 'DD MM YYYY')}</div>
      <Calendar selectedDate={selectedDate} selectDate={selectDate} />
    </div>
  );
}

export default App;
