const app = require('../../src/app');

describe('\'message\' service', () => {
  it('registered the service', () => {
    const service = app.service('message');
    expect(service).toBeTruthy();
  });
});
