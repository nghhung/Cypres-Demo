/// <reference types="Cypress" />

import LoginPage from "../PageObjects/LoginPage";


const loginPage = new LoginPage();



When(/^I see the logo$/, () => {
    cy.CheckElementVisibleByCSS(loginPage.logo);
    // cy.wait(500)
    // cy.eyesCheckWindow('See logo');
    // cy.eyesCheckWindow({
    //     sizeMode: 'selector', //mode
    //     selector: loginPage.userName //CSS Selector
    //   });
});

// Then(/^I see warning message below user input$/, function () {
//     loginPage.checkElementVisibleByCss(loginPage.warningMessageEmptyUserName)
//   });

  And(/^I enter \"([^\"]*)\" data to user input$/, function (user) {
    loginPage.checkElementVisibleAndTypeByCss(loginPage.userName,user)
  });

  And(/^I enter \"([^\"]*)\" data to password input$/, function (password) {
    loginPage.checkElementVisibleAndTypeByCss(loginPage.password,password)
  });

  // And(/^I see warning message below password input$/, function () {
  //   loginPage.checkElementVisibleByCss(loginPage.warningMessageEmptyPassword)
  // });

  And(/^I click on submit button$/, function () {
    loginPage.getElementByCssAndClick(loginPage.loginBtn)
  });

  // Then(/^I see notification error message$/, function () {
  //   loginPage.checkElementVisibleByCss(loginPage.alertIncorrectUser);
  // });

    Then(/^I save to excel$/, function () {
      var data = [{"name" : "admin", "pass" : "234"}]
    cy.writeDataFromArrayToExcel(data);
  });
