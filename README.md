## Open Air Kino 

![Open Air Kino Project](https://i.postimg.cc/9M6NQJW1/open-air-kino1.png)

This React-App helps to find information about the outdoor cinemas in Germany.
You can view cinema details, filter cinemas depending on the region, add/remove cinemas to/from favorites.

For this project I used:

* Create-react-app
* MongoDB and NodeJS for a database and an API. The backend code is located [here](https://github.com/moinkatja/open-air-node) and is deployed with [Heroku](https://open-air-cinema.herokuapp.com/api/cinemas).
* Fetch API to get cinemas data
* Session storage for saving the favorites
* Dynamical dropdown with regions (depending on the data in the database)
* React Router to correctly show cinemas and favorites depending on the route in the browser address field
* If the backend is not avaliable, sample data will be shown. 
* CSS Grid and Flexbox for styling
* Jest for tests //in process
  
------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).