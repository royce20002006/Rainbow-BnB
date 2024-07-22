# Rainbow Bnb 
Check out the live version at https://rainbow-bnb.onrender.com

RainbowBnB is a clone of airbnb, which is a website that has listings of places to stay. It is similar to a hotel except it is more of houses to rent or cabins. The backend of rainbow bnb is built with express with a PostgreSQL database. React is what is used on the frontend. Redux is used to manage state for the frontend.

# Features and Implementation

## React router and components

rainbowbnb is built using react with redux. It has a router the first thing is the header and all other components are children of the header to make this a single page application. When the page is reloaded react calls redux to re render any components needed to get all the pages to work. 


## Frontend and Backend Interaction

rainbow bnb minimized data retrievel from the server by loading all spots at once and storing them in a state. Other items are only rendered if they are needed. this helps with speed on the site to minimize the customer having to wait for a reload on every different page that they may click in react. 

## splash page

![splashPage](./images/Screenshot%202024-07-19%20at%201.28.30%20AM.png)

On entering the website users are greeted with a splash page that shows all spots.  They are able to see a picture of the spot along with the city and state in which the spots are at. They also are able to see the price per night of the spot and they are able to see the average star rating of that spot. They do not need to log in to see these pages. 

## Authentication

The person will have to log in or sign up to create their own spot or review a spot. This is done through a login form modal or sign up modal. The login form will require a username or email and a password that has been hashed and encrypted. On signup the username and email must be unique to mitigate the issue of a user making more than one account.

### attributes
The user table will have a firstName, lastName, userName, and hashedPassword column which will be all strings, and they will also have a email column that will be a string in email format.

## Spots CRUD
Getting spots is the most important part of this application because it focuses on users being able to see spots. In which they could book and stay at in the future. The splash page is the biggest part of this website because it retrieves data for all the spots that can be used for the rest of pages.

### attributes
the spots table has columns fo ownerId which is a foreign key that references a userId, address, city, state, country, name, description which will be strings, and price, lat, and lng which is decimals, as well as images which is a image url that ends in png, jpg, or jpeg.

## Reviews CRUD
Reviews are the next most importent part of the application because a user wants to leave reviews and ratings for the spot that they have stayed at.

### attributes
The reviews table has columns for userId and SpotId which are foreign keys that have already been populated for the customer for ease of use, also it has stars which is an integer between 1 and 5, and a review which is a string.

# Features
Here is a short description of each of the features

## Spot Details

![spotDetail](./images/Screenshot%202024-07-19%20at%201.59.31%20AM.png)

A user clicks a spot tile on the splash page to get to the spot detail page. with seamless integration and state management with redux all items for the spot detail have already been loaded in and the page is very responsive. on this page you can see the name of the spot on the top more images then you can see who it is owned by and a description of the spot. This page also houses the reviews of the spot. which has to be fetched from the server. if you have not created a review you will be able to do so by the button for post your review. If you already have posted a review then under your review you will be able to delete the review with a button under your review which when clicked will open a modal and let you confirm delete. you will not have to refresh the page once you add or delete a review because of redux under the hood which will dynamically update your page.

## create a new spot

![spotForm](./images/Screenshot%202024-07-19%20at%202.07.16%20AM.png)

When logged in a button shows to create a new spot. when you click that link you are brought to a new component where you will fill out this form to fill out which will then do a fetch to the backend and create the spot. If successfull you will be taken to the spot detail page with that newly created spot. However, if you have any errors they will show up in the designated spot to let you know what is amiss.

## Manage Spots

![manageSpots](./images/Screenshot%202024-07-20%20at%202.59.49%20AM.png)

Lastly there is a page for managing spots. This sends a request to getting spots by current user. On this page you have a button for creating a new spot. Then I mapped through the current user spots to create a card just like the splash page except i added update and delete buttons to the cards. the delete button opens up a pop-up modal just like the login and sign-up which will then confirm if you would like to delete. if you click no then the modal will just close. however if you click yes then it will run a delete fetch request and it will delete the spot without needing to reload the page. If you click the update button it will take you to the spot form component which was the same form component which is just dynamically updated to show update instead of create and it is filled in with the spot details. You can update anything but the images. they will not change. I did not fix that functionality. 

## What to make it better
Some things that could be added on to this project would have to be actually creating a search feature and query parameters. The query parameters were actually already put in the backend so i feel like they might not would have been to difficult to implement.

Another item on the list of extra features would be to make the reviews able to be updatable which would be to add another button beside delete and open another modal for update. 

# Struggles
Some of my struggles were starting on this project I wish I would have had more learning of redux and react before starting this project it was definitely a learning curve to state it lightly. I had some pretty high stress moments trying to figure out how to use redux. Once I finally started understanding redux then everything started coming together so much better. However, I was stressed for the duration of this project. I do believe after doing this project I learned some neccessary skills and being pushed into this before i was ready may have made it where problem solving is way easier to understand for me. Yes this is definitely not perfect and I have yet to know everything about react and redux but I do have a grasp on it and if I needed to I would be able to handle this at any job that is thrown my way.

The hardest thing that I believe I had for this project was definitely the create a spot form. I spent around four days on that one form and I was ready to give up. It just did not want to work for me at all. I couldnt figure out how to get the errors to show up and some parts of this project had me pretty confused but after working for countless hours on it I finally got it to work and was able to successfully create a spot.

# How To run this on locally

## technologies used for this project

### backend
bcryp\
cookie-parser\
cors\
csurf\
dotenv\
express\
express-async-errors\
express-validator\
helmet\
jsonwebtoken\
morgan\
per-env\
pg\
sequelize\
nodemon\
sqlite3

### frontend
js-cookie\
react\
redux\
vite\
eslint

The first thing that you should do to run this locally on your computer is cd into the backend and run npm install to install all the dependencies on the backend. While in the backend you should also put a .env file just like the .env.example file that is included with your own items. If you would rather use sqlite instead of postgres on the .env file you would just need a port and the dbfile. now that you have those items you need to start up the backend database. to start it up in the backend folder you will run npm start. this puts you in development. if you would rather run in production you would run npm start --production.

next, you will cd into the frontend folder and run npm install to install the dependencies on the frontend. after you have installed those dependencies you will run npm run dev or npm run preview both will work but npm run preview is closer to actually running production.




