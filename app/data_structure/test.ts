import { Problem } from './problem';

export interface Test {
    id: number;
    title: string;
    problems: Problem[];
    userScore: number;
}