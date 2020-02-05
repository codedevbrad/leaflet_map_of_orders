
## setup
 * create a env.js file in /src/ and populate with: </br>
 export const accessToken = 'key for mapbox access token'; <br/>
 export const geoJsonKey  = 'key for 'https://geocoder.ls.hereapi.com/'

## to run:
  npm run start:dev for local server <br/>
  npm run webpack to build files to es5.

## images:
<img width="880" alt="save2" src="https://user-images.githubusercontent.com/46296577/73779682-00ed5e00-4785-11ea-8242-cbd5d098d5b9.PNG">
<img width="960" alt="save1" src="https://user-images.githubusercontent.com/46296577/73779683-0185f480-4785-11ea-9621-3fbbee152d31.PNG">


### to do:
- add the orders array structure to .readme and explain the reasoning + how to populate the orders array.

- add a element for taking in random plot points within an area. 
     - pick a chosen city and business location.
     - create a circle radius around the location with size inputted as your customer distance.
     - use the postcoder api to addresses within the chosen radius.
           - https://developer.here.com/documentation/geocoder/dev_guide/topics/example-reverse-geocoding.html
          
    
 - add a polygon for a shape of the city where orders were placed in.
           - https://developer.here.com/documentation/geocoder/dev_guide/topics/example-reverse-geocoding-shape.html
     
- build the districts only once and return the correct array for districts to use as a static array.
    - so it doesnt need to built on every refresh.

- make sure a district cannot choose a same color

- make sure i get a city, street and town for api.

- upon running webpack server, first build the webpack

     - using concurrently and npm run wepback but not watch.

- webpack server doesnt rebuild files on server start.

- webpack server does build files, but i dont see the updated changes in the file upon building.

- concatinate webpack output files into single file.
