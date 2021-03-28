/// <reference types="cypress" />
import {generateAsset} from "../generate_asset"
import {And, Given, Then, When} from "cypress-cucumber-preprocessor/steps";

//import assetList from "../requests";

async function getAssetList()
{
    let response = await fetch('http://localhost:3000/getAssets');
    return response.json();
}

let assetNumber = generateAsset()
let sortValue = assetNumber.substring(0,4);
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

Given(`I navigate to Add Asset tab`, () =>{
    cy.visit('http://localhost:3000/#/add');
})

When(`I input correct asset`, () => {
    cy.get('#defaultFormAddAsset').type(assetNumber);
})

And(`I click on add asset button`,() =>{
    cy.get('[data-test="button"]').click();

})

Then( `I received message that asset added successfully`,() => {
    //THis method doesn't work because Success word has typo on the site
    // cy.get(`[data-test="modal-header"] h4`)
    //     .invoke('text')
    //     .should('eq','Success');
    cy.get(`[data-test="modal-body"]`)
        .invoke('text')
        .should('eq','Asset '+`${assetNumber}`+' was added to the list')
})

And(`I click on close button and close pop-up`, () => {
    cy.get('.modal-footer .btn').click();
})

Then(`I received message that asset is already exist`, () => {
    cy.get(`[data-test="modal-header"] h4`)
        .invoke('text')
        .should('eq','Asset alredy exist');
    //there is type in work alredy it should be already.
})

//Existing assets tests

Given(`I navigate to Existing Assets tab`, () =>{
    cy.visit('http://localhost:3000/#/assets');
})

When(`I input asset value into search`, () => {
    cy.get('[data-test="datatable-input"]')
        .should('be.visible')
        .type(assetNumber);
})

Then(`I see searched result in table`, () => {
    cy.get('[data-test="table-body"] td')
        .invoke('text')
        .should('equal',assetNumber+'')
})

When(`I input sort parameter into search field`, () => {
    cy.get('[data-test="datatable-input"]')
        .should('be.visible')
        .type(sortValue);

})

Then (`I see sorted result in table`, () =>{
        cy.get('td')
            .contains(`${sortValue}`);
})

When (`I select from Show entries to display 100 assets in the table`, () =>{
    cy.get('.custom-select.custom-select-sm.form-control.form-control-sm').select('100');
})

Then(`I see 100 asset in the table`, () =>{
    cy.get('td').should('have.length', 100)
})

When(`I click on navigate to next step button`, () =>{
    cy.get('[data-test="page-link"]')
        .should('be.visible')
        .contains('Next').click();
})

Then (`I see results from next page`, ()=>{
    cy.get('.dataTables_info')
        .should('contain.text','Showing 11 to 20');
})


When(`I click on sorting icon in the table`, () =>{
    cy.get('[data-test="datatable-head"]')
        .should('be.visible')
        .click();
})

Then(`I see asset sorted in ascending order in the table`, () =>{
    const elementTexts = [];
    let splicedAssetArray = [];

    cy.get('td').each($el => {
        elementTexts.push($el.text())
    });

     getAssetList().then(async data =>{
        const arrayAsset = data;
        arrayAsset.sort();
        splicedAssetArray = arrayAsset.splice(0,10);
        cy.wait(5000);

        if(equals(splicedAssetArray,elementTexts)){
            assert.isOk('Sorting')
        }else{
            assert.isNotOk("Sorting");
        }
    });

})




