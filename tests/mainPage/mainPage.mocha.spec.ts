import { chromium } from 'playwright';
import { describe, it } from 'mocha';
import MainPage from '../pages/main.page';
import pageData from './data/mainPageData.json';
import { expect } from 'chai';

describe('Mocha: main page of OLX', () => {
    it('opened page has the right title', async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      const mainPage = new MainPage(page);
      await mainPage.navigate();
      expect(await mainPage.getTitle()).to.contain(pageData.pageTitle);
      expect(await page.textContent(mainPage.title)).to.eql(pageData.title);
      await browser.close();
    });
  });