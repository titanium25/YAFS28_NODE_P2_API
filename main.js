const express = require('express');
const serverController = require('./controller/serverController');
const app = express();

const movieBL = require('./model/movieBL');
const memberBL = require('./model/memberBL');
const restDAL = require('./DAL/restDAL');

// DB initialization
(async () => {

    // Check if Movies DB is empty
    if (await movieBL.contMovies() === 0) {
        let movies = await restDAL.getMovies();            // Get All Movies from API
        let moviesArr = movies.data.map(({id, name, genres, image, premiered}) =>
            ({id, name, genres, image, premiered}));       // Filter relevant data from Movies API
        await moviesArr.map(obj => movieBL.addMovie(obj))  // Add Movies to DB
    }
    // Check if Members DB is empty
    if(await memberBL.contMembers() === 0){
        let members = await restDAL.getMembers();             // Get All Members from API
        let membersArr = members.data.map(({id, name, email, address}) =>
            ({id, name, email, address}));                    // Filter relevant data from Members API
        await membersArr.map(obj => memberBL.addMember(obj))  // Add Members to DB
    }

})();


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/data', serverController);

require('./config/database');

app.listen(8000);