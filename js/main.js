var url =
"https://api.foursquare.com/v2/venues/explore?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=50&ll=48.8566, 2.3522&query=";
var collectAllVenuesId = [];

// SEND REQUEST
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

function populateInspiration(places, cb) {
    getAllData(url + places, function(resp) {
        data = JSON.parse(resp).response.groups[0].items;
        var list = Object.keys(data);
        cb(getRandomItems(list, data, places))
    });
}

//CALLING API INTO INSPIRE ME SECTION
// populateInspiration("hotels",function(){
//     populateInspiration("restaurants",function(){
//         populateInspiration("museums", function(){
//             getURLVenuesId(collectAllVenuesId);
//         })  
//     })
// });


//LOOP RANDOM ITEMS INTO INSPIRE ME SECTION
function getRandomItems(list, data, places) {
    for (let index = 0; index < list.length; index++) {   
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
        var hotelName = document.getElementById("hotels_insp_" + (i+1));
        hotelName.innerHTML = obj.venue.name;
    }
    else if(places === "restaurants") {
        var restName = document.getElementById("rest_insp_" + (i+1));
        restName.innerHTML = obj.venue.name;
    }
    else if(places === "museums") {
        var museumName = document.getElementById("museum_insp_" + (i+1));
        museumName.innerHTML = obj.venue.name;
    }
}

// GET ALL VENUES's URL
function getURLVenuesId(id) {  
    var arrId = id;
    for (let index = 0; index < arrId.length; index++) {
        var elementID = arrId[index];
        var url = "https://api.foursquare.com/v2/venues/" + elementID + "/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323";    
        getRatings(index,url);
        getPhotos(index,url);
    }
}

// GET ALL VENUE's RATINGS 
function getRatings(i,url) {
    getAllData(url, function(resp) {
        var rating = JSON.parse(resp).response.venue.rating; 
        var getSingleRating = document.getElementById("rating_" + (i+1));
        getSingleRating.insertAdjacentHTML("beforeend", rating); 
    });
}

// GET ALL VENUE's PHOTOS
function getPhotos(i,url) {
    getAllData(url, function(resp) {
        var photos = JSON.parse(resp).response.venue.photos.groups[0].items[0]; 
        var url = photos.prefix + photos.width + "x" + photos.height + photos.suffix;
        var getSinglePhoto = document.getElementById("photo_" + (i+1));
        getSinglePhoto.src = url;

    });
}

// GET SEARCH
var btnSearch = document.getElementById("button_search");
var inputLoc = document.getElementById("places_loc");
var inputMessage = document.getElementById("places_loc_error");

btnSearch.onclick = function(){
    var radioPlaces = document.querySelector('input[name="places"]:checked').value;
    
    if (inputLoc.value == "" ||  inputLoc.value == null) {
        inputLoc.classList.add("border-danger");
        inputMessage.style.display = "block"; 
        
     }else{
        window.location.href='search-results.html' + inputLoc.value + radioPlaces;
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

window.addEventListener("load", function() {
//   console.log("All assets are loaded");
//     var options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0
//     };

//     function success(pos) {
//       var crd = pos.coords;

//       console.log('Your current position is:');
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//     }

//     function error(err) {
//       console.log("error")
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     navigator.geolocation.getCurrentPosition(success, error, options);
});