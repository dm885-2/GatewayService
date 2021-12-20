import RiverSubscription from '../../src/rapid/RiverSubscription';
import rapid from '@ovcina/rapidriver';
import {expect} from '@jest/globals';
import uid from 'uid-safe';

jest.mock('@ovcina/rapidriver');
jest.mock('uid-safe');

describe('A RiverSubscription', () => {
  const host = 'amqp://127.0.0.1';
  const river = 'gateway';
  const callbackEvent = 'gatewayCallbackEvent';
  const sessionId = 1;
  const requestId = 1;

  let riverSubscription;

  beforeEach(async () => {
    rapid.subscribe.mockClear();
    rapid.publish.mockClear();
    uid.mockClear();

    // Initialise a new RiverSubscription.
    riverSubscription = new RiverSubscription(host, river, callbackEvent);
  });

  it('subscribes to the right host when initialising a new RiverSubscription.', () => {
    // Check if #subscribe was called with the right host argument.
    expect(rapid.subscribe).toHaveBeenCalledWith(host, expect.any(Array));
    expect(rapid.subscribe).toHaveBeenCalledTimes(1);
  });

  it('should add the function to the map when adding it with addCallback.', () => {
    // Mock the functions.
    uid.mockReturnValue(requestId);

    // Add a callback function.
    const callbackFn = jest.fn();
    riverSubscription.addCallback(sessionId, requestId, callbackFn);
    const anotherRequestId = 2;
    const anotherCallbackFn = jest.fn();
    riverSubscription.addCallback(sessionId, anotherRequestId, anotherCallbackFn);

    // Check if the callback exists in the map.
    expect(riverSubscription._callbacks[sessionId][requestId] === callbackFn).toBeTruthy();
    expect(riverSubscription._callbacks[sessionId][anotherRequestId] === anotherCallbackFn).toBeTruthy();
  });

  it('should execute the callback function when receiving the response with the same session and request ID.', () => {
    // Mock the functions.
    const callbackFn = jest.fn();
    riverSubscription.addCallback(sessionId, requestId, callbackFn);

    const res = {sessionId: sessionId, requestId: requestId};

    // Call the work function.
    riverSubscription._work(res);

    // Check if the corresponding callback function has been called.
    expect(callbackFn).toHaveBeenCalledTimes(1);
    expect(callbackFn).toHaveBeenCalledWith(res);
  });

  it('should delete the callback function after it has been executed when receiving the response with the same session and request ID.', () => {
    // Mock the functions.
    const callbackFn = jest.fn();
    riverSubscription.addCallback(sessionId, requestId, callbackFn);

    const res = {sessionId: sessionId, requestId: requestId};

    // Call the work function.
    riverSubscription._work(res);

    // Check if the corresponding callback function has been deleted.
    expect(requestId in riverSubscription._callbacks[sessionId]).toBeFalsy();
  });

  // it('should republish the message if no callback function is found', () => {
  //   // Call the work function.
  //   const res = {sessionId: sessionId, requestId: requestId};
  //   riverSubscription._work(res);

  //   // Check if it published the message on the rapid.
  //   expect(rapid.publish).toHaveBeenCalledTimes(1);
  //   expect(rapid.publish).toHaveBeenCalledWith(host, callbackEvent, res);

  // });
});
