import { Injectable } 		from '@angular/core';

import { Observable } 		from 'rxjs/Observable';
import { Subject }				from 'rxjs/Subject';
import { BehaviorSubject } 	from 'rxjs/Rx';

import { Moment } 				from 'moment';

import { EmEvent } 					from './event';
import { EventBuffer } 		from './event-buffer';

import { BackendService } from './backend.service';
import { Logger } 				from './logger.service';

declare const moment:any;

@Injectable()
export class EventService {


	// TODO: understand
	private _eventBuffer: EventBuffer = {};
	private _bufferStartDate: Moment;
	private _defaultBufferSize: number = 14;

	public getEventsByDay( day: Moment ): EmEvent[] {

		const dayISOString = day.clone().startOf('day').format();
		return this._eventBuffer[ dayISOString ];

	}

	constructor( 
	 private backend: BackendService,
	 private logger: Logger ) {

		this._init();
		
	}

	private _init(): void {

		this._bufferStartDate = moment().startOf('day');

		// FIXME: hardcoded
		let start = moment().startOf('day');
		let end = start.clone().add( this._defaultBufferSize - 1, 'days' );
		this._loadEventsIntoBuffer( start, end );
	}


	private _sortEventIntoBuffer( event:EmEvent): void {

		let eventISODateString = event.start.clone().startOf('day').format();

		if ( this._eventBuffer[ eventISODateString ] === undefined ) {
			this._eventBuffer[ eventISODateString ] = [];
		}
		this._eventBuffer[ eventISODateString ].push(event);

	}

	private _observableErrorHandler(error:any): Observable<any> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  	this.logger.error(errMsg);
    return Observable.throw(errMsg);
  }
	
	private _getEvents( start: Moment, end: Moment ): Observable<EmEvent> {

		return this.backend.getEvents( start, end );
	}

	private _loadEventsIntoBuffer( start: Moment, end: Moment ): void {

		this._getEvents(start, end)
			.subscribe( 
			  ( event:EmEvent ) => this._sortEventIntoBuffer( event ),
			  ( error: any ) => this._observableErrorHandler( error )
			);

	}
}