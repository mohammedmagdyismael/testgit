import React, { useEffect } from 'react'
import Logo from './logo512.png';
import { Wrapper } from './PrintElement.style';
// import './PrintElement.css'

const PrintElement = () => {
    const onClickPrint = () => {
        if (window) {
        const mywindow = window.open();
        mywindow.document.write('<html><head><style>');
        mywindow.document.write('.container{display:flex;flex-direction:column;width:595px;margin:0 auto;display:none}.patient-details-container{display:flex;flex-direction:row;justify-content:space-between;margin-bottom:40px}.details{display:flex;flex-direction:column}.bold-title{font-weight:700;font-size:11px;line-height:18px;align-items:center;text-align:center;color:#000;text-align:left;margin:0}.light-detail{font-size:11px;line-height:18px;align-items:center;text-align:center;color:#000;text-align:left;margin:0}.table-item{width:16%}.table-first-item{text-align:left}.table-middle-item{text-align:left}.table-last-item{text-align:right}.table-header{display:flex;justify-content:space-between}.bold-separator{border:2px solid;border-width:2px 0 0 0;margin:8px 0}.table-row{display:flex;justify-content:space-between}.summary-container{display:flex;justify-content:flex-end}.summary-wrapper{width:50%}.summary-item{display:flex;flex-direction:row;justify-content:space-between}.bold-title-big{font-weight:700;font-size:14px;line-height:24px;align-items:center;text-align:center;color:#000;text-align:left;margin:0}');
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(document.getElementsByClassName("container")[0].innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        }
    }

    const focusing = () => {
        const el = document.getElementById('scroller');

        if (el) {
            el.focus();
        }
    }
    const x = '+20 100 123 45 67';
    return (
        <Wrapper>
            <div className='container'>
                <div>
                <div className='details-container'>
                    <div className='details'>
                    </div>
                    <div className='details'>
                        <p className='bold-invoice-title'>Invoice</p>
                    </div>
                </div>
                <div className='details-container'>
                    <div className='details'>
                        <p className='bold-title'>Entity Name</p>
                        <p className='light-detail'>Invoice # 29-00005</p>
                        <p className='light-detail'>Date 09.02.2022</p>
                    </div>
                    <div className='details'>
                        <p className='bold-title'>Bill to</p>
                        <p className='light-detail'>Fatima Abbar</p>
                        <p className='light-detail'>{x}</p>
                    </div>
                </div>
                <div className='table-container'>
                    <div className='table-header'>
                        <p className='bold-title table-item table-first-item'>Description</p>
                        <p className='bold-title table-item table-middle-item'>Qty</p>
                        <p className='bold-title table-item table-middle-item'>Price</p>
                        <p className='bold-title table-item table-middle-item'>Ins. Coverage</p>
                        <p className='bold-title table-item table-last-item'>Amount</p>
                    </div>
                    <div className='bold-separator'></div>
                    <div className='table-row'>
                        <p className='light-detail table-item table-first-item'>Examination</p>
                        <p className='light-detail table-item table-middle-item'>1</p>
                        <p className='light-detail table-item table-middle-item'>200.00 EGP</p>
                        <p className='light-detail table-item table-middle-item'>0.00 EGP</p>
                        <p className='light-detail table-item table-last-item'>200.00 EGP</p>
                    </div>
                    <div className='bold-separator'></div>
                    <div className='summary-container'>
                        <div className='summary-wrapper'>
                            <div className='summary-item'>
                                <p className='light-detail'>Discount</p>
                                <p className='light-detail'>100.00 EGP</p>
                            </div>
                            <div className='summary-item'>
                                <p className='light-detail'>Ins. Coverage</p>
                                <p className='light-detail'>100.00 EGP</p>
                            </div>
                            <div className='summary-item'>
                                <p className='bold-title-big'>Total</p>
                                <p className='bold-title-big'>600.00 EGP</p>
                            </div>
                        </div>
                    </div>
                
                </div>
                </div>
                    <div className='details-container'>
                        <div className='details'>
                            <p className='bold-title'>Contact</p>
                            <p className='light-detail'>+20 100 123 45 67</p>
                            <p className='light-detail'>Sheikh Al Zayad 1234, Nasr City, Cairo</p>
                        </div>
                    </div>
                
            </div>
            <p onClick={() => onClickPrint()}>Print</p>
        </Wrapper>
    )
}

export default PrintElement;