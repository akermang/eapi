const sortByPrice = () => {
    let itemsToSort = [...items];
    itemsToSort.sort(function (a, b) {
      return a.sellingStatus[0].currentPrice[0].__value__ - b.sellingStatus[0].currentPrice[0].__value__;
    });
    items = itemsToSort
    renderList(itemsToSort);
  }
  
  const freeShippingFilter = () => {
    let listToFilter = [...items];
    let freeShippingListArray = listToFilter.filter((item) => {
      let shippingInfo = item.shippingInfo[0] || {};
      let freeShipping = shippingInfo.shippingType[0] === 'Free';
      if (freeShipping) {
        return item
      }
    })
    renderList(freeShippingListArray);
  }

const createSearchFilterUrl=(filter)=>{
    let searchFilterUrl = buildURLArray(filter)
    return searchFilterUrl
}

let filterOptions = [
    {"name":"FreeShippingOnly",
     "value":"true",
     "paramName":"",
     "paramValue":""},
  
    {"name":"ListingType",
     "value":["AuctionWithBIN", "FixedPrice"],
     "paramName":"",
     "paramValue":""}
  ];

//   Define global variable for the URL filter //
var defaultSearchFilters = "";

// Generates an indexed URL snippet from the array of item filters
function buildURLArray(filterarray) {
    let  urlfilter = "";
    // Iterate through each filter in the array
    for (let i = 0; i < filterarray.length; i++) {
        //Index each item filter in filterarray
        var itemfilter = filterarray[i];
        // Iterate through each parameter in each item filter
        for (let index in itemfilter) {
            // Check to see if the paramter has a value (some don't)
            if (itemfilter[index] !== "") {
                if (itemfilter[index] instanceof Array) {
                    for (let r = 0; r < itemfilter[index].length; r++) {
                        let value = itemfilter[index][r];
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                    }
                }
                else {
                    urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                }
            }
        }
    }
    return urlfilter
}
// Execute the function to build the default URL filter //
// defaultSearchFilters = buildURLArray(filterOptions);

var prices = [
        {   "num": "Under $25",
            "filter": [
                {"name": "MaxPrice","value": "25","paramName": "Currency","paramValue": "USD"}
            ]
        },
        {   "num": "$25 - $50",
            "filter": [
                {"name": "MinPrice","value": "25","paramName": "Currency","paramValue": "USD"},
                {"name": "MaxPrice","value": "50","paramName": "Currency","paramValue": "USD"}
            ]
        },
        {   "num": "$51 - $100",
            "filter": [
                {"name": "MinPrice","value": "51","paramName": "Currency","paramValue": "USD"},
                {"name": "MaxPrice","value": "100","paramName": "Currency","paramValue": "USD"}
            ]
        },
        {   "num": "$101 - $250",
            "filter": [
                {"name": "MinPrice","value": "101","paramName": "Currency","paramValue": "USD"},
                {"name": "MaxPrice","value": "250","paramName": "Currency","paramValue": "USD"}
            ]
        }
    ];