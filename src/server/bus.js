// @flow

import EventEmitter from 'events';

/**
 * Define a bus to emit / listen events from the response interceptor.
 * It will be used by the SSE server to emit SSE events to the webapp.
 */
class Bus extends EventEmitter {}

const bus = new Bus();

export default bus;
