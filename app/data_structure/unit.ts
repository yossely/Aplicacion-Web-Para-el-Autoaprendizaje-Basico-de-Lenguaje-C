import { Lesson } from './lesson';

export interface Unit {
	_id: number;
	title: string;
	lessons: Lesson[];
}