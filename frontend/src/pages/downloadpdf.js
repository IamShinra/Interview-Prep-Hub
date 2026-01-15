import React from 'react'

function Downloadpdf() {
  return (
    <div>downloadpdf</div>
  )
}

export default Downloadpdf
// // import React, { useRef } from 'react'
// // import html2canvas from 'html2canvas'
// // import jsPDF from 'jspdf'

// // function Downloadpdf() {
// //     const pdfRef = useRef();
// //     const createPdf = () => {
// //         const input = pdfRef.current;
// //         html2canvas(input).then((canvas) => {
// //             const imgData = canvas.toDataURL('image/png');
// //             const pdf = new jsPDF('p', 'mm', 'a4'); //orientation, unit, format
// //             const pdfWidth = pdf.internal.pageSize.getWidth();
// //             const pdfHeight = pdf.internal.pageSize.getHeight();
// //             const imgWidth = canvas.width;
// //             const imgHeight = canvas.height;
// //             const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
// //             const imgX = (pdfWidth - imgWidth * ratio) / 2;
// //             const imgY = 30;
// //             pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
// //             pdf.save("download.pdf");
// //         });
// //     }


// //     return (
// //         <>
// //             <div ref={pdfRef} className='p-5 m-2'>
// //                 <h1 className='text-2xl text-purple-800'>Download PDF</h1>
// //             </div>
// //             <div>
// //                 <button className='bg-sky-500' onClick={createPdf}>Download PDF</button>
// //             </div>
// //         </>
// //     )
// // }

// // export default Downloadpdf
// import dynamic from 'next/dynamic';
// import React, { useEffect, useState } from 'react'
// const InvoicedPdf = dynamic(() => import('./resume'), { ssr: false });

// function Downloadpdf() {
//     const [client, setClient] = useState(false);
//     useEffect(() => {
//         setClient(true);
//     }, []);

//     return (
//         <div>
//             <InvoicedPdf />
//         </div>
//     )
// }

// export default Downloadpdf