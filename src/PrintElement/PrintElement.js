import React, { useEffect } from 'react'
import Logo from './logo512.png';
import { Wrapper } from './PrintElement.style';
// import './PrintElement.css'

const PrintElement = () => {
    const onClickPrint = () => {
        /* const printContents = document.getElementById('print-this').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;    */
        const mywindow = window.open();
        mywindow.document.write('<html><head><style>');
        mywindow.document.write('#Image{width:135px;margin:0 auto}#Container{display:flex;flex-direction:column;border:1px solid;border-radius:8px;width:fit-content;margin:0 auto}#BigText{margin:0;text-align:center;font-size:50px;font-weight:700;color:red}#MediumText{margin:0;text-align:center;font-size:25px;font-weight:700;color:#00f}#SmallText{margin:0;text-align:center;font-size:12px;font-weight:700;color:#64a310}#PrintLink{cursor:pointer;margin:25px 0;text-align:center;font-size:24px;font-weight:700}');
        mywindow.document.write('</style>');
        mywindow.document.write('</head><body>');
        mywindow.document.write(document.getElementById("print-this").innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
    }

    const focusing = () => {
        const el = document.getElementById('scroller');

        if (el) {
            el.focus();
        }
    }
    
    return (
        <Wrapper>
            <p onClick={() => focusing()}>I'm Out</p>  
            <div style={{ padding: '10px', outline: 'none' }} id='scroller' tabindex="-1">
                <div id='print-this'>
                    <div id='Container'>
                        <img id='Image' src="http://localhost:3000/static/media/logo512.260d5758.png" alt='img' />
                        <p id='BigText'>Big Text</p>
                        <p id='MediumText'>Medium Text</p>
                        <p id='SmallText'>Small Text</p>
                        <p id='BigText'>Big Text</p>
                        <p id='MediumText'>Medium Text</p>
                        <p id='SmallText'>Small Text</p>
                    </div>
                </div>
                <p id='PrintLink' onClick={() => onClickPrint()}>
                    Print
                </p>
            </div>
        </Wrapper>
    )
}

export default PrintElement;