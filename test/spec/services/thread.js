'use strict';

describe('Service: Thread', function () {

  // load the service's module
  beforeEach(module('rtfmApp'));

  // instantiate service
  var Thread;
  beforeEach(inject(function (_Thread_) {
    Thread = _Thread_;
  }));

  it('should do something', function () {
    expect(!!Thread).toBe(true);
  });

});
