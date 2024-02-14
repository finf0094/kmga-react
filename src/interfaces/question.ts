export interface IQuestion {
    id: string;
    title: string;
    options: {
        id: string;
        value: string;
        weight: number;
    }[];
}