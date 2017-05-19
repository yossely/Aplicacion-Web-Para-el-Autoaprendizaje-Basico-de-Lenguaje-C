import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { TestsService } from '../test/tests.service';
import { Test } from '../data_structure/test';
import { UserProgressService } from '../lessons/user-progress.service'


@Injectable()
export class UserTestsInfoService{

    private _currentUserTestsInfo: Array<Test> = [];

    /**
     * Observable to emit the score changes of a test
     */
    scoreChange: Subject<number> = new Subject<number>();

    constructor(private _testsService:TestsService,
                private _userProgressService: UserProgressService){
        this._testsService.getAll().subscribe(
                newtest => this.addNewTest(newtest),
                error => console.log('error retrieving test in user-tests-info.service'),
                () => console.log('tests loaded successfully')
            );
    }

    /**
     * Add new test to initialize the whole array that holds an user test info (id and score)
     */
    public addNewTest( newTest: Test){

        this._currentUserTestsInfo.push( <Test>({
            id: newTest.id,
            userScore: newTest.userScore
        }));
        console.log('and the test info is: ',this._currentUserTestsInfo);
    }

    /**
     * Update the score of the current test
     * 
     * @param {number} points Points to be added in the current test score
     */
    public updateScore( points: number){

        let newScore: number;
        let testId = this._userProgressService.getCurrentTestId();

        this._currentUserTestsInfo.filter( test => (test.id == testId))
                                  .map( test => {
                                        test.userScore += points;
                                        newScore = test.userScore;
                                        return test;
                                    });

        /* New score of the test after adding the points indicated */
        this.scoreChange.next(newScore);
    }

    /**
     * Get Test Score by test id
     * 
     * @param  {number} testId Test id of the score required
     * @return {number}        Score of the test
     */
    public getTestScore( testId: number): number{
        let score: number;

        this._currentUserTestsInfo.filter( test => (test.id == testId))
                                  .map( test => {
                                        score = test.userScore;
                                        return test;
                                    });

        return score;
    }

}

//-------------------------- FUNCTIONS ON --------------------------