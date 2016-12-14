import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { appRoutingModule } from './app-routing.module';

import { AppComponent }   from './app.component';

// Handle the Learning process
import { LessonsModule } from '../lessons/lessons.module';

// Handle all the basic views in the application (Home, Content, About)
import { BaseModule } from '../base/base.module';

@NgModule({
    imports: [ 
        BrowserModule, 
        FormsModule, 
        HttpModule, 
        appRoutingModule, 
        BaseModule,
        LessonsModule
    ],
    declarations: [ 
        AppComponent
    ],
    bootstrap: [ 
        AppComponent 
    ]
})
export class AppModule { }