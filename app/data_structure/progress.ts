export interface Progress {
    unitId: number;
    lessonId: number;
    lessonTitle: string;
    isCompleted: boolean;
    isCurrent: boolean;

    /* Block forward units if the user does not approve a test */
    isBlocked: boolean;
    isTest: boolean;
    testId: number;
    testTitle: string;
}