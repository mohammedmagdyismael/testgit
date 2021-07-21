import React, { useState } from 'react'
import ViewYear from './ViewYear'
import ViewMonth from './ViewMonth'
import ViewWeek from './ViewWeek';
import ViewDay from './ViewDay';

import { VIEWS } from './constants';

const ViewContainer = () => {
    const [viewIndex, setViewIndex] = useState(0);
    const [year, setYear] = useState(2021);
    const [monthIndex, setMonthIndex] = useState(1);

    const onClickMonth = (year, monthIndex) => {
        setYear(year);
        setMonthIndex(monthIndex);
        setViewIndex(VIEWS.MONTH);
    }

    const renderView = () => {
        switch (viewIndex) {
            case VIEWS.YEAR:
                return <ViewYear onClickMonth={onClickMonth} />;
            case VIEWS.MONTH:
                return <ViewMonth monthIndex={monthIndex} defaultYear={year} setYear={setYear} />;
            case VIEWS.WEEK:
                return <ViewWeek />;
            case VIEWS.DAY:
                return <ViewDay />;
            default:
                break;
        }
    }

    return (
        <div>
            {renderView()}
        </div>
    )
}

export default ViewContainer;