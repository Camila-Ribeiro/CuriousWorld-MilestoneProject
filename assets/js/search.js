
window.addEventListener("load", function() {
    var location = sessionStorage.getItem("location");
    var place = sessionStorage.getItem("place");
    var urlSearch = "https://api.foursquare.com/v2/venues/search?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=10&ll=53.350140, -6.266155&query=" + place + "&near=" + location;
    document.getElementById("city_place").innerHTML = place;
    document.getElementById("city_location").innerHTML = location;
    var collectAllIds = [];

    function populateCards(callback) {
        getAllData(urlSearch, function(resp) {
            data = JSON.parse(resp).response.venues;
            if (data == "" || data  == null) {
                var noResults= document.getElementById("no_results");
                var resultsFound= document.getElementById("results_found");
                noResults.classList.remove("d-none");
                resultsFound.classList.add("d-none");
            }
            var html =[];
            for (let index = 0; index < data.length; index++) {
                var place = data[index];
                html.push('<div class="row"><div class="col"><div class="media mb-3 media-container"><img id="photo_'+ (index + 1) +'" src="" class="img-media img-fluid" alt="...">' + 
                   '<div class="media-body"><div class="media-wrapper"><h2 class="mt-0">'+ place.name + '</h2><p>'+ (typeof place.location.address === "undefined" ? "" :place.location.address + ', ') + (typeof place.location.city === "undefined" ? "" :place.location.city + '<br/> ')  + (typeof place.location.country === "undefined" ? 
                   "" :place.location.country) +'</p><div class="media-wrapper-footer">'+ 
                    '<button onclick="'+location.href+'=detail-page.html" type="button" class="btn btn-warning float-right" data-toggle="button">'+ 
                    'Read More</button><span id="rating_'+ (index +1) +'" class="details-rating"></span>'+
                    '</div></div></div></div></div></div>');

                collectAllIds.push(place.id);
            }
            document.getElementById("results_arr").insertAdjacentHTML("beforeend", html.join(""));
            callback(getURLVenuesId(collectAllIds));
            //console.log(data);
        });
    }
    populateCards(function () {
        
    });
    

});

function getAllData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    }
    xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
    };
    xhr.send();
}

function getURLVenuesId(id) {  
    
    var arrId = id;
    //console.log(arrId)
    for (let index = 0; index < arrId.length; index++) {
        var elementID = arrId[index];
        var url = "https://api.foursquare.com/v2/venues/" + elementID + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";    
        getRatings(index,url);
        
    }
}

// GET ALL VENUE's RATINGS 
function getRatings(i,url) {
    getAllData(url, function(resp) {
        var rating = JSON.parse(resp).response.venue.rating; 
        var getSingleRating = document.getElementById("rating_" + (i+1));
        getSingleRating.insertAdjacentHTML("beforeend", (typeof rating === "undefined" ? "<i class='fa fa-star'></i> N/A" :"<i class='fa fa-star'></i> " +rating+"")); 
    });
}



