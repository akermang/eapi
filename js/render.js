let items = [];

// Parse the response and build an HTML table to display search results//
const renderList = (items) => {
  let html = [];
  html.push('<h1>eBay Search Results</h1>')
  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; ++i) {
    let item = items[i];
    let shippingInfo = item.shippingInfo && item.shippingInfo[0] || {};
    let sellingStatus = item.sellingStatus && item.sellingStatus[0] || {};
    let listingInfo = item.listingInfo && item.listingInfo[0] || {};
    let title = item.title;
    let subtitle = item.subtitle || '';
    let pic = item.galleryURL;
    let viewitem = item.viewItemURL;
    let currentPrice = sellingStatus.currentPrice && sellingStatus.currentPrice[0] || {};
    let displayPrice = currentPrice['@currencyId'] + ' ' + currentPrice['__value__'];
    let buyItNowAvailable = listingInfo.buyItNowAvailable && listingInfo.buyItNowAvailable[0] === 'true';
    let freeShipping = shippingInfo.shippingType && shippingInfo.shippingType[0] === 'Free';

    if (null !== title && null !== viewitem) {
      html.push('<tr><td class="image-container" onclick="imgClick(event)"><img src="' + pic + '"border = "0"></td>');
      html.push('<td class="data-container" onclick="imgClick(event)"><a class="item-link" href="' + viewitem + '"target="_blank">');
      html.push('<p class="title">' + title + '</p>');
      html.push('<p class="subtitle">' + subtitle + '</p>');
      html.push('<p class="price">' + displayPrice + '</p>');
      if (buyItNowAvailable) {
        html.push('<p class="bin">Buy It Now</p>');
      }

      if (freeShipping) {
        html.push('<p class="fs">Free shipping</p>');
      }

      html.push('</a></td></tr>');
    }
  }

  html.push("</tbody></t able>");
  document.getElementById("results").innerHTML = html.join("");
  $('.btn-freeShipping').show()
  $('.btn-sortByPrice').show()
}

const _cb_findItemsByKeywords = (root) => {
  if (root.errorMessage) {
    console.log("errorMessage:", root.errorMessage[0].error[0].message[0]);
  }
  items = root.findItemsAdvancedResponse[0].searchResult[0].item || [];
  console.log("searchResult items:", items)
  renderList(items);
}


//  render list of Most Watched Items on ebay
const renderMostWatchedItemsList = (items) => {
  let html = [];

  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  html.push('<tr><td><h1 class="">The Most Watched Items List</h1></td></tr>')
  for (var i = 0; i < items.length; ++i) {
    let item = items[i];
    let title = item.title;
    let subtitle = item.subtitle || '';
    let pic = item.imageURL;
    let viewitem = item.viewItemURL;
    let displayPrice = item.buyItNowPrice['@currencyId'] + ' ' + item.buyItNowPrice['__value__'];

    if (null !== title && null !== viewitem) {

      html.push('<tr onclick="imgClick(event)"><td class="image-container"><img src="' + pic + '"border = "0"></td>');
      html.push('<td class="data-container ><a class="item-link" href="' + viewitem + '"target="_blank">');
      html.push('<p class="title">' + title + '</p>');
      html.push('<p class="subtitle">' + subtitle + '</p>');
      html.push('<p class="price">' + displayPrice + '</p>');

      html.push('</a></td></tr>');
    }
  }

  html.push("</tbody></table>");
  document.getElementById("results").innerHTML = html.join("");
}

// fetch the list of Most Watched Items on ebay
fetch("https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=GalAkerm-eapi-PRD-8787d0107-f42d79cf&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3")
.then((response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('Network response was not ok.');
})
.then((resp) => resp.json())
.then((resp) => {
  let mostWatchedItems = resp.getMostWatchedItemsResponse.itemRecommendations.item;
  renderMostWatchedItemsList(mostWatchedItems);
})
.catch((error) => {
  console.log('There has been a problem with your fetch operation: ', error.message);
});


// event handler //
const imgClick = (e) => {
  e.preventDefault();
  let element = e.target
  element.classList.toggle("img-select");
  var h = $("a",this).attr('href');
  alert(h);
  console.log(element)
}
// $('.atleta').click(function(e) {
//   e.preventDefault();
//   // $('.atleta').removeClass('atleta_atual');
//   // $(this).addClass('atleta_atual');
//   var h = $("a",this).attr('href');
//   alert(h);
// });



// // another fetch example
// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//   return parent.appendChild(el);
// }

// const ul = document.getElementById('authors');
// const url = 'https://randomuser.me/api/?results=10';
// fetch(url)
// .then((resp) => resp.json())
// .then(function(data) {
//   let authors = data.results;
//   return authors.map(function(author) {
//     let li = createNode('li'),
//         img = createNode('img'),
//         span = createNode('span');
//     img.src = author.picture.medium;
//     span.innerHTML = `${author.name.first} ${author.name.last}`;
//     append(li, img);
//     append(li, span);
//     append(ul, li);
//   })
// })
// .catch(function(error) {
//   console.log(JSON.stringify(error));
// });   
