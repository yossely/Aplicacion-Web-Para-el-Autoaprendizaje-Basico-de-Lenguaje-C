import { Explanation } from './explanation';
import { Problem } from './problem';

export interface Lesson {
	_id: number;
	title: string; //short title
	content: string; //content to display on /niveles
	explanation: string;
	example: Problem;
	exercises: Problem[];
}