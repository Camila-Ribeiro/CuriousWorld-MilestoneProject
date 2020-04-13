window.addEventListener("load", function() {
    var venueId = sessionStorage.getItem("place-id");
    var urlDetails = "https://api.foursquare.com/v2/venues/" + venueId + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";  

    function populateDetails() {
        getAllData(urlDetails, function(resp) {
            var data = JSON.parse(resp).response.venue;
            var cardTittle_Address =[];
            var getHours = data.hours;
            var url = data.url;
            var number = data.contact;
            var getPhotosItems = data.photos.groups;
            var getReviewsItems = data.listed.groups;
            var lat = data.location.lat;
            var lng = data.location.lng;

            

            cardTittle_Address.push('<h1 class="mt-1">'+ data.name +'<span class="details-rating"> '+ (typeof data.rating === "undefined" ? "<i class='fa fa-star'></i> N/A" :"<i class='fa fa-star'></i> " +data.rating+"")
                +'</span></h1><p>'+ data.location.formattedAddress +'</p>');
            document.getElementById("card_details_header").innerHTML = cardTittle_Address.join("");
            
            getTimes(getHours);
            getWebsite(url);
            getPhoneNumber(number);
            getPhotos(getPhotosItems);
            getReview(getReviewsItems);
            getLocation(lat,lng);
            console.log(data)
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

function getPhotos(items){
    var photoSlides =[];

    if (items === undefined || items.length == 0) {
        photoSlides.push('<img src="assets/images/image-not-available.jpg" class="img-media img-fluid" alt="image-not-available">');
        document.getElementById("single_photo").innerHTML = photoSlides.join("");
    } else {
        var allItems = items[0].items;
        for (let i = 0; i < allItems.length; i++) { 
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

function getTimes(hours) {
    if (typeof hours === "undefined") {
        document.getElementById("opening_hours").innerHTML = "N/A";
    }else{
        var daysAndTimes =[];
        for (let index = 0; index < hours.timeframes.length; index++) {
            var time = hours.timeframes[index].open[0].renderedTime;
            var days = hours.timeframes[index].days
            var splitDays = days.slice(" ", 7);
            var formattedDays = splitDays + " "+ time + "<br/>";
            daysAndTimes.push(formattedDays);
            document.getElementById("opening_hours").innerHTML = daysAndTimes.join("")
        }
    }
}

function getWebsite(url){
    if (url === null || typeof url === "undefined" ) {
        document.getElementById("website").innerHTML = "N/A";
    } else {
        var formattedURL = url.slice(6);
        if (url.length >= 7) {
            formattedURL = url.slice(7);
        }
        var website = "<i class='fa fa-globe-americas'></i> <a href=' + url + '>website</a>";
        document.getElementById("website").innerHTML = website;
    }
}

function getPhoneNumber(number){
    if (typeof number.phone === "undefined") {
        document.getElementById("opening_hours").innerHTML = "N/A";
    }else{
        var PhoneNumber = "<i class='fa fa-phone'></i> <a href='tel:"+number.phone+" '>" + number.formattedPhone + "</a>";
        document.getElementById("phone_number").innerHTML = PhoneNumber;
    }
}

function getReview(items){
    var allReviews =[];
    if (items[0].items.length === 0) {
        allReviews.push('<div class="card"><div class="card-body"><h5>No Reviews available</h5></div></div>');
        document.getElementById("reviews").innerHTML = allReviews.join("");
    } else {
        var allItems = items[0].items;
        for (let i = 0; i < allItems.length; i++) { 
            var review = allItems[i];

            if (review.description !== "" && i < 3) {
                allReviews.push('<div class="card">'+
                '<img src="'+review.user.photo.prefix + "original" + review.user.photo.suffix+'" class="w-25 mt-1 rounded-circle mx-auto card-img-top" alt="..." />'+
                '<div class="card-body">'+
                '<h5 class="card-title">'+review.user.firstName+'</h5>'+
                '<p class="card-text">'+review.description+'</p>'+
                '</div>'+
                '</div>');
                document.getElementById("reviews").innerHTML = allReviews.join("");
            }
        }
    }   
}

function getLocation(lat,lng){
    document.getElementById("google_maps").src = "https://maps.google.com/maps/embed/v1/place?key=AIzaSyAOySuSdP6NVXz7LglBAl1sp1CHXrZeFqQ&q="+lat+","+lng+""
}