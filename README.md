# [Curious World Website](https://camila-ribeiro.github.io/CuriousWorld-MilestoneProject/)

## Table of Contents
1. [**UX**](#ux)
    - [**User Stories**](#user-stories)
    - [**Libraries/Framework Used**](#Libraries/-framework-used)
    - [**Wireframes**](#wireframes)

2. [**Technologies Used**](#technologies-used)
    - [**Front-End Technologies**](#front-end-technologies)

3. [**Testing**](#testing)
    - [**Validators**](#validators)
    - [**Automated Testing**](#automated-testing)

4. [**Deployment**](#deployment)
    - [**Local Deployment**](#local-deployment)
    - [**Remote Deployment**](#remote-deployment)

5. [**Credits**](#credits)
    - [**Content**](#content)
    - [**Media**](#media)
    - [**Acknowledgements**](#acknowledgements)

***

 
## UX
Curious World is a website designed for users with interest in find out information about hotels, restaurants and museums across different cities all over the world. It offers photos, reviews, ratings, maps, websites and phone numbers.
The website is simple and structured in a way that is easy to navigate and find the information needed. It was designed based on database from Foursquare API.

 
### User Stories
- As a user I want to find out about hotels in London City, to perform this action I clicked on input where contains the message "Please type city's name (i.e Dublin)", then I selected the radio button "Hotels" and clicked on "search" button, doing that I achieved my goal to see a list of hotels in London.

- As a user I want to get inspiration about random places like hotels, restaurants and museums, then I clicked on place titles or images and got redirected to the Details page where I can find all the details about that selected place that I made on the homepage. My goal was accomplished and now I can read detailed information about the selected place such as full address, phone number, website, reviews, ratings and check the location on map.
 
- As a user I want to check the details about a specific hotel from the Search Results page, then I clicked on "Read More" button and got redirected to the Details page where I can find all the details about that selected hotel. My goal was accomplished and now I can read detailed information about the Hotel in London such as full address, phone number, website, reviews, ratings and check the location on map.
 
- As a user I want to contact Curous World website, to perform this action I clicked on "Contact Us" on the Menu Navigation and filled up the form with my full name, email address and message and submitted my query, doing that I achieve my goal to contact Curious World.

### Libraries/ Framework Used
- [Bootstrap 4](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [jQuery](https://jquery.com/download/)
- [Jasmine](https://jasmine.github.io/)
- [Jasmine - jQuery](https://github.com/velesin/jasmine-jquery)

### Wireframes
My wireframes for this project can be found in the [**wireframes**](assets/wireframes/) folder.
[Wireframes] (https://camila-ribeiro.github.io/CuriousWorld-MilestoneProject/UX/UX-Wireframe.pdf)

The website version for mobile and ipad works very similar to the desktop and Ipad pro version except the deck cards across the desktop and Ipad pro are placed on set of 2 or 3 cards in a row and for mobile it is stacked.


##### back to [top](#table-of-contents)
 
***


## Technologies Used

### Front-End Technologies
<b>Built with</b>
- ![HTML5](https://img.shields.io/static/v1?label=HTML&message=5&color=E34F26&logo=html5&logoColor=ffffff)
    - [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used as the base for markup text.
- ![CSS3](https://img.shields.io/static/v1?label=CSS&message=3&color=1572B6&logo=css3&logoColor=ffffff)
    - [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) - Used as the base for cascading styles.
- ![JavaScript](https://img.shields.io/static/v1?label=JavaScript&message=ES6&color=F7DF1E&logo=javascript&logoColor=ffffff)
    - [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Used as the base for website interaction.
- ![Jasmine](https://img.shields.io/static/v1?label=Jasmine&message=3.5.0&color=8A4182)
    - [Jasmine](https://jasmine.github.io/) - Used for Test-Driven Development (TDD).
- ![jasmine-jquery](https://img.shields.io/static/v1?label=jasmine-jquery&message=2.1.1&color=535B9F)
    - [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) - Used to simplify some of the automated Jasmine tests.

 
##### back to [top](#table-of-contents)
***

## Testing
Automated and manual testing were conducted and also a user test with two users. A few bugs were found during this process like .....? 
More details can be found on my [manual Testing file](../blob/master/testing/testing.md)

I also have validated all files using online validation sites:

### Validators 

#### HTML
* [W3C HTML Validator](https://validator.w3.org/)
#### CSS
* [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
#### JavaScript
* [JShint](https://jshint.com/)

### Automated Testing
I used [Jasmine 3.5.0](https://jasmine.github.io/) in conjunction with [jasmine-jquery 2.1.1](https://github.com/velesin/jasmine-jquery) to build all automated tests (test-driven development). These tests can be found in the [testing/automated(../blob/master/Testing.md) folder.

There are 13 tests in my specs, all successfully passing, with 0 failures.
![Jasmine Spec Results](assets/images/jasmine-test.jpg "Jasmine Spec Results")

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>My btnSearch.onclick function</b></summary>

- describe: The Search Button
- describe: Get the values of radio buttons and checked by default
- describe: My inputLoc.oninput function

</details>
<details>
<summary><b>CLICK HERE</b> to see tests on the <b>The Search Button</b></summary>

- should exist
- should trigger click on Search button
- should clear session storage when click on Search button
- should get value from radio button places when is checked
- should validate when value of input(inputLoc) is empty

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>Get the values of radio buttons and checked by default</b></summary>

- should exist
- radio button should be hotels value
- radio button should be restaurants value
- radio button should be museums value

</details>

<details>
<summary><b>CLICK HERE</b> to see tests on the <b>My inputLoc.oninput function</b></summary>

- should exist
- should validate when value of input(inputLoc) is deleted by user
- should validate when value of input(inputLoc) is filled

</details>

##### back to [top](#table-of-contents)

*** 
## Deployment

My [Curious World repository](https://camila-ribeiro.github.io/CuriousWorld-MilestoneProject/) was developed locally using **VS Code**, and all commits were pushed to **GitHub** using **Git**.

This website was deployed on GitHub pages built from the Master branch to publish the project.
To run this project locally, download the files and navigate through the index.html to start.
 
##### back to [top](#table-of-contents)

*** 
## Credits
### Content
- The text for section Homepage and About was copied from (https://www.lipsum.com/)
- The text for section Services was copied from:
* (https://drjosephjensen.com/microneedling/)
* (https://www.lushmedicalclinic.com.sg/skin-booster)
* (https://www.medicalnewstoday.com/articles/322060.php)
* (https://www.healthline.com/health/mesotherapy)
* (https://slimspa.ae/blog/cavitation-removes-fat-aids-body-slimming-goals/)
* (https://www.kimstotalbeauty.com/eyelash-extensions/)
* (http://www.essentialbeautytreatment.com/eye-lashes-extension.html)
* (https://www.reveal.ie/lashes-2/oui-russian-volume-lash-extensions)
* (https://www.lipsum.com/)
* (https://flowerbeautyandnails.wordpress.com/)

### Media
The photos used on this site were obtained from Foursquare API (https://developer.foursquare.com/).

### Acknowledgements
I received inspiration for this project from .....?

##### back to [top](#table-of-contents)

 

 

 
 

