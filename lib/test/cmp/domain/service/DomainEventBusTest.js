"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _DomainEventBus = _interopRequireDefault(require("../../../../cmp/domain/event_bus/DomainEventBus"));

/* eslint-disable no-alert, no-console */
describe('DomainEventBus test', function () {
  beforeEach(function () {
    _DomainEventBus.default.clearAllObservers();
  });
  describe('Given invalid register parameters', function () {
    it('Should fail if eventName is not present', function (done) {
      try {
        _DomainEventBus.default.register({
          eventName: undefined,
          observer: undefined
        });

        done(new Error('Should fail'));
      } catch (error) {
        done();
      }
    });
    it('Should fail if observer is not a function', function (done) {
      try {
        _DomainEventBus.default.register({
          eventName: 'givenEvent',
          observer: undefined
        });

        done(new Error('Should fail'));
      } catch (error) {
        done();
      }
    });
    it('Should return 0 when calling getNumberOfRegisteredEvents if there is no events registered', function (done) {
      _DomainEventBus.default.clearAllObservers();

      var result = _DomainEventBus.default.getNumberOfRegisteredEvents();

      (0, _chai.expect)(0).equal(result);
      done();
    });
    it('Should return 0 when calling getNumberOfObserversRegisteredForAnEvent if there is no events registered', function (done) {
      _DomainEventBus.default.clearAllObservers();

      var givenEventName = 'nonExistingEvent';

      var result = _DomainEventBus.default.getNumberOfObserversRegisteredForAnEvent({
        eventName: givenEventName
      });

      (0, _chai.expect)(0).equal(result);
      done();
    });
  });
  describe('Given a registered DomainEventBus', function () {
    var observerSpy = _sinon.default.spy();

    beforeEach(function () {
      observerSpy.reset();
    });
    it('Should clear all observers', function (done) {
      (0, _chai.expect)(_DomainEventBus.default.getNumberOfRegisteredEvents()).equal(0);
      done();
    });
    it('Should execute all observers related to an event', function (done) {
      var givenEventName = 'givenEventName';
      var domainEvent = {
        eventName: givenEventName,
        payload: '1'
      };

      _DomainEventBus.default.register({
        eventName: givenEventName,
        observer: observerSpy
      });

      _DomainEventBus.default.register({
        eventName: givenEventName,
        observer: observerSpy
      });

      _DomainEventBus.default.raise({
        domainEvent: domainEvent
      });

      (0, _chai.expect)(observerSpy.getCalls().length).equal(2);
      (0, _chai.expect)(observerSpy.getCall(0).args[0].payload).equal(domainEvent.payload);
      (0, _chai.expect)(observerSpy.getCall(1).args[0].payload).equal(domainEvent.payload);
      (0, _chai.expect)(_DomainEventBus.default.getNumberOfRegisteredEvents()).equal(1);
      (0, _chai.expect)(_DomainEventBus.default.getNumberOfObserversRegisteredForAnEvent({
        eventName: givenEventName
      })).equal(2);
      done();
    });
  });
  describe('Given 1 event with 1 subscriber which has a dispatcher to raise a second event with another subscriber', function () {
    it('Should be raised event 2 by subscriber 1 when event 1 is raised', function (done) {
      var givenEvent1Name = 'event-1';
      var event1DomainEvent = {
        eventName: givenEvent1Name,
        payload: 'event-1-payload'
      };
      var givenEvent2Name = 'event-2';
      var event2DomainEvent = {
        eventName: givenEvent2Name,
        payload: 'event-2-payload'
      };
      var observer1 = {
        getObserverFunction: function getObserverFunction(_ref) {
          var payload = _ref.payload,
              dispatcher = _ref.dispatcher;
          dispatcher(event2DomainEvent);
        }
      };
      var observer2 = {
        getObserverFunction: function getObserverFunction(_ref2) {
          var payload = _ref2.payload,
              dispatcher = _ref2.dispatcher;
        }
      };

      var spy1 = _sinon.default.spy(observer1, 'getObserverFunction');

      var spy2 = _sinon.default.spy(observer2, 'getObserverFunction');

      _DomainEventBus.default.register({
        eventName: givenEvent1Name,
        observer: observer1.getObserverFunction
      });

      _DomainEventBus.default.register({
        eventName: givenEvent2Name,
        observer: observer2.getObserverFunction
      });

      _DomainEventBus.default.raise({
        domainEvent: event1DomainEvent
      });

      (0, _chai.expect)(_DomainEventBus.default.getNumberOfRegisteredEvents()).equal(2);
      (0, _chai.expect)(spy1.calledOnce).equal(true);
      (0, _chai.expect)(spy1.getCall(0).args[0].payload).equal(event1DomainEvent.payload);
      (0, _chai.expect)(spy1.getCall(0).args[0].dispatcher).is.a('function');
      (0, _chai.expect)(spy2.calledOnce).equal(true);
      (0, _chai.expect)(spy2.getCall(0).args[0].payload).equal(event2DomainEvent.payload);
      (0, _chai.expect)(spy2.getCall(0).args[0].dispatcher).is.a('function');
      done();
    });
  });
  describe('Given 1 event with 2 subscribers, one of them causing an error', function () {
    it('Should execute the non failing subscriber smoothly and log the error', function (done) {
      var givenEvent1Name = 'event-1';
      var event1DomainEvent = {
        eventName: givenEvent1Name,
        payload: 'event-1-payload'
      };
      var observer1 = {
        getObserverFunction: function getObserverFunction(_ref3) {
          var payload = _ref3.payload,
              dispatcher = _ref3.dispatcher;
          // observer1 will fail
          throw new Error('expected error');
        }
      };
      var observer2 = {
        getObserverFunction: function getObserverFunction(_ref4) {// observer2 will work

          var payload = _ref4.payload,
              dispatcher = _ref4.dispatcher;
        }
      };

      var spy1 = _sinon.default.spy(observer1, 'getObserverFunction');

      var spy2 = _sinon.default.spy(observer2, 'getObserverFunction');

      var errorObserver = function errorObserver(payload) {
        console.log('ERROR_EVENT TEST: ', payload);
      };

      _DomainEventBus.default.register({
        eventName: 'ERROR_EVENT',
        observer: errorObserver
      });

      _DomainEventBus.default.register({
        eventName: givenEvent1Name,
        observer: observer1.getObserverFunction
      });

      _DomainEventBus.default.register({
        eventName: givenEvent1Name,
        observer: observer2.getObserverFunction
      });

      _DomainEventBus.default.raise({
        domainEvent: event1DomainEvent
      });

      (0, _chai.expect)(_DomainEventBus.default.getNumberOfRegisteredEvents()).equal(2);
      (0, _chai.expect)(_DomainEventBus.default.getNumberOfObserversRegisteredForAnEvent({
        eventName: givenEvent1Name
      })).equal(2);
      (0, _chai.expect)(spy1.calledOnce).equal(true);
      (0, _chai.expect)(spy2.calledOnce).equal(true);
      done();
    });
  });
});