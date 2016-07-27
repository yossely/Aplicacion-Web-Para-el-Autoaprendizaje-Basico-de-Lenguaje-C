import { RouterConfig }  from '@angular/router';
import { MainComponent } from './main.component';
import { LessonComponent }   from './lesson.component';

export const mainRoutes: RouterConfig = [
	{ 
		path: 'unidad', 
		component: MainComponent,
		children: [
			{ path: ':id_unit/leccion/:id_lesson', component: LessonComponent }
		]
	}
];