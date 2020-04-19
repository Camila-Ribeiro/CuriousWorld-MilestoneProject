var collectAllIds = [];
window.addEventListener("load", function() {
    var location = sessionStorage.getItem("location");
    var place = sessionStorage.getItem("place");
    var urlSearch = `https://api.foursquare.com/v2/venues/search?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323&limit=50&ll=53.350140, -6.266155&query=${place}&near=${location}`;
    document.getElementById("city_place").innerHTML = place;
    document.getElementById("city_location").innerHTML = location;
    
    function populateCards(callback) {
        getAllData(urlSearch, function(resp) {
            var data = JSON.parse(resp).response.venues;
            // console.log(data)
            if (data == "" || data  == null) {
                var noResults= document.getElementById("no_results");
                var resultsFound= document.getElementById("results_found");
                noResults.classList.remove("d-none");
                resultsFound.classList.add("d-none");
            }
            displayData(data);
            // callback(getURLVenuesId(collectAllIds));
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
            document.getElementById("spinner-front").classList.remove("show");
            document.getElementById("spinner-back").classList.remove("show");
            callback(this.responseText);
        }
    };
    xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
    };
    document.getElementById("spinner-front").classList.add("show");
    document.getElementById("spinner-back").classList.add("show");
    xhr.send();
}

// GET ALL VENUES's URL
function getURLVenuesId(id) {  
    var arrId = id;
    for (var index = 0; index < arrId.length; index++) {
        var elementID = arrId[index];
        var url = `https://api.foursquare.com/v2/venues/${elementID}/?client_id=A3ELKZDU1FE5AHJRUOOFNZSMBA4I1M0JXTS4EIHUQ2PNML3W&client_secret=1ATYJVZ14BROV0XZCKLSB3LESEVSTYH2P0L533MHJ1DI5FKE&v=20180323`;    
        getRatings(index,url);
        getPhotos(index,url);
    }
}

// GET ALL VENUE's RATINGS 
function getRatings(i,url) {
    getAllData(url, function(resp) {
        var rating = JSON.parse(resp).response.venue.rating; 
        var getSingleRating = document.getElementById(`rating_${i+1}`);
        getSingleRating.insertAdjacentHTML("beforeend", `${typeof rating === "undefined" ? "<i class='fa fa-star'></i> N/A" :`<i class='fa fa-star'></i> ${rating}`}`); 
    });
}

// GET ALL VENUE's PHOTOS
function getPhotos(i,url) {
    getAllData(url, function(resp) {
        var url;
        var photos = JSON.parse(resp).response.venue.photos; 
        var getSinglePhoto = document.getElementById(`photo_${i+1}`);
        if (!photos.groups.length) {
            url = "assets/images/image-not-available.jpg"; 
        }else{
            url = `${photos.groups[0].items[0].prefix}` + 350 + "x" + 250 + `${photos.groups[0].items[0].suffix}`;
        } 
        getSinglePhoto.src = url;
    });
}
// GET VENUE ID AND OPEN DETAILS PAGE 
function handleClick(id) {
  	sessionStorage.setItem("place-id",id);
   window.location.href='detail-page.html';
}

//DISPLAY DATA INSIDE DIVS AND PAGINATION
function displayData(data){
    var html =[],
    page = 1,
    pagination = [];
    
    for (var index = 0; index < data.length; index++) {
        var place = data[index];
        
        if(index % 10 === 0){    
            pagination.push(`<li class="page-item ${page === 1 ? 'active' : ''}" onclick="handlePagination(this)"><span class="page-link">${page}</span></li>`);       
            index !== 0 ? html.push(`</div><div class="page page${page}">`) : html.push(`<div class="page page${page} currentPage">`);
            html.push(`<div class="row"><div class="col"><div class="media mb-3 media-container"><img id="photo_${index + 1}" 
            src="" class="img-media img-fluid" alt="..."><div class="media-body"><div class="media-wrapper"><h2 class="mt-0">${place.name}</h2>
            <p>${typeof place.location.address === "undefined" ? "" :place.location.address + ","}
            ${typeof place.location.city === "undefined" ? "" :place.location.city + '<br/>'} ${typeof place.location.country === "undefined" ? 
            "" :place.location.country} </p><div class="media-wrapper-footer"><button onclick="handleClick('${place.id}');" 
            type="button" class="btn btn-warning float-right" data-toggle="button">Read More</button><span id="rating_${index +1}" 
            class="details-rating"></span></div></div></div></div></div></div>`);
            page++;
        } else {
            html.push(`<div class="row"><div class="col"><div class="media mb-3 media-container"><img id="photo_${index + 1}" 
            src="" class="img-media img-fluid" alt="..."><div class="media-body"><div class="media-wrapper"><h2 class="mt-0">${place.name}</h2>
            <p>${typeof place.location.address === "undefined" ? "" :place.location.address + ","}
            ${typeof place.location.city === "undefined" ? "" :place.location.city + '<br/>'} ${typeof place.location.country === "undefined" ? 
            "" :place.location.country} </p><div class="media-wrapper-footer"><button onclick="handleClick('${place.id}');" 
            type="button" class="btn btn-warning float-right" data-toggle="button">Read More</button><span id="rating_${index +1}" 
            class="details-rating"></span></div></div></div></div></div></div>`);
        }
        collectAllIds.push(place.id);
    }
    document.getElementById("results_arr").insertAdjacentHTML("beforeend", html.join(""));
    document.getElementById("pagination").insertAdjacentHTML("beforeend", pagination.join(""));
}

// PAGINATION
function handlePagination(event) {
    var page = event.children[0].innerText;
    resetClass();
    document.querySelector(`.page${page}`).classList.add("currentPage");
    event.classList.add("active");
    smoothScroll();
}

const smoothScroll = (h) => {
    let i = h || 0;
    if (i < 90) {
        setTimeout(() => {
        window.scrollTo(0, i);
        smoothScroll(i + 1);
        }, 10);
    }
};

function resetClass() {
    var array = document.querySelectorAll(".currentPage");
    var active = document.querySelectorAll(".active");
    for (let index = 0; index < array.length; index++) {
        array[index].classList.remove("currentPage");
    }

    for (let index = 0; index < active.length; index++) {
        active[index].classList.remove("active");
    }
}

function prevPage(event) {
    var prevListItem = document.querySelectorAll(".page-item.active")[0].previousElementSibling;
    var prev_page = document.querySelectorAll(".currentPage")[0].previousElementSibling;
    prev_page = prev_page.className.replace('page page','');

    resetClass();
    document.querySelector(`.page${prev_page}`).classList.add("currentPage");
    prevListItem.classList.add("active");
    
    if (prev_page <= 1) {
        event.classList.add("d-none");
    }
    if(document.getElementById("btn_next").classList.contains("d-none")){
        document.getElementById("btn_next").classList.remove("d-none");
    }
}

function nextPage(event) {
    var nextListItem = document.querySelectorAll(".page-item.active")[0].nextElementSibling;
    var next_page = document.querySelectorAll(".currentPage")[0].nextElementSibling;
    var last_page = document.querySelectorAll(".currentPage")[0].nextSibling.nextElementSibling;

    if(next_page != null) {
        next_page = next_page.className.replace('page page','');
        if (next_page >= 2) {
            document.getElementById("btn_prev").classList.remove("d-none");
        }
        resetClass();
        document.querySelector(`.page${next_page}`).classList.add("currentPage");
        nextListItem.classList.add("active");
        //smoothScroll();
    }
    if(last_page == null) {
        event.classList.add("d-none");
    }
}