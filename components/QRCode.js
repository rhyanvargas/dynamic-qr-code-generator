"use client";

import { useState } from 'react';
import QRCode from 'qrcode';


export default function QRCodeSection() {
    const [inputText, setInputText] = useState('');
    const [qrImage, setQrImage] = useState('');

    const generateQR = async () => {
        try {
            // Check if inputText starts with "https://www", if not, prepend it.
            const formattedText = inputText.startsWith('https://www') ? inputText : `https://www.${inputText}`;
            const qr = await QRCode.toDataURL(formattedText);
            setQrImage(qr);
        } catch (err) {
            console.error(err);
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
            {qrImage && <img src={qrImage} alt="Generated QR Code" />}
        </div>
    );
}
