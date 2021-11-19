import RapidManager from '../../src/rapid/RapidManager';
import RiverSubscription from '../../src/rapid/RiverSubscription';
import rapid from '@ovcina/rapidriver';

const mockPublishAndSubscribe = jest.fn();
jest.mock('../../src/rapid/RiverSubscription');
jest.mock('@ovcina/rapidriver');

describe('A RapidManager', () => {
  const host = 'amqp://127.0.0.1';
  let manager;

  beforeEach(async () => {
    RiverSubscription.mockClear();
    mockPublishAndSubscribe.mockClear();
    rapid.publish.mockClear();
    manager = new RapidManager(host);
  });

  it('should create a new river subscription if none exists yet for the event.', function () {
    // Call the publishAndSubscribe function.
    manager.publishAndSubscribe('event', 'callbackEvent', 1, {session: 1}, () => {
    });

    // Check that it has created a new RiverSubscription.
    expect(RiverSubscription).toHaveBeenCalledTimes(1);
  });

  it('should only create 1 river subscription when publishing 2 to the same event.', function () {
    // Call the publishAndSubscribe function.
    manager.publishAndSubscribe('event', 'callbackEvent', 1, {session: 1}, () => {
    });
    manager.publishAndSubscribe('event', 'callbackEvent', 2, {session: 2}, () => {
    });

    // Check that it has created a new RiverSubscription.
    expect(RiverSubscription).toHaveBeenCalledTimes(1);
  });

  it('should add the callback function for each request.', function () {
    // Call the publishAndSubscribe function.
    manager.publishAndSubscribe('event', 'callbackEvent', 1, {session: 1}, () => {
    });
    manager.publishAndSubscribe('event', 'callbackEvent', 2, {session: 2}, () => {
    });

    // Check that it has created a new RiverSubscription.
    expect(RiverSubscription.mock.instances[0].addCallback).toHaveBeenCalledTimes(2);
  });

  it('should publish the message onto the rapid for each request.', function () {
    // Call the publishAndSubscribe function.
    manager.publishAndSubscribe('event', 'callbackEvent', 1, {session: 1}, () => {
    });
    manager.publishAndSubscribe('event', 'callbackEvent', 2, {session: 2}, () => {
    });

    // Check that it has created a new RiverSubscription.
    expect(rapid.publish).toHaveBeenCalledTimes(2);
  });
});
