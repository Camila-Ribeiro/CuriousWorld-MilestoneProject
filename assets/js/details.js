window.addEventListener("load", function() {
    var venueId = sessionStorage.getItem("place-id");
    var urlDetails = "https://api.foursquare.com/v2/venues/" + venueId + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";  

    function populateDetails() {
        getAllData(urlDetails, function(resp) {
            var data = JSON.parse(resp).response.venue;
            var getPhoto = data.photos.groups;
            var cardTittle_Address =[];

            cardTittle_Address.push('<h1 class="mt-1">'+ data.name +'<span class="details-rating"> '+ (typeof data.rating === "undefined" ? "<i class='fa fa-star'></i> N/A" :"<i class='fa fa-star'></i> " +data.rating+"")
                +'</span></h1><p>'+ data.location.formattedAddress +'</p>');
            document.getElementById("card_details_header").innerHTML = cardTittle_Address.join("");

            cardSlides(getPhoto);
        });
    }  

    populateDetails();
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

function cardSlides(photos_details){
    // photo = data.photos.groups
    var photoSlides =[];

    if (photos_details === undefined || photos_details.length == 0) {
        photoSlides.push('<img src="assets/images/image-not-available.jpg" class="img-media img-fluid" alt="image-not-available">');
        document.getElementById("single_photo").innerHTML = photoSlides.join("");
    } else {
        var allItems = photos_details[0].items;
        for (let i = 0; i < allItems.length; i++) { 
            // var photo = items[i];
            if (allItems.length > 1 ) {
                photoSlides.push((allItems[0] ? '<div class="carousel-item '+(i === 0 ? "active" : "")+'"><img src=" '+ allItems[i].prefix + 200 + "x" + 100 + allItems[i].suffix +' " class="d-block w-100" alt="..."></div>' :'<div class="carousel-item"><img src=" '+ allItems[i].prefix + 200 + "x" + 100 + allItems[i].suffix +' " class="d-block w-100" alt="..."></div>'));
                document.getElementById("carousel_details").innerHTML = photoSlides.join("");
            } else {
                photoSlides.push('<img src="'+allItems[i].prefix + 200 + "x" + 100 + allItems[i].suffix+'" class="img-media img-fluid" alt="image-not-available">');
                document.getElementById("single_photo").innerHTML = photoSlides.join("");
            } 
        }
    }   
}