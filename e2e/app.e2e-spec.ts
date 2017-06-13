import { MCQuotesExpiryDateWebPage } from './app.po';

describe('mcquotes-expiry-date-web App', () => {
  let page: MCQuotesExpiryDateWebPage;

  beforeEach(() => {
    page = new MCQuotesExpiryDateWebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
