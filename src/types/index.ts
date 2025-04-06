export interface User {
    id: string;
    username: string;
    email: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface RegisterResponse {
    user: User;
}

export interface LinksResponse {
    links: Array<{
        id: string;
        title: string;
        url: string;
    }>;
}