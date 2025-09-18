import { Page } from '@playwright/test';
import { HomePage } from '../pages-objects/Home.page';
import { LogIn } from '../pages-objects/Login.page';
import { ShopPage } from '../pages-objects/Shop.page';
import { ShopCartPage } from '../pages-objects/ShopCart.page';
import { CheckOutPage } from '../pages-objects/CheckOut.page';
import { OrderStatusPage } from '../pages-objects/OrderStatus.page';

export const createPages = (page) => {
  const homePage = new HomePage(page);
  const loginPage = new LogIn(page);
  const shopPage = new ShopPage(page);
  const shopCartPage = new ShopCartPage(page);
  const checkOutPage = new CheckOutPage(page);
  const orderStatusPage = new OrderStatusPage(page);
  
  return {
    homePage,
    loginPage,
    shopPage,
    shopCartPage,
    checkOutPage,
    orderStatusPage,
  };
};