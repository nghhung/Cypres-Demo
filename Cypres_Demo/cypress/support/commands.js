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

const fromDate = Cypress.moment().format('DD-MM-YYYY-HH-mm')

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



//--------------Function For Writing Data From Array to Excel File Using XLSX---------------

Cypress.Commands.add('writeDataFromArrayToExcel', (dataTest) => {
    const XLSX = require('xlsx')
    const saveAs = require('file-saver');
    const Blob = require('cross-blob');

    var wb = XLSX.utils.book_new();

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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

//-------------------------Get Element by CSS----------------------
Cypress.Commands.add('GetElementByCSS', (element) => {
    
    return cy.get(element)
      
})
    

//-------------------------Get Element by Xpath and Click----------------------
Cypress.Commands.add('GetElementByXpathAndClick', (element) => {
    
    if (cy.xpath(element).should('be.visible')) {
        cy.wait(500)
        return cy.xpath(element).click()
      } else {
        return console.log("Element is not visible");
      }
      
})

//-------------------------Get Element by CSS and Click----------------------
Cypress.Commands.add('GetElementByXpathAndClick', (element) => {
    
    if (cy.get(element).should('be.visible')) {
        cy.wait(500)
        return cy.xpath(element).click()
      } else {
        return console.log("Element is not visible");
      }
      
})

//-------------------------Get Element on Dropdown by Xpath----------------------
Cypress.Commands.add('SelectDropdownElementByXpath', (element,subElement) => {
    
    return cy.xpath(element).select(subElement)
})

//-------------------------Get Element on Dropdown by CSS----------------------
Cypress.Commands.add('SelectDropdownElementByCSS', (element,subElement) => {
    
    return cy.get(element).select(subElement)
})

//-------------------------Check Element Visible by Xpath----------------------
Cypress.Commands.add('CheckElementVisibleByXpath', (element) => {
    
    return cy.xpath(element).should('be.visible');
})

//-------------------------Check Element Visible by CSS----------------------
Cypress.Commands.add('CheckElementVisibleByCSS', (element) => {
    
    return cy.get(element,{timeout:5000}).should('be.visible');
})

//-------------------------Check Element Visible and Type by Xpath----------------------
Cypress.Commands.add('CheckElementVisibleAndTypeByXpath', (element,value) => {
    
    return cy.xpath(element).should('be.visible').type(value)
})

//-------------------------Check Element Visible and Type by CSS----------------------
Cypress.Commands.add('CheckElementVisibleAndTypeByCSS', (element,value) => {
    
    return cy.get(element).should('be.visible').type(value)
})

//-------------------------Convert To Number----------------------
Cypress.Commands.add('ConvertToNumber', (element) => {
    
    value = value.match(/\d\.*/g);
      value = value.join("");
      value = Number(value);
      return value;
})

//-------------------------Hover Element By Xpath----------------------
Cypress.Commands.add('HoverElementByXpath', (element) => {
    
    return cy.xpath(element).trigger('mouseover',{force: true})
})

//-------------------------Hover Element By CSS----------------------
Cypress.Commands.add('HoverElementByXpath', (element) => {
    
    return cy.get(element).trigger('mouseover',{force: true})
})

//-------------------------Assert Text by Xpath----------------------
Cypress.Commands.add('AssertTextByXpath', (element,value) => {
    
    return cy.xpath(element).should('have.text', value)
})

//-------------------------Assert Text by CSS----------------------
Cypress.Commands.add('AssertTextByXpath', (element,value) => {
    
    return cy.get(element).should('have.text', value)
})

//-------------------------Check Element Visible and Type Then Enter by Xpath----------------------
Cypress.Commands.add('CheckElementVisibleAndTypeThenEnterByXpath', (element,value) => {
    
    return cy.xpath(element).should('be.visible').type(`${value}{enter}`)
})

//-------------------------Check Element Visible and Type Then Enter by CSS----------------------
Cypress.Commands.add('CheckElementVisibleAndTypeThenEnterByCSS', (element,value) => {
    
    return cy.get(element).should('be.visible').type(`${value}{enter}`)
})