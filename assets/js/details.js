window.addEventListener("load", function() {
    var venueId = sessionStorage.getItem("place-id");
    var urlDetails = "https://api.foursquare.com/v2/venues/" + venueId + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";  

    function populateDetails() {
        getAllData(urlDetails, function(resp) {
            var data = JSON.parse(resp).response.venue;
            var cardTittle_Address =[];
            var getHours = data.hours.timeframes
            var url = data.url;
            var getPhotosItems = data.photos.groups;
            
            var getPhoneNum = data.contact.formattedPhone;
            document.getElementById("phone_number").innerHTML = getPhoneNum

            cardTittle_Address.push('<h1 class="mt-1">'+ data.name +'<span class="details-rating"> '+ (typeof data.rating === "undefined" ? "<i class='fa fa-star'></i> N/A" :"<i class='fa fa-star'></i> " +data.rating+"")
                +'</span></h1><p>'+ data.location.formattedAddress +'</p>');
            document.getElementById("card_details_header").innerHTML = cardTittle_Address.join("");
            
            getTimes(getHours);
            getWebsite(url);
            getPhotos(getPhotosItems);
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
    // items = data.photos.groups
    var photoSlides =[];

    if (items === undefined || items.length == 0) {
        photoSlides.push('<img src="assets/images/image-not-available.jpg" class="img-media img-fluid" alt="image-not-available">');
        document.getElementById("single_photo").innerHTML = photoSlides.join("");
    } else {
        var allItems = items[0].items;
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

function getTimes(hours) {
    var daysAndTimes =[];
    for (let index = 0; index < hours.length; index++) {
        var time = hours[index].open[0].renderedTime;
        var days = hours[index].days
        var splitDays = days.slice(" ", 7);
        var formattedDays = splitDays + " "+ time + "<br/>";
        daysAndTimes.push(formattedDays);
        document.getElementById("opening_hours").innerHTML = daysAndTimes.join("")
    }
}

function getWebsite(url){
    var formattedURL = url.slice(6);
    if (url.length >= 7) {
        formattedURL = url.slice(7);
    }
    var website = "<i class='fa fa-globe-americas'></i> <a href=' + url + '>' + formattedURL + '</a>";
    document.getElementById("website").innerHTML = website;
}
