import { S4nPage } from './app.po';

describe('s4n App', () => {
  let page: S4nPage;

  beforeEach(() => {
    page = new S4nPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
