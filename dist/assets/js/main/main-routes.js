"use strict";
const main_component_1 = require('./main.component');
const lesson_component_1 = require('../lessons/lesson.component');
exports.mainRoutes = [
    {
        path: 'unidad',
        component: main_component_1.MainComponent,
        children: [
            { path: ':id_unit/leccion/:id_lesson', component: lesson_component_1.LessonComponent }
        ]
    }
];

//# sourceMappingURL=../maps/main/main-routes.js.map
