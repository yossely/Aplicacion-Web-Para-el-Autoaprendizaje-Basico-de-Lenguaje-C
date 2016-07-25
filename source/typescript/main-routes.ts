import { RouterConfig }  from '@angular/router';
import { MainComponent } from './main.component';
import { LessonComponent }   from './lesson.component';
import { NullComponent }   from './null.component';

export const mainRoutes: RouterConfig = [
	{ 
		path: 'main', 
		component: MainComponent,
		children: [
			{ path: ':id', component: LessonComponent },
			{ path: '', component: NullComponent }
		]
	}
];