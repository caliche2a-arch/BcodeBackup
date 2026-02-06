export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image?: string;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    projectType?: string;
    message: string;
}

export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    message?: string;
}
