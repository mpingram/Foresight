"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var logger_service_1 = require('./logger.service');
// FIXME: mock
var BackendService = (function () {
    function BackendService(logger) {
        this.logger = logger;
        // event generator
        // ------------------------
        this.eventTitlePool = ['Rap', 'Classical Music', 'Sting and the Police', 'Baby', 'Pillow', 'Chromolithograph', 'Men', 'Bath', 'German', 'Grasshopper', 'Peer-to-Peer', 'Forestry', 'Paramedic', 'Hot Doctor', 'Jellyfish', 'Angry Bears', 'Intersectionality', 'Shirt', 'Astronaut', 'Duck', 'Fashion', 'Gentrification', 'Yoga', 'Dance', 'Balloon'];
        this.eventSubtitlePool = ['in the Hood', 'Burlesque', 'Conference', 'Discussion', 'Lecture', 'Meeting', 'Round Table', 'Viewing', 'Competition', 'Battle', ': an Exploration', 'and the Sorcerer\'s Stone', 'Class', 'Intervention', '-splaining', 'Brunch', 'Coast to Coast', 'Meditation', 'Fight', 'Teleconference', 'Reading', 'Punching', 'Dissection', 'Marathon'];
        this.firstNamePool = ['Richard', 'Flingus', 'Sid', 'Ebenezer', 'Rocky', 'Dontae', 'Margarette', 'Robin', 'Willow', 'Ola', 'Bonnie', 'Nicole', 'Diana', 'Dianna', 'Diananana', 'Michael', 'Jareth'];
        this.lastNamePool = ['Nye', 'Hatfield', 'Herring', 'Lee', 'Li', 'Heaton', 'Cohen', 'Tomlinson', 'Brenner', 'Butler', 'King', 'Morris', 'Bungleton', 'Powerhat', 'Dolphin', 'the Goblin King', 'Goethe', 'Yang', 'Brown', 'Foghorn', 'Colton', 'Dongus'];
        this.resourcesPool = ['EI', 'EII', 'EIII', 'EIV', 'WIa', 'WIb', 'WII', 'WIII', 'WIV', 'Lobby', 'Library', '120', '129'];
        this.eventTypePool = ['Class', 'Meeting', 'Internal Event', 'External Event'];
    }
    BackendService.prototype.getEvents = function (rangeStart, rangeEnd) {
        var eventObservable;
        if (rangeStart.isAfter(rangeEnd)) {
            var errorMessage = 'Incorrect Moment arguments @ backendService.getEvents';
            eventObservable = Observable_1.Observable.throw(errorMessage);
        }
        else {
            var eventArray = this.generateEventArray(rangeStart, rangeEnd);
            eventObservable = Observable_1.Observable.from(eventArray);
            this.logger.log("Fetched " + eventArray.length + " events");
        }
        return eventObservable;
    };
    BackendService.prototype.selectFrom = function (arr) {
        var len = arr.length;
        var selection = Math.floor(Math.random() * len);
        return arr[selection];
    };
    BackendService.prototype.selectFromAndRemove = function (arr) {
        var len = arr.length;
        var selection = Math.floor(Math.random() * len);
        var output = arr[selection];
        // side effect: remove selection from array
        arr = arr.slice(0, selection).concat(arr.slice(selection + 1));
    };
    BackendService.prototype.shallowCopyArray = function (arr) {
        return arr.slice();
    };
    BackendService.prototype.generateHumanName = function () {
        return this.selectFrom(this.firstNamePool) + ' ' + this.selectFrom(this.lastNamePool);
    };
    BackendService.prototype.generateEventName = function () {
        return this.selectFrom(this.eventTitlePool) + ' ' + this.selectFrom(this.eventSubtitlePool);
    };
    BackendService.prototype.generateEvent = function (start, end, availResources) {
        var event = {
            id: Math.ceil(Math.random() * 10000000).toString(16),
            name: this.generateEventName(),
            organizer: this.generateHumanName(),
            start: start,
            end: end,
            repeating: false,
            primaryResource: this.selectFrom(availResources)
        };
        return event;
    };
    BackendService.prototype.generateEventArray = function (rangeStart, rangeEnd) {
        var events = [];
        // set rangeStart to 12am on day of rangeStart,
        // set rangeEnd to 11:59pm on day of rangeEnd
        rangeStart.startOf('day');
        rangeEnd.endOf('day');
        var currentDay = rangeStart.clone();
        while (currentDay.isBefore(rangeEnd)) {
            for (var startTime = 8; startTime < 16; startTime += 4) {
                var availResources = this.shallowCopyArray(this.resourcesPool);
                var eventStart = currentDay.clone();
                var eventEnd = currentDay.clone();
                eventStart.hour(startTime);
                eventEnd.hour(startTime).add(2, 'hours');
                while (Math.random() > 0.1) {
                    var event_1 = this.generateEvent(eventStart, eventEnd, availResources);
                    events.push(event_1);
                }
            }
            // increment while loop
            currentDay.add(1, 'day');
        }
        return events;
    };
    BackendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logger_service_1.Logger])
    ], BackendService);
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map