import { useEffect } from "react";

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

const GOOGLE_ANALYTICS_ID = "G-EKNT9RXDEE";
const GOOGLE_ADS_ID = "AW-18231129479";
const SCRIPT_ID = "google-tag-script";
const INLINE_ID = "google-tag-inline";

const GoogleTag = () => {
	useEffect(() => {
		if (document.getElementById(SCRIPT_ID)) {
			return;
		}

		window.dataLayer = window.dataLayer || [];
		window.gtag = function gtag(...args: unknown[]) {
			window.dataLayer.push(args);
		};

		const externalScript = document.createElement("script");
		externalScript.id = SCRIPT_ID;
		externalScript.async = true;
		externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
		document.head.appendChild(externalScript);

		const inlineScript = document.createElement("script");
		inlineScript.id = INLINE_ID;
		inlineScript.text = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${GOOGLE_ANALYTICS_ID}');
			gtag('config', '${GOOGLE_ADS_ID}');
			gtag('config', '${GOOGLE_ADS_ID}/OqGvCO7w-uwcEIfro_VD', {
				'phone_conversion_number': '1300 019 568'
			});
		`;
		document.head.appendChild(inlineScript);
	}, []);

	return null;
};

export default GoogleTag;
