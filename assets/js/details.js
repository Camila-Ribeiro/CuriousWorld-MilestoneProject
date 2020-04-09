window.addEventListener("load", function() {
    var venueId = sessionStorage.getItem("place-id");
    alert(venueId)

    // var urlDetails = "https://api.foursquare.com/v2/venues/" + venueId + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";  

    function populateDetails() {

    }
    function populateCards(callback) {
        getAllData(urlSearch, function(resp) {
            data = JSON.parse(resp).response.venues;
    //         if (data == "" || data  == null) {
    //             var noResults= document.getElementById("no_results");
    //             var resultsFound= document.getElementById("results_found");
    //             noResults.classList.remove("d-none");
    //             resultsFound.classList.add("d-none");
    //         }
    //         var html =[];
    //         for (let index = 0; index < data.length; index++) {
    //             var place = data[index];
    //             html.push();

    //             collectAllIds.push(place.id);
    //         }
    //         document.getElementById("results_arr").insertAdjacentHTML("beforeend", html.join(""));
    //         callback(getURLVenuesId(collectAllIds));
    //         console.log(data);
    //     });
    // }
    // populateCards(function () {
        
    // });
})

// function getAllData(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             callback(this.responseText);
//         }
//     }
//     xhr.onerror = function() {
//         alert("Woops, there was an error making the request.");
//     };
//     xhr.send();
// }