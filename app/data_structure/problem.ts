export interface Problem {
	statement: string;
	code: string;
    solutionSteps: string[];
    consoleId: string;
    consoleOutput: string;
    expectedOutput: string;
    // To evaluate the problem of a test
    realOutput: string;
    points: number;
    completed: boolean;
}