export interface UserLink {
    name: string,
    link?: string;
    userEmail?: string;
    category?: string;
}

export interface User {
    password: string;
    email: string;
}

export interface NewCompany {
    name: string;
    cnpj: string;
    code: string;
    active: boolean;
}

export interface Company extends NewCompany {
    _id: string;
}

export interface NewUser {
    name: string;
    email: string;
    password: string;
    company?: string | null;
}

export interface UserData {
    _id: string;
    name: string;
    email: string;
    password: string;
    company?: Company
    role?: string;
    links?: UserLink[];
    active?: boolean;
}

export interface SignInElements extends HTMLFormControlsCollection {
    password: HTMLInputElement;
    email: HTMLInputElement;
}
export interface LoginFormElement extends HTMLFormElement {
readonly elements: SignInElements;
}

export interface FormLinkElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    userEmail: HTMLInputElement;
    link: HTMLInputElement;
    category: HTMLSelectElement;
}
export interface LinkFormElement extends HTMLFormElement {
readonly elements: FormLinkElements;
}

export interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    company?: HTMLSelectElement;
}
export interface CreateUserFormElement extends HTMLFormElement {
readonly elements: FormElements;
}