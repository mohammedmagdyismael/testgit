import React, { useState } from 'react'
import ViewYear from './ViewYear'
import ViewMonth from './ViewMonth'
import ViewWeek from './ViewWeek';
import ViewDay from './ViewDay';

import { VIEWS } from './constants';
import { SwitchButtons, ButtonContainer } from './ViewContainer.style'

const ViewContainer = () => {
    const [viewIndex, setViewIndex] = useState(2);
    const [year, setYear] = useState(2021);
    const [monthIndex, setMonthIndex] = useState(1);
    const [dayNumberInMonth, setDayNumberInMonth] = useState(1);

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
                return <ViewWeek monthIndex={monthIndex} defaultYear={year} />;
            case VIEWS.DAY:
                return <ViewDay monthIndex={monthIndex} defaultYear={year} day={dayNumberInMonth} />;
            default:
                break;
        }
    }

    const switchView = viewId => setViewIndex(viewId);

    return (
        <div>
            <SwitchButtons>
                <ButtonContainer onClick={() => switchView(VIEWS.YEAR)}><p>Year</p></ButtonContainer>
                <ButtonContainer onClick={() => switchView(VIEWS.MONTH)}><p>Month</p></ButtonContainer>
                <ButtonContainer onClick={() => switchView(VIEWS.WEEK)}><p>Week</p></ButtonContainer>
                <ButtonContainer onClick={() => switchView(VIEWS.DAY)}><p>Day</p></ButtonContainer>
            </SwitchButtons>
            <div>
                {renderView()}
            </div>
        </div>
    )
}

export default ViewContainer;