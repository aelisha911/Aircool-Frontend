import { useEffect } from "react";

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

const GOOGLE_TAG_ID = "AW-18231129479";
const SCRIPT_ID = "google-tag-script";
const INLINE_ID = "google-tag-inline";

const GoogleTag = () => {
	useEffect(() => {
		if (document.getElementById(SCRIPT_ID)) {
			return;
		}

		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};

		const externalScript = document.createElement("script");
		externalScript.id = SCRIPT_ID;
		externalScript.async = true;
		externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
		document.head.appendChild(externalScript);

		const inlineScript = document.createElement("script");
		inlineScript.id = INLINE_ID;
		inlineScript.text = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${GOOGLE_TAG_ID}');
		`;
		document.head.appendChild(inlineScript);
	}, []);

	return null;
};

export default GoogleTag;
