export interface ValidationResult {
	isValid: boolean;
	errors: { [key: string]: string };
}

export interface ValidationRule {
	required?: boolean;
	pattern?: RegExp;
	minLength?: number;
	maxLength?: number;
	message?: string;
}
export interface ValidationConfig {
	[key: string]: ValidationRule;
}
