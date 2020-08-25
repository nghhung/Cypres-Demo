import Dashboard from "../PageObjects/DashboardPage";

const dashboard  = new Dashboard();

//create new user steps

When(/^I click on listing user icon$/, function () {
    dashboard.getElementByCssAndClick(dashboard.userListingMenu);
  });

  Then(/^I see create new user form$/, function () {
    dashboard.checkElementVisibleByCss(dashboard.createNewUserForm);
  });

  And(/^I click on create new user button$/, function () {
    dashboard.getElementByCssAndClick(dashboard.createNewUserBtnAtDashboard);
  });

  And(/^I enter username on TenDangNhap input$/, function () {
    const dashboard  = new Dashboard();
    dashboard.checkElementVisibleAndTypeByCss(dashboard.userLoginNameInput, 'hung'+ dashboard.random);
  });

  And(/^I enter lastName and firstName on HoVaTen input$/, function () {
    const dashboard  = new Dashboard();
    dashboard.checkElementVisibleAndTypeByCss(dashboard.userNameInput, 'hung'+ dashboard.random);
  });

  And(/^I enter email input$/, function () {
    const dashboard  = new Dashboard();
    dashboard.checkElementVisibleAndTypeByCss(dashboard.emailInput, 'hung.nguyen+'+ dashboard.random + '@enouvo.com');
  });

  And(/^I enter department \"([^\"]*)\" input$/, function (department) {
    // dashboard.getElementByCssAndClick(dashboard.departmentInput);
    dashboard.checkElementVisibleAndTypeByCss(dashboard.departmentInput, department)
    dashboard.getElementByCssAndClick(dashboard.createNewUserForm)
  });

  And(/^I enter posittion \"([^\"]*)\" input$/, function (position) {
    // dashboard.getElementByCssAndClick(dashboard.posittionInput);
    dashboard.checkElementVisibleAndTypeByCss(dashboard.posittionInput, position)
    dashboard.getElementByCssAndClick(dashboard.createNewUserForm)
  });

  And(/^I enter password to create new user input$/, function () {
    dashboard.checkElementVisibleAndTypeByCss(dashboard.passwordInput, '123456')
  });

  And(/^I click on submit new user button$/, function () {
    dashboard.getElementByCssAndClick(dashboard.createNewUserBtn)
  });

  Then(/^I see success notification message$/, function () {
    dashboard.getElementByCssAndClick(dashboard.notification)
  });


  //announcement steps

  When(/^I click on announcement icon$/, function () {
    dashboard.getElementByCssAndClick(dashboard.announcementIcon);
  });

  Then(/^I see create new announcement form$/, function () {
    dashboard.checkElementVisibleByCss(dashboard.typeAnnouncementForm);
  });

  And(/^I click on create new announcement button$/, function () {
    dashboard.getElementByCssAndClick(dashboard.createNewAnnouncementBtnAtDashboard);
  });

  And(/^I enter type on announcement type input$/, function () {
    dashboard.checkElementVisibleAndTypeByCss(dashboard.typeAnnouncementInput,'Bình thường');
    dashboard.getElementByCssAndClick('.modalTitle');
  });

  And(/^I enter title on announcement title input$/, function () {
    dashboard.checkElementVisibleAndTypeByCss(dashboard.titleAnnouncementInput, 'Đây là thông báo automation test' + dashboard.random)
  });

  And(/^I enter content on announcement content input$/, function () {
    dashboard.checkElementVisibleAndTypeByCss(dashboard.contentAnnouncementInput, 'This is automation test')
  });

  And(/^I upload file on announcement$/, function () {
    dashboard.uploadJPEGImage(dashboard.uploadFileAnnouncement,'download.jpeg')
    dashboard.checkElementVisibleByCss('.image');
    // dashboard.checkElementVisibleByCss('.name-file');
  });

  And(/^I click on submit new announcement button$/, function () {
    dashboard.getElementByCssAndClick(dashboard.createNewUserBtn)
  });
