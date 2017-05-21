import { Injectable } from '@angular/core';


@Injectable()
export class ErrorHandlingService{

    constructor() {
    }

    removeNeedlessInformation(errorMessage: string){
        
        errorMessage = errorMessage.replace(/user_code_folder\/user_code.c:/g, '');
        errorMessage = errorMessage.replace(/ERROR:root:compiler frontend failed to generate LLVM bitcode, halting/g, '');

        return errorMessage;
    }
}