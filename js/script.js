let items = [];

// Parse the response and build an HTML table to display search results//
const renderList = (items) => {
  let html = [];

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
      html.push('<td class="data-container"><a class="item-link" href="' + viewitem + '"target="_blank">');
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
}

const _cb_findItemsByKeywords = (root) => {
  if(root.errorMessage){
    console.log("errorMessage:", root.errorMessage[0].error[0].message[0]);
  }
  console.log(root.findItemsAdvancedResponse[0])
  items = root.findItemsAdvancedResponse[0].searchResult[0].item || [];
  console.log("searchResult items:",items,root)  
  renderList(items);
}



let imgClick = (e) => {
  let element = e.target
  element.classList.toggle("img-select");
  console.log(element)
}

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
