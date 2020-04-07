
window.addEventListener("load", function() {
    var location = sessionStorage.getItem("location");
    var place = sessionStorage.getItem("place");
    var urlSearch = "https://api.foursquare.com/v2/venues/search?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=50&ll=53.350140, -6.266155&query=" + place + "&near=" + location;
    document.getElementById("city_place").innerHTML = place;
    document.getElementById("city_location").innerHTML = location;

    function populateCards() {
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
                html.push('<div class="row"><div class="col"><div class="media mb-3 media-container"><img src="https://placehold.co/350x250" class="img-media" alt="...">' + 
                   '<div class="media-body"><div class="media-wrapper"><h2 class="mt-0">'+ place.name + '</h2><p>'+ (place.location.address?place.location.address + ', ':"") + place.location.city + '<br/> ' + place.location.country +'</p><div class="media-wrapper-footer">'+ 
                    '<button onclick="location.href=" "type="button" class="btn btn-warning float-right" data-toggle="button">'+ 
                    'Read More</button><span class="details-rating"><i class="fa fa-star"></i></span><p>30 reviews</p> '+
                    '</div></div></div></div></div></div>')
         
            }
     
            document.getElementById("results_arr").insertAdjacentHTML("beforeend", html.join("")) ;
            
            console.log(data)
        });
    }
    populateCards()

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



