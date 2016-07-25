"use strict";
const main_component_1 = require('./main.component');
const lesson_component_1 = require('./lesson.component');
const null_component_1 = require('./null.component');
exports.mainRoutes = [
    {
        path: 'main',
        component: main_component_1.MainComponent,
        children: [
            { path: ':id', component: lesson_component_1.LessonComponent },
            { path: '', component: null_component_1.NullComponent }
        ]
    }
];

//# sourceMappingURL=maps/main-routes.js.map
