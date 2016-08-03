import { Lesson } from './lesson';

export interface Unit {
	id: number;
	title: string;
	lessons: Lesson[];
}