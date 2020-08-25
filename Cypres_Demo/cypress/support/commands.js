// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';

//--------------Function For Open A New Tab---------------

Cypress.Commands.add('openWindow', (url) => {
    return new Promise(resolve => {
        if (window.top.aut) {
            console.log('window exists already')
            window.top.aut.close()
        }
        window.top.aut = window.top.open(url, 'aut')
        setTimeout(() => {
            resolve()
        }, 500)
    })
})

//--------------Function For Upload A New Image/File---------------

Cypress.Commands.add('newUploadBlobFile', (fileName, fileType) => {
    cy.get("input[type='file']").then($input => {
        cy.fixture(fileName, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = $input[0];
                const testFile = new File([blob], fileName, { type: fileType });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(testFile);
                el.files = dataTransfer.files;
                return cy.wrap($input).trigger('change', { force: true });
            });
    });
    cy.wait(5000)
})

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//--------------Function For Writing Data From Array to Excel File Using XLSX---------------

Cypress.Commands.add('writeDataFromArrayToExcel', (dataTest) => {
    const XLSX = require('xlsx')
    const saveAs = require('file-saver');
    const Blob = require('cross-blob');

    var wb = XLSX.utils.book_new();

    for (var i in dataTest) {
        var val = dataTest[i];
        let arrHeader = [];
        let arrValue = [];

        for (var j in val) {
            var header = j;
            var value = val[j]
            arrHeader.push(header);
            arrValue.push(value)
        }

        var Heading = [arrHeader];
        var Data = [arrValue];

        var ws = XLSX.utils.aoa_to_sheet(Heading);
        XLSX.utils.sheet_add_json(ws, Data, {
            skipHeader: true,
            origin: -1
        });

        XLSX.utils.book_append_sheet(wb, ws, 'Sheet' + makeid(5) + ' {' + fromDate + '}');
    }

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Data Login' + ' [' + fromDate + ']' + '.xlsx');
})

//--------------Function For Writing Data From Array to Json File Using XLSX---------------

Cypress.Commands.add('writeDataFromArrayToJson', (dataTest) => {
    cy.writeFile("cypress/fixtures/testdata" + " [" + fromDate + "]" + ".json", dataTest);
})

//======================FUNCTION FOR WEBSITE AND MACBOOK==========================

Cypress.Commands.add('LogoutDanaFunctionForWebMac', () => {
    //Cause have cy.reload() function, so we need handle click on X icon on the form to logout
    cy.get('.h4 > .anticon').click()
    cy.get('.rightHeader > .ant-avatar').click()
    cy.get('.ant-dropdown-menu > :nth-child(3)').click();
})

Cypress.Commands.add('LogoutDanaFunctionForWebMacVT', () => {
    //VT account just create a new dispatch, so this account do not need cy.reload() function
    cy.get('.rightHeader > .ant-avatar').click({ force: true });
    cy.get('.ant-dropdown-menu > :nth-child(3)').click();
})

//======================FUNCTION FOR MOBILE PHONE==========================

//Cause after create a new dispatch, manager account login recently so do not visit to url
Cypress.Commands.add('LoginDanaFunctionToCheck', (username, password) => {
    cy.get('#username').click().type(username);
    cy.get('#password').click().type(password);
    cy.get('.ant-btn').click();
    cy.wait(3000);
})

//Cause the xpath of VT account icon and other account icon are different 
Cypress.Commands.add('LogoutDanaFunctionForPhone', () => {
    cy.get('[href="/profile"]').click()
    cy.get('.sc-fznOgF > .ant-btn').scrollIntoView().click()
    cy.get('.ant-popover-buttons > .ant-btn-primary').click()
})

Cypress.Commands.add('LogoutDanaFunctionForPhoneVT', () => {
    cy.get('[href="/profile"]').click()
    cy.get('.sc-fznOgF > .ant-btn').scrollIntoView().click()
    cy.get('.ant-popover-buttons > .ant-btn-primary').click()
})

//-------------------------Get Element by Xpath----------------------
Cypress.Commands.add('GetElementByXpath', (element) => {
    
        return cy.xpath(element)
      
})

//-------------------------Get Element by Xpath----------------------


//-------------------------Get Element by Xpath----------------------


//-------------------------Get Element by Xpath----------------------


//-------------------------Get Element by Xpath----------------------


//-------------------------Get Element by Xpath----------------------