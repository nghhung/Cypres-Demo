/// <reference types="Cypress" />

beforeEach(function () {
    cy.log('Start testing..........')
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.reload(true)

    Cypress.on('uncaught:exception', () => {
      return false
    })

    console.log('Start test')
    
  })
  
  afterEach(function () {
    cy.log('End testing..........')
    cy.clearLocalStorage()
    cy.clearCookies()
    // cy.eyesClose();
    // cy.reload(true)
  })
  
  Given(/^I open Danatrain site by desktop screen$/, function () {
    // cy.eyesOpen({
    //   appName: 'DanaTrain',
    //   testName: `DanaTrain UI testing on Desktop`
    // });
    cy.visit({
      url :"https://dana-train-web-admin-" + Cypress.env('env') + ".enouvo.com/login",
      failOnStatusCode: false
    })
  });

  Given(/^I open Danatrain site by iphoneX$/, function () {
    // cy.eyesOpen({
    //   appName: 'DanaTrain',
    //   testName: `DanaTrain UI testing on iphoneX`,
    //   browser: {
    //     deviceName: 'iPhone X'
    //   }
    // });
    cy.visit({
      url :"https://dana-train-web-admin-" + Cypress.env('env') + ".enouvo.com/login",
      failOnStatusCode: false
    })

    cy.viewport('iphone-x')
  });

  