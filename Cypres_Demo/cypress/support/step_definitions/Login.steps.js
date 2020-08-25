import LoginPage from "../PageObjects/LoginPage";
import Dashboard from "../PageObjects/DashboardPage";

const loginPage = new LoginPage();
const dasboardPage = new Dashboard();


When(/^I see the logo$/, () => {
    loginPage.checkElementVisibleByCss(loginPage.logo);
    // cy.wait(500)
    // cy.eyesCheckWindow('See logo');
    // cy.eyesCheckWindow({
    //     sizeMode: 'selector', //mode
    //     selector: loginPage.userName //CSS Selector
    //   });
});

Then(/^I see warning message below user input$/, function () {
    loginPage.checkElementVisibleByCss(loginPage.warningMessageEmptyUserName)
  });

  And(/^I enter \"([^\"]*)\" data to user input$/, function (user) {
    loginPage.checkElementVisibleAndTypeByCss(loginPage.userName,user)
  });

  And(/^I enter \"([^\"]*)\" data to password input$/, function (password) {
    loginPage.checkElementVisibleAndTypeByCss(loginPage.password,password)
  });

  And(/^I see warning message below password input$/, function () {
    loginPage.checkElementVisibleByCss(loginPage.warningMessageEmptyPassword)
  });

  And(/^I click on submit button$/, function () {
    loginPage.getElementByCssAndClick(loginPage.loginBtn)
  });

  Then(/^I see notification error message$/, function () {
    loginPage.checkElementVisibleByCss(loginPage.alertIncorrectUser);
  });

  Then(/^I see Menu icon at dashboard page$/, function () {
    dasboardPage.checkElementVisibleByCss(dasboardPage.menuIconDashboard);
  });  

