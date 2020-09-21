# Advertiser API

This is Advertiser API codebase written using Nodejs and MongoDB, The API have below listed functionalities,
1. Login and Registration for Advertiser
2. Displaying the Ad slots
3. Making a new Bid on selected Ad Slot, concerning user. 
4. Fetching the last active Bid for selected Ad slot, concerning user.
Will render the HTML ad, based on Ad Slot.
5.  On click of Ad it will redirect to the URL given while making bid, by recording the conversioin into the Database.
6. Exposes a [JavaScript file](https://github.com/ShankyTiwari/advertiser-app/blob/master/public/js/ads.js), which is responsible for displaying the ads requested places. This is Javascript file used by Publisher in order toioi diaplay the ad.

## Demo Link: 
[https://sleepy-woodland-75001.herokuapp.com/](https://sleepy-woodland-75001.herokuapp.com/) (This is Just an API, the UI is hosted [here](https://ads-publisher-ads.web.app/))

## Language, Framework and Databses
1. NodeJs and Express
2. MongoDB
3. Pug for rendering the templates

## Environments
1. The Nodejs application is hosted on Heroku Free tier.
2. MLab Service is used as Mongo Database.

## Limitations
1. In Free tier of Heroku the Nodejs Server is idle utill requested, so sometime it's time to wake up.
2. In mLab the write speed is fast but read speed is little slow.

## Run development Server
1. First make sure you have installed mongoDB in your system.
2. Create new a database in MongoDB, and add a MongoDB Database connection URL in `.env` as **`MONGODB_CONNECTION_URL`** file.
3. Now, create three collections which are listed below
- **`ads`**: This collection will have records for ads slots, Dummy records are [here](https://github.com/ShankyTiwari/advertiser-app/blob/master/dummy-records/ads.json). ***Its absolultly important to import in mongoDB database else application won't work***.
- **`users`**: This collection will have records for users.Dummy records are [here](https://github.com/ShankyTiwari/advertiser-app/blob/master/dummy-records/bidding.json), just import in mongoDB database.
- **`bidding`**: The bidding records will be stired in this collection. Dummy records are [here](https://github.com/ShankyTiwari/advertiser-app/blob/master/dummy-records/users.json), just import in mongoDB database.
4. In NodeJs
- First run `npm i`
- Then run `npm start` or `node index.js`
- Your server should be running on http://localhost:5000

