import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LessonsMainComponent }  from './lessons-main.component';
import { LessonDetailsComponent }  from './lesson-details.component';

import { TestComponent }  from '../test/test.component';
import { TestDetailsComponent }  from '../test/test-details.component';

const lessonsRoutes: Routes = [
    { 
        path: 'unit/:id_unit/lesson/:id_lesson', 
        component: LessonsMainComponent,
        children: [
            {
                path: '',
                component: LessonDetailsComponent  
            }
        ] 
    },
    { 
        path: 'test/:id_test', 
        component: TestComponent,
        children: [
            {
                path: '',
                component: TestDetailsComponent  
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(lessonsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class lessonsRoutingModule { }