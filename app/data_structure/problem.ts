export interface Problem {
	statement: string;
	code: string;
    solutionSteps: string[];
    consoleId: string;
    consoleOutput: string;
    expectedOutput: string;
    originalCode: string; // To let the user restore the code back to the original
    // To evaluate the problem of a test
    realOutput: string;
    points: number;
    completed: boolean;
}