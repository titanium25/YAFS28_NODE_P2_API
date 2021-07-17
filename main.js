const express = require('express');
const membersController = require('./controller/membersController');
const moviesController = require('./controller/moviesController');
const app = express();
const cors = require('cors')

// Enable CORS
app.use(cors())

const movieBL = require('./model/movieBL');
const memberBL = require('./model/memberBL');
const restDAL = require('./DAL/restDAL');


// DB initialization
(async () => {
    // Check if Movies DB is empty
    if (await movieBL.countMovies() === 0) {
        console.log('Start movie collection initialization...');
        let movies = await restDAL.getMovies();               // Get All Movies from API
        let moviesArr = movies.data.map(({name, genres, image, premiered}) =>
            ({name, genres, image, premiered}));              // Filter relevant data from Movies API
        await moviesArr.map(obj => movieBL.addMovie(obj))     // Add Movies to DB
        console.log('Movie collection initialization done...');
    }
    // Check if Members DB is empty
    if(await memberBL.countMembers() === 0){
        let members = await restDAL.getMembers();             // Get All Members from API
        let membersArr = members.data.map(({name, email, address}) =>
            ({name, email, address}));                        // Filter relevant data from Members API
        await membersArr.map(obj => memberBL.addMember(obj))  // Add Members to DB
        console.log('Members Collection Initialized...');
    }
})();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*
RESTful Resource Naming Conventions
https://nordicapis.com/10-best-practices-for-naming-api-endpoints/
 */
app.use('/api/members', membersController);
app.use('/api/movies', moviesController);



require('./config/database');

app.listen(2020);