import rapid from '@ovcina/rapidriver';
import RiverSubscription from './RiverSubscription.js';

export default class RapidManager {

  #host;
  #subscriptions;

  constructor(host) {
    this.#host = host;
    this.#subscriptions = {};
  }

  publishAndSubscribe(event, callbackEvent, session, data, callback) {
    if (!(callbackEvent in this.#subscriptions)) {
      this.#subscriptions[callbackEvent] = new RiverSubscription(this.#host, 'gateway', callbackEvent);
    }
    const subscription = this.#subscriptions[callbackEvent];

    subscription.addCallback(session, callback);

    rapid.publish(this.#host, event, data);
  }
}
