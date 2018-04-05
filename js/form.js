$(document).ready(function () {
    $('#goBtn')[0].disabled = true;
    $('.multi-select')[0].disabled = true;
    $('.multi-select')[0].style.backgroundColor = '#eee';

    $("#select1").change(function () {
        let basic = "<option value='Select'>Select</option>";
        let el = $(this);

        if (el.val() != "Select") {
            $('.multi-select')[0].disabled = false;
            $('.multi-select')[0].style.backgroundColor = 'white';
            $('.multi-select')[0].focus();

            let temp_Department = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].Recipient == el.val() && temp_Department != data[i].Department) {
                    temp_Department = data[i].Department;
                    basic += "<option value='" + data[i].Department + "'>" + data[i].Department + "</option>"
                }
            }
            $("#select2").html(basic);
        }

        if (el.val() == "Select") {
            $('.multi-select').each(function (index) {
                this.disabled = true;
            })
            $('.multi-select')[0].style.backgroundColor = '#eee';
            $("#select2").html("<option value='Select'>Select</option>");
        }
    });


    $("#select2").change(function () {
        var el = $(this);
        if (el.val() != "Select") {
            document.getElementById("goBtn").disabled = false;
        }

        if (el.val() == "Select") {
            document.getElementById("goBtn").disabled = true;
        }
    });
})

//create URL
function go(event) {
    event.preventDefault();
    if ($('#select1 option:selected').text() != "Select" &&
        $('#select2 option:selected').text() != "Select") {
        let select1 = $('#select1 option:selected').val();
        let select2 = $('#select2 option:selected').val();
        let formatedSelect2 = select2.replace(/&/g,"");
        let select3 = $('#select3 option:selected').val();

        // Construct the request
        let searchUrl = "https://svcs.ebay.com/services/search/FindingService/v1";
        searchUrl += "?OPERATION-NAME=findItemsAdvanced";
        searchUrl += "&SERVICE-VERSION=1.0.0";
        searchUrl += "&SECURITY-APPNAME=GalAkerm-eapi-PRD-8787d0107-f42d79cf";
        searchUrl += "&GLOBAL-ID=EBAY-US";
        searchUrl += "&RESPONSE-DATA-FORMAT=JSON";
        // searchUrl += "&callback=_cb_findItemsByKeywords";
        searchUrl += "&REST-PAYLOAD";
        searchUrl += "&keywords=" + `${select1} ${formatedSelect2} `;
        searchUrl += "&paginationInput.entriesPerPage=16";


        if ($('#select3 option:selected').text() !== "Any Price") {
            for (var j = 0; j < prices.length; j++) {
                if (prices[j].num == select3) {
                    let filter = prices[j].filter;
                    searchUrl += createSearchFilterUrl(filter)
                }
            }
        };

        // searchUrl += defaultSearchFilters;
        // console.log("searchUrl:", searchUrl)
        // Submit the request
        let s = document.createElement('script'); // create script element
        console.log(searchUrl)
        // s.src = searchUrl;
        // document.body.appendChild(s);
        fetch(searchUrl)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.errorMessage) {
                    throw Error(data.errorMessage[0].error[0].message[0])
                }
                return data;
            })
            .then((data) => {
                _cb_findItemsByKeywords(data)
                return data;
            })
            .catch(function (error) {
                console.log(JSON.stringify("fetch error: " + error));
            });




        // for (var i = 0; i < data.length; i++) {
        //     if ($('#select1 option:selected').text() == data[i].Recipient && $('#select2 option:selected').text() == data[i].Department && $('#select4 option:selected').text() == data[i].Category && $('#select3 option:selected').text() == data[i].Price_Point) {
        //         if ($('#select3 option:selected').text() == "Any Price")
        //             if (data[i].Condition == "New") {
        //                 window.open(data[i].URL + "?LH_ItemCondition=1000", "_blank");
        //             }
        //             else
        //                 window.open(data[i].URL, "_blank");
        //         else {
        //             for (var j = 0; j < prices.length; j++) {
        //                 if (prices[j].num == $('#select3 option:selected').text()) {

        //                     if (data[i].URL.indexOf("?") > 0) {

        //                         if (data[i].Condition == "New")
        //                             window.open(data[i].URL + "&" + prices[j].url + "&LH_ItemCondition=1000", "_blank");
        //                         else
        //                             window.open(data[i].URL + "&" + prices[j].url, "_blank");

        //                     }
        //                     else {
        //                         if (data[i].Condition == "New")
        //                             window.open(data[i].URL + "?" + prices[j].url + "&LH_ItemCondition=1000", "_blank");
        //                         else
        //                             window.open(data[i].URL + "?" + prices[j].url, "_blank");

        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
