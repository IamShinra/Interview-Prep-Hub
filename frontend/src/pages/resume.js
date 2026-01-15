import React from 'react'

function Resume() {
  return (
    <div>resume</div>
  )
}

export default Resume

// import React, { useEffect, useRef, useState } from 'react'
// import { PDFViewer } from '@react-pdf/renderer';
// import MyPDF from './myPdf';

// function resume() {
//     // const pdfRef = useRef();
//     // const createPdf = () => {
//     //     const input = pdfRef.current;
//     //     html2canvas(input).then((canvas) => {
//     //         const imgData = canvas.toDataURL('image/png');
//     //         const pdf = new jsPDF('p', 'px', 'a4'); //orientation, unit, format
//     //         let pdfWidth = pdf.internal.pageSize.getWidth();
//     //         let pdfHeight = pdf.internal.pageSize.getHeight();
//     //         const imgWidth = canvas.width;
//     //         const imgHeight = canvas.height;
//     //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//     //         const imgX = (pdfWidth - imgWidth * ratio) / 2;
//     //         const imgY = 30;
//     //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
//     //         pdf.save("download.pdf");
//     //     });
//     // }
//     const [client, setClient] = useState(false);
//     useEffect(() => {
//         setClient(true);
//     }, []);

//     return (
//         <PDFViewer>
//             <MyPDF />
//         </PDFViewer>
//     )
// }

// export default resume
