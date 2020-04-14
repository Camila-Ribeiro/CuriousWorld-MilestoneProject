// describe("My getAllData function", function() {

//     beforeEach(function() {
//         data = new getAllData();
//     });
//     describe("should make XHR request", function() {
//         it("should make XHR request", function() {
//             var xhr = {
//                 open: jasmine.createSpy('open')
//             };
        
//             XMLHttpRequest = jasmine.createSpy('XMLHttpRequest');
//             XMLHttpRequest.and.callFake(function () {
//                 return xhr;
//             });
        
//             // act
        
//             submit();
        
//             // assert
        
//             expect(xhr.open).toHaveBeenCalled(); 
//         })
//     })
// })

describe("My getRandomItems function", function() {

    beforeEach(function() {
       
        URLVenuesId = new getURLVenuesId[id];
    })
    describe("Returns random items from API", function() {
        it("should exist", function() {
           
            var result = getURLVenuesId(collectAllVenuesId);
            
            expect(result).toBeDefined();
        })
        // it("should return an item when called as getRandomItems(list,data,places)", function() {
        //     var result = getRandomItems(1,name,hotel);
        //     expect(result).toBe("item");
        // });
    })
})