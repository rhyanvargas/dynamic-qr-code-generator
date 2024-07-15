"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QRCodeSection() {
	const [inputText, setInputText] = useState<string>("");
	const [qrImage, setQrImage] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

	function isValidHttpUrl(string: string): boolean {
		try {
			const newUrl = new URL(string);
			return newUrl.protocol === "http:" || newUrl.protocol === "https:";
		} catch (err) {
			return false;
		}
	}

	const generateQR = async () => {
		if (isValidHttpUrl(inputText)) {
			try {
				const qr: string = await QRCode.toDataURL(inputText);
				setQrImage(qr);
				setErrMsg("");
				// setInputText("");
			} catch (err) {
				setQrImage("");
				setErrMsg("Failed to generate QR Code. Please try again.");
				if (err instanceof Error) console.error(err.message);
			}
		} else {
			setQrImage("");
			setErrMsg("This is not a valid URL. Please check the URL and try again.");
		}
	};

	const gradientBtn =
		"bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded-md";

	return (
		<section className="flex flex-col gap-y-4 w-full text-center max-w-sm">
			<h1 className="text-3xl font-extrabold mb-4">Rhy's QR Code Gen</h1>
			<p className="text-gray-500 mb-6">
				Enter a URL to generate a QR code. The QR code will be displayed below.
			</p>
			<input
				placeholder="Enter a URL"
				type="text"
				className="text-black text-lg p-4 border border-gray-300 rounded-md"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
			/>
			<button
				disabled={!inputText}
				className={`bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-bold py-2 px-4 rounded-md transition ease-in-out duration-150 ${
					!inputText
						? "opacity-50 cursor-not-allowed"
						: "active:hover:bg-blue-700"
				}`}
				onClick={generateQR}
			>
				Generate QR Code
			</button>
			{qrImage ? (
				<a
					className="w-full"
					href={inputText}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img src={qrImage} alt="QR Code" className="cursor-pointer w-full" />
				</a>
			) : (
				errMsg && <p className="text-red-600">{errMsg}</p>
			)}
		</section>
	);
}
