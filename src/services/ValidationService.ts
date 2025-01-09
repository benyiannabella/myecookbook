import { ValidationConfig, ValidationResult } from '../models/ValidationResult';

export const validateFormData = (
	data: { [key: string]: any },
	config: ValidationConfig
): ValidationResult => {
	let isValid = true;
	const errors: { [key: string]: string } = {};

	for (const key in config) {
		const value = data[key];
		const rule = config[key];
		if (rule.required && (!value || value.trim() === '')) {
			isValid = false;
			errors[key] = rule.message || `${key} is required.`;
		}
		if (rule.pattern && value && !rule.pattern.test(value)) {
			isValid = false;
			errors[key] = rule.message || `Invalid ${key}.`;
		}
		if (rule.minLength && value && value.length < rule.minLength) {
			isValid = false;
			errors[key] =
				rule.message || `${key} must be at least ${rule.minLength} characters.`;
		}
		if (rule.maxLength && value && value.length > rule.maxLength) {
			isValid = false;
			errors[key] =
				rule.message ||
				`${key} must be less than ${rule.maxLength} characters.`;
		}
	}
	return { isValid, errors };
};
