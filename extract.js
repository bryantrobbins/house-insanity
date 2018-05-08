import {Selector} from 'testcafe';

fixture `Search Listings`
  .page `http://www.valleymls.com/`;

async function extractForFilter(t, label, id) {
  console.log(`Age Filter: ${label}`);
  await t
    .click('#mapsearch-criteria-age')
    .click(Selector('option').filter(`[value="${id}"]`));
  await Selector('.gallery-listingphoto');

  // Extract data from first page
  await extractPage();

  // Repeat extraction for remaining pages
  const next = Selector('a').withText('Next');
  while (await next.exists) {
    await t.click(next);
    await Selector('.gallery-listingphoto');
    await extractPage();
  }
}

async function extractPage() {
  var mls = Selector('div.listview-infocontainer > div.listview-info > div:nth-child(5) > dd');
  var subdivision = Selector('div.listview-infocontainer > div.listview-info > div:nth-child(7) > dd');
  var address = Selector('div.listview-col1 > div.listview-row1 > h2.listview-address > a');
  const nResultInPage = await mls.count;

  for (let i = 0; i < nResultInPage; i++) {
    var mlsText = await mls.nth(i).textContent;
    var addressText = await address.nth(i).textContent;
    addressText = addressText.replace(/\r?\n|\r/g, "").replace(/\s+/g, ' ');
    var subdivisionText = await subdivision.nth(i).textContent;
    console.log(`"${mlsText}","${addressText}","${subdivisionText}"`);
  }
}

test('', async t => {
  // Get to listings page
  await t
    .click('#buttonimage');
  await Selector('.gallery-listingphoto');

  // Expand search tab if not already expanded
  var maxprice = Selector('#mapsearch-criteria-maxprice');
  if (!(await maxprice.exists && await maxprice.visible)) {
    await t.click(Selector('#mapsearch-criteria-header > a'));
  }
  await Selector('#mapsearch-criteria-maxprice');

  // Go to list view
  await t
    .click('#mapsearch-viewtab-list');

  // Filter for price and sqft
  await t
    .typeText('#mapsearch-criteria-maxprice', '240000')
    .typeText('#mapsearch-criteria-minsqft', '1800')
    .click('#mapsearch-criteria-maxsqft');
  await Selector('.gallery-listingphoto');

  // Filter for Madison County
  await t
    .typeText('#criteria-location-input', 'Madison, AL (County)')
    .click(Selector('li').withText('Madison, AL (County)'));
  await Selector('.gallery-listingphoto');

  // Extract results for single filter
  await extractForFilter(t, '1-5 years', '3926');
  await extractForFilter(t, 'New/Never Occupied', '3928');
  await extractForFilter(t, 'Under Construction', '3927');
  await extractForFilter(t, 'Over 5 Years', '3929');
});