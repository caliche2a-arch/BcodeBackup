import type { ContactFormData } from '../interfaces';

export const submitContactForm = async (
    data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Contact form submitted:', data);

        return {
            success: true,
            message: '¡Gracias por contactarnos! Te responderemos pronto.',
        };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return {
            success: false,
            message: 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.',
        };
    }
};
