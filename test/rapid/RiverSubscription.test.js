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

  beforeEach(async () => {
    rapid.subscribe.mockClear();
    uid.mockClear();
  });

  it('subscribes to the right host when initialising a new RiverSubscription.', () => {
    // Initialise a new RiverSubscription.
    new RiverSubscription(host, river, callbackEvent);

    // Check if #subscribe was called with the right host argument.
    expect(rapid.subscribe).toHaveBeenCalledWith(host, expect.any(Array));
    expect(rapid.subscribe).toHaveBeenCalledTimes(1);
  });

  it('should add the function to the map when adding it with addCallback.', () => {
    // Initialise a new RiverSubscription.
    const riverSubscription = new RiverSubscription(host, river, callbackEvent);
    const sessionId = 1;
    const requestId = 1;
    uid.mockReturnValue(requestId);

    const callback = () => {
      console.log('this is a callback function');
    };
    riverSubscription.addCallback(sessionId, requestId, callback);

    // Check if the callback exists in the map.
    expect(riverSubscription._callbacks[sessionId][requestId] === callback).toBeTruthy();
  });
});
