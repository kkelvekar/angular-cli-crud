import { ApmcliPage } from './app.po';

describe('apmcli App', () => {
  let page: ApmcliPage;

  beforeEach(() => {
    page = new ApmcliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
