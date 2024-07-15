import Image from "next/image";
import QRCode from "../components/QRCode";

export default function Home() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen">
			<QRCode />
		</main>
	);
}
