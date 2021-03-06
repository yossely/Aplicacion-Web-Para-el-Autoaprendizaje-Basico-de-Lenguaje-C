import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

/**
 * There can be only one owner for a declared component.
 *     Eg. In this case, we were importing unitsListComponent and unitDetailsComponent in the main appModule, 
 *         now, as we create this new unitsModule, we import these components here and pass them to the main
 *         appModule.
 */
import { LessonsMainComponent }  from './lessons-main.component';
import { LessonDetailsComponent }  from './lesson-details.component';
import { ExplanationMainComponent }  from '../explanation/explanation-main.component';
import { ExplanationContentComponent }  from '../explanation/explanation-content.component';
import { ExampleComponent }  from '../example/example.component';
import { ExercisesComponent }  from '../exercises/exercises.component';
import { ProblemComponent }  from '../problem/problem.component';
import { NavbarLessonsComponent }  from './navbar-lessons.component';
import { UserProgressComponent }  from './user-progress.component';

/**
 * Imports needed to create and configure Ace Code Editor 
 */
import 'brace';
import { AceEditorComponent } from 'ng2-ace-editor';

/**
 * Routes provided by feature modules (unitsModule) will be combined together into their imported module's 
 * routes (AppModule) by the router. This allows us to continue defining our feature module routes without 
 * modifying our main route configuration.
 */
import { lessonsRoutingModule } from './lessons-routing.module';

import { UnitsService } from './units.service';
import { ErrorHandlingService } from '../problem/error-handling.service';
import { CheckPrintfService } from '../problem/check-printf.service';
import { MarkdownParserService } from '../markdown/markdown-parser.service';
import { UserProgressService } from './user-progress.service';

import { TestComponent } from '../test/test.component';
import { TestDetailsComponent } from '../test/test-details.component';
import { TestsService } from '../test/tests.service';
import { UserTestsInfoService } from '../test/user-tests-info.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TabsModule.forRoot(),
        lessonsRoutingModule,
        ProgressbarModule.forRoot(),
        AlertModule.forRoot()
    ],
    declarations: [
        LessonDetailsComponent,
        NavbarLessonsComponent,
        LessonsMainComponent,
        ExplanationMainComponent,
        ExplanationContentComponent,
        ExampleComponent,
        ExercisesComponent,
        ProblemComponent,
        AceEditorComponent,
        UserProgressComponent,
        TestComponent,
        TestDetailsComponent
    ],
    providers: [
        UnitsService,
        MarkdownParserService,
        ErrorHandlingService,
        CheckPrintfService,
        UserProgressService,
        TestsService,
        UserTestsInfoService
    ]
})
export class LessonsModule {}