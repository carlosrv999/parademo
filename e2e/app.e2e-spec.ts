import { CocherasWebPage } from './app.po';

describe('cocheras-web App', () => {
  let page: CocherasWebPage;

  beforeEach(() => {
    page = new CocherasWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
