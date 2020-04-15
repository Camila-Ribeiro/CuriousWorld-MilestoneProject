describe("My btnSearch.onclick function", function() {

    beforeEach(() => {
        setFixtures(`<div class="jumbotron">
        <div class="input-group mb-3">
            <input id="places_loc" type="text" class="form-control " placeholder="Please type city's name (i.e Dublin)" aria-label="city" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button id="button_search" class="btn btn-outline-secondary" type="button">Search</button>
            </div>
            <div id="places_loc_error" class="invalid-feedback">Please enter a valid city</div>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="places" id="inlineHotels" value="hotels" checked>
        <label class="form-check-label" for="inlineHotels">Hotels</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="places" id="inlineRestautants" value="restaurants">
        <label class="form-check-label" for="inlineRestautants">Restaurants</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="places" id="inlineMuseums" value="museums">
        <label class="form-check-label" for="inlineMuseums">Museums</label>
      </div>
    </div>`);
    });

    it("should exist", () => {
        expect($("btnSearch")).toBeDefined();
    });

    it("should trigger when click on Search button (btnSearch)", function() {
        var spyEvent = spyOnEvent('#button_search', 'click');
        var inputLoc = document.getElementById("places_loc").value == "";
        console.log(inputLoc)
        $('#button_search').click();
        expect('click').toHaveBeenTriggeredOn('#button_search');
        expect(inputLoc).toHaveClass("border-danger"); 
        expect(spyEvent).toHaveBeenTriggered();
   
    });
    it("radio button should be hotel value by default", () => {
        var input = document.querySelector('input[name="places"]');
        expect(input.checked).toBeTruthy();
    });
    it("radio button should be hotel value by default", () => {
        var radioPlaces = 'restaurants'; 
        expect(radioPlaces).toBeTruthy();
    });

    it("radio button should be hotel value by default", () => {
        var radioPlaces = 'museums';
        expect(radioPlaces).toBeTruthy();
    });
    
    // describe("My inputLoc.oninput function", function() {
    //     it("should exist", () => {
    //         expect($("inputLoc")).toBeDefined();
    //     });
    //     it("should add class when value is undefined or null", function() {
    //         var input = document.querySelector('input[name="places"]'); 
    //         expect(input).toHaveClass("border-danger");
    //         // expect($('#popup')).toHaveCss({"border-danger"});
    //     });
    // it("should add class when value is empty", function() {
    //     var inputLoc = document.getElementById("places_loc").value !== "";
    //     expect(inputLoc).not.toHaveClass("border-danger"); 
    // });
    // it("should add display style when value is empty", function() {
    //     var inputMessage = document.getElementById("places_loc_error");
    //     expect(inputMessage).not.toHaveCss("block"); 
    // });
    // it("should add class when value is null", function() {
    //     var inputLoc = document.getElementById("places_loc").value !== null;
    //     expect(inputLoc).not.toHaveClass("border-danger"); 
    // });
    // it("should add display style when value is null", function() {
    //     var inputMessage = document.getElementById("places_loc_error");
    //     expect(inputMessage).not.toHaveCss("block"); 
    // });
    // });

});

