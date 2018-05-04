import {Selector} from 'testcafe';

fixture `Search Listings`
  .page `http://www.valleymls.com/`;

test('', async t => {
  // Load page
  await Selector('#mapsearch-criteria-maxprice');

  await t
    .click('#buttonimage')
    .click('#mapsearch-viewtab-list');

  await Selector('.gallery-listingphoto');
  await Selector('#mapsearch-criteria-maxprice');

  // Filter for price and sqft
  await t
    .typeText('#mapsearch-criteria-maxprice', '240000')
    .typeText('#mapsearch-criteria-minsqft', '1800')
    .click('#mapsearch-criteria-maxsqft');
  await Selector('.gallery-listingphoto');

  // Filter acreage
  await t
    .click('#mapsearch-criteria-minacreage')
    .click(Selector('option').filter('[value="10890"]'));
  await Selector('.gallery-listingphoto');

  // Filter age
  await t
    .click('#mapsearch-criteria-age')
    .click(Selector('option').filter('[value="3929"]'));
  await Selector('.gallery-listingphoto');

  // Filter for Madison County
  await t
    .typeText('#criteria-location-input', 'Madison, AL (County)')
    .click(Selector('li').withText('Madison, AL (County)'));
  await Selector('.gallery-listingphoto');

  // Add Limestone County
  await t
    .typeText('#criteria-location-input', 'Limestone, AL (County)')
    .click(Selector('li').withText('Limestone, AL (County)'));
  await Selector('.gallery-listingphoto');

  // Extract MLS IDs from first page
  const nResultInPage = await Selector('div.listview-infocontainer > div.listview-info > div:nth-child(5) > dd').count;
  for (let i = 0; i < nResultInPage; i++) {
    const mlsId = await Selector('div.listview-infocontainer > div.listview-info > div:nth-child(5) > dd').nth(i).textContent;
    console.log(mlsId);
  }

  // Repeat extraction for remaining pages
  const next = Selector('a').withText('Next');
  while (await next.exists) {
    await t.click(next);
    await Selector('.gallery-listingphoto');
    const nResultInPage = await Selector('div.listview-infocontainer > div.listview-info > div:nth-child(5) > dd').count;
    for (let i = 0; i < nResultInPage; i++) {
      const mlsId = await Selector('div.listview-infocontainer > div.listview-info > div:nth-child(5) > dd').nth(i).textContent;
      console.log(mlsId);
    }
  }

});