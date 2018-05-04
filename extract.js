import {Selector} from 'testcafe';

fixture `Search Listings`
  .page `http://www.valleymls.com/`;

test('', async t => {
  await t
    .click('#buttonimage')
    .click('#mapsearch-viewtab-list');
  const card = await Selector('.gallery-listingphoto');
  await t
    .typeText('#criteria-location-input', 'Madison, AL (County)')
    .click(Selector('li').withText('Madison, AL (County)'))
    .typeText('#mapsearch-criteria-maxprice', '240000')
    .typeText('#mapsearch-criteria-minsqft', '1800')
    .click('#mapsearch-viewtab-list')
    .wait( 10000 );
});