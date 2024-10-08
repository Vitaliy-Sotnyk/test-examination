import { chromium } from 'playwright';
import MainPage from './pages/main.page';
import pageData from './data/mainPageData.json';
import {expect} from '@jest/globals';

describe('Jest', () => {
    it('opened page has the right title', async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      const mainPage = new MainPage(page);
      await mainPage.navigate();
      expect(await mainPage.getTitle()).toEqual(pageData.pageTitle);
      expect(await mainPage.title.textContent()).toEqual(pageData.title);
      await browser.close();
    });
  });