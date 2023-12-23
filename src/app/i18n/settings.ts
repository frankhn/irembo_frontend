export const fallbackLng = "en";
export const languagesLabels = [
	{ label: "English", value: fallbackLng },
	{ label: "Français", value: "fr" },
];
export const languages = Object.entries(languagesLabels).map(
	(language) => language[1]?.value
);

export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
	return {
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}
