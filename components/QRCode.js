"use client";

import { useState } from 'react';
import QRCode from 'qrcode';


export default function QRCodeSection() {
    const [inputText, setInputText] = useState('');
    const [qrImage, setQrImage] = useState('');
    const errMsg = null;

    function isValidHttpUrl(string) {
      try {
        const newUrl = new URL(string);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
      } catch (err) {
        return false;
      }
    }
    
    const generateQR = async () => {
        if(isValidHttpUrl(inputText)) {     
            try {
                const qr = await QRCode.toDataURL(inputText);
                setQrImage(qr);
            } catch (err) {
                errMsg ="This is not a valid url. Please check the url and try again."
                console.error(errMsg);
            }      
        }
    };

    return (
        <div>
            <input
                type="text"
                className='text-black'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={generateQR}>Generate QR Code</button>
            {qrImage ? <img src={qrImage} alt="Generated QR Code" /> : errMsg && <p className='text-red'>{errMsg}</p>}
        </div>
    );
}
