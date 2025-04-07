export interface UserLink {
    name: string, link?: string; userEmail?: string;
}

export interface UserData {
    name: string;
    email: string;
    password: string;
    role?: string;
    links?: UserLink[];
}

export interface FormLinkElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    userEmail: HTMLInputElement;
    link: HTMLInputElement;
}
export interface LinkFormElement extends HTMLFormElement {
readonly elements: FormLinkElements;
}

export interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
}
export interface CreateUserFormElement extends HTMLFormElement {
readonly elements: FormElements;
}