import { NgModule } 					from '@angular/core';
import { BrowserModule } 			from '@angular/platform-browser';

import { AppComponent } 			from './app.component';
import { routing, 
				appRoutingProviders } from './app.routing';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceViewerComponent } from './dashboard/resource-viewer/resource-viewer.component';
import { EventViewerComponent } from './dashboard/event-viewer/event-viewer.component';
import { EventListComponent } from './dashboard/event-viewer/event-list/event-list.component';
import { EventListDayComponent } from './dashboard/event-viewer/event-list/event-list-day.component';
import { EventListItemComponent } from './dashboard/event-viewer/event-list/event-list-item.component';

import { SlideDownDirective }			from './shared/slide-down.directive';

@NgModule({
	imports: [
		BrowserModule,
		routing
	],
	// FIXME: organize into feature modules? Cut down on the # of components?
	declarations:[
		AppComponent,
		DashboardComponent,
		ResourceViewerComponent,
		EventViewerComponent,
		EventListComponent,
		EventListDayComponent,
		EventListItemComponent,

		SlideDownDirective,
	],
	providers:[
		appRoutingProviders
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
