import {Selector} from 'testcafe';

fixture `Search Listings`
  .page `http://www.valleymls.com/`;

test('', async t => {
  // Load page
  await t
    .click('#buttonimage')
    .click('#mapsearch-viewtab-list');

  var card = await Selector('.gallery-listingphoto');

  // Filter for Madison County
  await t
    .typeText('#criteria-location-input', 'Madison, AL (County)')
    .click(Selector('li').withText('Madison, AL (County)'));
  card = await Selector('.gallery-listingphoto');

  // Expand 'Refine Search' Panel
  await t
    .click('#mapsearch-criteria-header > a');
  var criteria = await Selector('#mapsearch-criteria-maxprice');

  // Filter for price and sqft
  await t
    .typeText('#mapsearch-criteria-maxprice', '240000')
    .typeText('#mapsearch-criteria-minsqft', '1800')
    .click('#mapsearch-criteria-maxsqft');

  card = await Selector('.gallery-listingphoto');

  // Filter acreage
  await t
    .click('#mapsearch-criteria-minacreage')
    .click(Selector('option').filter('[value="10890"]'));

  card = await Selector('.gallery-listingphoto');

  // Filter age
  await t
    .click('#mapsearch-criteria-age')
    .click(Selector('option').filter('[value="3929"]'));

  card = await Selector('.gallery-listingphoto');

  await t
    .wait(10000);
});