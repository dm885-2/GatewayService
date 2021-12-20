import rapid from '@ovcina/rapidriver';

export default class RiverSubscription {

  _callbacks;
  _host;
  _event;

  constructor(host, river, event) {
    this._callbacks = {};
    this._host = host;
    this._event = event;

    console.log(`Creating RiverSubscription with host: ${host}, river: ${river}, event: ${event}`);
    // Create subscription to river.
    rapid.subscribe(host, [{
      river: river, event: event, work: res => this._work(res)
    }]);
  }

  /**
   * Add callback function for certain session to the river subscription.
   * @param sessionId - Session ID.
   * @param requestId - Request ID.
   * @param callback - Callback function to execute.
   */
  addCallback(sessionId, requestId, callback) {
    if (!(sessionId in this._callbacks)) {
      this._callbacks[sessionId] = {};
    }
    this._callbacks[sessionId][requestId] = callback;
  }

  /**
   * Handle the received response of the rapid subscription.
   * @param res - Response received over the river.
   */
  _work(res) {
    console.log(`Received: ${JSON.stringify(res)}`);
    const msg = res;

    if (msg.sessionId in this._callbacks && msg.requestId in this._callbacks[msg.sessionId]) {
      // Execute the callback for the session.
      this._callbacks[msg.sessionId][msg.requestId](res);

      // Delete from the callbacks as this one is executed now.
      delete this._callbacks[msg.sessionId][msg.requestId];
    } else if(msg.requestId !== -1) {
      // No known callback function for this sessionId/requestId/event; republish back on the queue as another gateway instance might be handling this.
      // rapid.publish(this._host, this._event, msg);
      console.debug(`Republished message for event ${this._event} as no known callback function for session ID ${msg.sessionId} and request ID ${msg.requestId}.`);
    }
  }
}
