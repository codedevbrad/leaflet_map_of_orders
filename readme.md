
## setup
 * create a env.js file in /src/ and populate with
 export const accessToken = 'key for mapbox access token';
 export const geoJsonKey  = 'key for 'https://geocoder.ls.hereapi.com/'

## to run:
  npm run start:dev for local server
  npm run webpack to build files to es5.

## images:


## to do:
- build the districts only once and return the correct array for districts to use as a static array.
    - so it doesnt need to built on every refresh.

- make sure a district cannot choose a same color

- make sure i get a city, street and town for api.

- upon running webpack server, first build the webpack

     - using concurrently and npm run wepback but not watch.

- webpack server doesnt rebuild files on server start.

- webpack server does build files, but i dont see the updated changes in the file upon building.

- concatinate webpack output files into single file.
