import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LessonsMainComponent }  from './lessons-main.component';
import { LessonDetailsComponent }  from './lesson-details.component';


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