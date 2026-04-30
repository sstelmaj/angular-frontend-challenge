import { appConfig } from './app.config';

describe('app.config', () => {
  it('should register the standalone providers required by the app', () => {
    expect(appConfig.providers).toBeDefined();
    expect(appConfig.providers?.length).toBeGreaterThanOrEqual(4);
  });
});
