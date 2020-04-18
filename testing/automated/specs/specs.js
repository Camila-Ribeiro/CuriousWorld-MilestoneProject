describe("Curious World website testing", () => {

    beforeEach(() => {
        setFixtures(`
            <div class="jumbotron">
                <div class="input-group mb-3">
                    <input id="places_loc" type="text" class="form-control " placeholder="Please type city's name (i.e Dublin)" aria-label="city" aria-describedby="button-addon">
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
            </div>
        `);
    });

    describe("The Search Button", () => {

        beforeEach(() => {
            $("#button_search").click();
            let inputLoc = document.getElementById("places_loc");
            let inputMessage = document.getElementById("places_loc_error");
            let radioPlaces = document.querySelectorAll('input[name="places"]:checked').value;
            if (inputLoc.value == "" ||  inputLoc.value == null) {
                inputLoc.classList.add("border-danger");
                inputMessage.style.display = "block"; 
            }else{
                sessionStorage.setItem("place",radioPlaces);
                sessionStorage.setItem("location",inputLoc.value);
             }
        });

        it("should exist", () => {
            expect($("btnSearch")).toBeDefined();
        });

        it("should trigger click on Search button", () => {
            let spyEvent = spyOnEvent('#button_search', 'click');
            $('#button_search').click();
            expect('click').toHaveBeenTriggeredOn('#button_search');
            expect(spyEvent).toHaveBeenTriggered();
        });

        it("should clear session storage when click on Search button", () => {
            let spyEvent = spyOnEvent('#button_search', 'click');
            let store = {};

            $('#button_search').click();
            expect('click').toHaveBeenTriggeredOn('#button_search');
            expect(spyEvent).toHaveBeenTriggered();

            spyOn(sessionStorage, 'clear').and.callFake(function () {
                store = {};
            });
        });

        it("should get value from input radio when click on Search button", () => {
            let spyEvent = spyOnEvent('#button_search', 'click');
            let radioPlaces = document.querySelector('input[name="places"]:checked').value;

            $('#button_search').click();
            expect('click').toHaveBeenTriggeredOn('#button_search');
            expect(spyEvent).toHaveBeenTriggered();
            expect(radioPlaces).toHaveValue();
        });
        
        it("should validate when value of input text is empty when click on Search button", () => {
            let spyEvent = spyOnEvent('#button_search', 'click');
            let inputLocValue = document.getElementById("places_loc").value;
            let inputLoc = document.getElementById("places_loc");
            let inputMessage = document.getElementById("places_loc_error");
           
            $('#button_search').click();
            expect('click').toHaveBeenTriggeredOn('#button_search');
            expect(spyEvent).toHaveBeenTriggered();
            expect(inputLocValue).not.toHaveValue("");
            expect(inputLoc).toHaveClass("border-danger");
            expect(inputMessage).toHaveCss({display:"block"});
        });

        describe("Session storage setItem when click on Search button", () => {
            beforeEach(() => {
                setFixtures(`<input id="places_loc" value="London" type="text" class="form-control " placeholder="Please type city's name (i.e Dublin)" aria-label="city" aria-describedby="button-addon2">
                    <button id="button_search" class="btn btn-outline-secondary" type="button">Search</button>
                    <input class="form-check-input" type="radio" name="places" id="inlineHotels" value="hotels" checked>
                    <input class="form-check-input" type="radio" name="places" id="inlineRestautants" value="restaurants">
                    <input class="form-check-input" type="radio" name="places" id="inlineMuseums" value="museums">
                `);
            });
            it('should add keys/values to the session storage when when click on Search button', () => {
                let spyEvent = spyOnEvent('#button_search', 'click');
                let inputLocValue = document.getElementById("places_loc").value;
                let radioPlaces = document.querySelector('input[name="places"]:checked').value;
                $('#button_search').click();
                expect('click').toHaveBeenTriggeredOn('#button_search');
                expect(spyEvent).toHaveBeenTriggered();
            
                spyOn(window.sessionStorage, 'setItem').and.callFake(function () {
                    Object.defineProperty(sessionStorage, "location", { value: inputLocValue,configurable:true,enumerable:true,writable:true });
                    Object.defineProperty(sessionStorage, "places", { value: radioPlaces,configurable:true,enumerable:true,writable:true });
                    window.sessionStorage.setItem(inputLocValue, radioPlaces);
                    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(inputLocValue, radioPlaces);
                });

            });
        });
    });

    describe("Get the values from radio buttons", () => {
        it("should exist", () => {
            let input = document.querySelectorAll('input[name="places"]:checked');
            expect(input).toBeDefined();
        });
        it("radio button should be hotels value", () => {
            let input = document.querySelector('input[name="places"]');
            expect(input).toBeTruthy();
        });
        it("radio button should be restaurants value", () => {
            let radioPlaces = 'restaurants'; 
            expect(radioPlaces).toBeTruthy();
        });

        it("radio button should be museums value", () => {
            let radioPlaces = 'museums';
            expect(radioPlaces).toBeTruthy();
        });
    });
    
    describe("Search input text inline validation", () => { 
        beforeEach(() => {
            setFixtures(`<input id="places_loc" value="London" type="text" class="form-control " placeholder="Please type city's name (i.e Dublin)" aria-label="city" aria-describedby="button-addon2">
            <div id="places_loc_error" class="invalid-feedback">Please enter a valid city</div>`);
            let inputLoc = document.getElementById("places_loc");
            let inputMessage = document.getElementById("places_loc_error");
            inputLoc.oninput = function(){
                if (inputLoc.value == "" ||  inputLoc.value == null) {
                    inputLoc.classList.add("border-danger");
                    inputMessage.style.display = "block"; 
                }else{
                    inputLoc.classList.remove("border-danger");
                    inputMessage.style.display = "none"; 
                }   
            };
        });
        it("should exist", () => {
            expect(inputLoc).toBeDefined();
        });
        it("should validate when value of input text is deleted by user", () => {
            let inputLocValue = document.getElementById("places_loc");
            inputLocValue.removeAttribute("value");
            let inputLoc = document.getElementById("places_loc");
            let inputMessage = document.getElementById("places_loc_error");

            let spyEvent = spyOnEvent(inputLoc, 'input');
            $('#places_loc').val($('#places_loc').val()).trigger("input");
            expect(spyEvent).toHaveBeenTriggered();
    
            expect(inputLocValue).not.toHaveValue();
            expect(inputLoc).toHaveClass("border-danger");
            expect(inputMessage).toHaveCss({display:"block"});
        });
        it("should validate when value of input text has value typed by user", () => {
            let inputLocValue = document.getElementById("places_loc").value;
            let inputLoc = document.getElementById("places_loc");
            let inputMessage = document.getElementById("places_loc_error");

            let spyEvent = spyOnEvent(inputLoc, 'input');
            $('#places_loc').val($('#places_loc').val()).trigger("input");
            expect(spyEvent).toHaveBeenTriggered();
    
            expect(inputLocValue).toHaveValue();
            expect(inputLoc).not.toHaveClass("border-danger");
            expect(inputMessage).toHaveCss({display:"none"});
        });
    });
}); //CLOSE FIRST DESCRIBE