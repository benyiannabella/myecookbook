import Translation from '../models/Translation';
import { translations } from './translations';

export const getFieldTranslation = (
	translations: Translation[],
	field: string,
	language: string
) => {
	return language === 'En'
		? translations.find((t) => t.field === field)?.enText
		: translations.find((t) => t.field === field)?.roText;
};
