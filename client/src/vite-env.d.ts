/// <reference types="vite/client" />

interface IUser {
    id: number;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    avatar: string;
}

interface IDrink {
    id: number;
    name: string;
    category: string;
    instructions: string;
    img: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}
