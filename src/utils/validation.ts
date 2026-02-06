import type { ContactFormData, FormErrors } from '../interfaces';

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

export const validateContactForm = (data: ContactFormData, t: (key: string) => string): FormErrors => {
    const errors: FormErrors = {};

    if (!data.name || data.name.trim().length < 2) {
        errors.name = t('contact.form.errors.name');
    }

    if (!data.email || !validateEmail(data.email)) {
        errors.email = t('contact.form.errors.email');
    }

    if (data.phone && !validatePhone(data.phone)) {
        errors.phone = 'Por favor ingresa un teléfono válido';
    }

    if (!data.projectType) {
        errors.projectType = t('contact.form.errors.projectType');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.message = t('contact.form.errors.message');
    }

    return errors;
};

export const hasFormErrors = (errors: FormErrors): boolean => {
    return Object.keys(errors).length > 0;
};
