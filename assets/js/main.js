var coordinates = getRandomLocation();
var url =
`https://api.foursquare.com/v2/venues/explore?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=50&ll=${coordinates}&query=`;
var collectAllVenuesId = [];

function getRandomLocation(){
    var arr = {paris: "48.8566,2.3522", 
        dublin: "53.3498,6.2603", 
        ny: "40.6971,-74.2598", 
        tokyo: "35.6762,139.6503",
        roma: "41.9028,12.4964", 
        berlin: "52.5200,13.4050", 
        london: "52.3555,1.1743",
        mexico: "19.3906,-99.2836",
        barcelona: "41.3947,2.0785",
        istanbul: "41.0049,28.7319"};
    var keys = Object.keys(arr);
    return arr[keys[ keys.length * Math.random() < 0]];
}

// SEND REQUEST
function getAllData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }
    };
    xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
    };
    xhr.send();
}

function populateInspiration(places, cb) {
    getAllData(url + places, function(resp) {
        var data = JSON.parse(resp).response.groups[0].items;
        var list = Object.keys(data);
        cb(getRandomItems(list, data, places));
    });
}

//CALLING API INTO INSPIRE ME SECTION
populateInspiration("hotels",function(){
    populateInspiration("restaurants",function(){
        populateInspiration("museums", function(){
            // getURLVenuesId(collectAllVenuesId);
        });
    });
});

//LOOP RANDOM ITEMS INTO INSPIRE ME SECTION
function getRandomItems(list, data, places) {
    for (var index = 0; index < list.length; index++) {   
        if (list.length >= 3 && index < 3) {
            var randomIndex = Math.floor(Math.random() * list.length);
            var randomObject = data[list[randomIndex]];

            collectAllVenuesId.push(randomObject.venue.id);
            getTitleInspiration(randomObject,index,places);        
        }
    }
}

//GET VENUES's TITLE INTO INSPIRE ME SECTION
function getTitleInspiration(obj,i,places) {
    if(places === "hotels") {
        var hotelName = document.getElementById(`hotels_insp_${i+1}`);
        hotelName.innerHTML = obj.venue.name;
        hotelName.onclick = function(){
            handleClickDetails(obj.venue.id);
        };
    }
    else if(places === "restaurants") {
        var restName = document.getElementById(`rest_insp_${i+1}`);
        restName.innerHTML = obj.venue.name;
        restName.onclick = function(){
            handleClickDetails(obj.venue.id);
        };
    }
    else if(places === "museums") {
        var museumName = document.getElementById(`museum_insp_${i+1}`);
        museumName.innerHTML = obj.venue.name;
        museumName.onclick = function(){
            handleClickDetails(obj.venue.id);
        };
    }
}

// GET ALL VENUES's URL
function getURLVenuesId(id) {  
    var arrId = id;
    for (var index = 0; index < arrId.length; index++) {
        var elementID = arrId[index];
        var url = `https://api.foursquare.com/v2/venues/${elementID}/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323`;    
        getRatings(index,url);
        getPhotos(index,url,elementID);
    }
}

// GET ALL VENUE's RATINGS 
function getRatings(i,url) {
    getAllData(url, function(resp) {
        var rating = JSON.parse(resp).response.venue.rating; 
        var getSingleRating = document.getElementById(`rating_${i+1}`);
        getSingleRating.innerHTML = `<span class="details-rating"><i class="fa fa-star"></i></span> ${rating}`; 
    });
}

// GET ALL VENUE's PHOTOS
function getPhotos(i,url,id) {
    getAllData(url, function(resp) {
        var photos = JSON.parse(resp).response.venue.photos; 
        var getSinglePhoto = document.getElementById(`photo_${i+1}`);
        if (!photos.groups.length) {
            url = "assets/images/image-not-available.jpg"; 
        }else{
            url = `${photos.groups[0].items[0].prefix + photos.groups[0].items[0].width}` + "x" + `${photos.groups[0].items[0].height + photos.groups[0].items[0].suffix}`;
        } 
        getSinglePhoto.classList.remove("img-insp");
        getSinglePhoto.classList.add("cover-image");
        getSinglePhoto.src = url;

        getSinglePhoto.onclick = function(){
            handleClickDetails(id);
        };
    });
}

// GET SEARCH
var btnSearch = document.getElementById("button_search");
var inputLoc = document.getElementById("places_loc");
var inputMessage = document.getElementById("places_loc_error");

btnSearch.onclick = function(){
    sessionStorage.clear();
    var radioPlaces = document.querySelector('input[name="places"]:checked').value;

    if (inputLoc.value == "" ||  inputLoc.value == null) {
        inputLoc.classList.add("border-danger");
        inputMessage.style.display = "block"; 
     }else{
        sessionStorage.setItem("place",radioPlaces);
        sessionStorage.setItem("location",inputLoc.value);
        window.location.href='search-results.html';
     }
};

inputLoc.oninput = function(){
    if (inputLoc.value == "" ||  inputLoc.value == null) {
        inputLoc.classList.add("border-danger");
        inputMessage.style.display = "block"; 
     }else{
        inputLoc.classList.remove("border-danger");
        inputMessage.style.display = "none"; 
    }
};

function handleClickDetails(id){
    sessionStorage.setItem("place-id",id);
    window.location.href='detail-page.html';
}