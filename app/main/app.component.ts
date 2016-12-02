import { Component } from '@angular/core';


@Component({
    selector: 'my-app',
    styleUrls: ['assets/css/base.css'],
    template: `
        <router-outlet></router-outlet>
        <!-- Routed views go here -->
    `
})

export class AppComponent { 
}