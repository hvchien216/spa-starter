import { act, render } from '~/test-tools';
import App from './App';

describe('Renders App', () => {
  it('App works', async () => {
    await act(async () => render(<App />));
  });
});
