
## view the project live:

https://codedevbrad.github.io/leaflet_map_of_orders/dist/


## issue with running the project years after development.
 *  npm packages seen to now be deprecated and I can't do npm install.

## setup
 * create a env.js file in /src/ and populate with: </br>
 export const accessToken = 'key for mapbox access token'; <br/>
 export const geoJsonKey  = 'key for 'https://geocoder.ls.hereapi.com/'

## to run:
  * open index.html in /dist

## images:
<img width="880" alt="save2" src="https://user-images.githubusercontent.com/46296577/73779682-00ed5e00-4785-11ea-8242-cbd5d098d5b9.PNG">
<img width="960" alt="save1" src="https://user-images.githubusercontent.com/46296577/73779683-0185f480-4785-11ea-9621-3fbbee152d31.PNG">


## how I have generated map data.

```javascript
let fakeAddresses = [
 	"19, Anthony Road, Street, Somerset, BA16 0AE" ,
     "9, Anthony Road, Street, Somerset, BA16 0AE",
     "6, Bowling Green, Street, Somerset, BA16 0AH",
     "8, Bowling Green, Street, Somerset, BA16 0AH",
     "91, Somerton Road, Street, Somerset, BA16 0DN",
     "1, Water Street, Langport, Somerset, TA10 0AH",
     "14, Ham Green, Langport, Somerset, TA10 0AR",
     "10, Ham Green, Langport, Somerset, TA10 0AR",
     "Orchard End, Butchers Hill, Taunton, Somerset, TA3 6PD",
     "58, Leycroft Rd, Taunton, TA1 2ED",		
     "7, Colin Ave, Taunton, TA2 7AT",
     "8, Rochester Road Taunton TA2 7LB",
     "66, Warwick Rd, Taunton TA2 7RH",
     "38, Stoney Furlong, Taunton, TA2 8RY",
     "40, Stoney Furlong, Taunton, TA2 8RY ",
     "2, Four Forks Lane, Bridgwater, Somerset, TA5 1AB",
     "133, Four Forks Lane, Bridgwater, Somerset, TA5 1AB",
     "Higher Aisholt Farm, Bridgwater, Somerset, TA5 1AP",
     "Triangle House, Frog Lane, Yeovil, Somerset, BA22 7AJ",
     "115 Great Mead, Yeovil, BA21 5GB",
     "12 Sandlewood Cl, Yeovil,  BA21 5DY" ]
];
```

addresses can sometimes belong to the same flat/apartment complex leading to the same lat/long. This would mean markers placed on a map get ovverighted by one another. The solution was to loop through the array of converted addresses and with each address, look for those that were in the same apartment and append them to the object as a sub array called complex. 

This looks like:

```javascript
{
      address: {
        AdditionalData: [{
            key: "CountryName",
            value: "United Kingdom"
        }, {
            key: "StateName",
            value: "England"
        }, {
            key: "CountyName",
            value: "Somerset"
        }],
        City: "Street",
        Country: "GBR",
        County: "Somerset",
        District: "Street",
        HouseNumber: "5",
        Label: "5 Bowling Green, Street, BA16 0AH, United Kingdom",
        PostalCode: "BA16 0AH",
        State: "England",
        Street: "Bowling Green"
    },
    complex: [
        {
          address: {
               AdditionalData: [
                    {
                         key: "CountryName",
                         value: "United Kingdom"
                    }, 
                    {
                         key: "StateName",
                         value: "England"
                    }, 
                    {
                         key: "CountyName",
                         value: "Somerset"
                    }
               ],
               City: "Street",
               Country: "GBR",
               County: "Somerset",
               District: "Street",
               HouseNumber: "5",
               Label: "5 Bowling Green, Street, BA16 0AH, United Kingdom",
               PostalCode: "BA16 0AH",
               State: "England",
               Street: "Bowling Green"
          },
          position: {
               Latitude: 51.1313564,
               Longitude: -2.7313066
          },
          queryAddress: "8, Bowling Green, Street, Somerset, BA16 0AH"
        }
    ],
    position: {
        Latitude: 51.1313564,
        Longitude: -2.7313066
    },
    queryAddress: "6, Bowling Green, Street, Somerset, BA16 0AH"
}
```


### to do:

- reset map when browser window changes.

- clicking generate button finds x random places to populate map with.
     - close navigation
     - populate map and map data.
- closing nav menu
     - gets rid of chosen location.
     - resets map to last chosen map and map data.
     - if new map and map data is chosen, it should be stored in the object instance. so if we we do a map and data reset,
       it will still build the newly chosen data.

- option to reset map to default

-


- try to add boundry polygons for the uk using the api.
     - https://developer.here.com/documentation/geocoder/dev_guide/topics/example-geocode-retrieve-shape-area.html

- work on determining radius from new random to center home.

- slider to only show items within a radius
      - go through districts and display objects with distance < radius select.

- 3000 is in meters.
- api for getting random places
    // 51.128179 , -2.808727
    // 51.12881  , -2.80968

    let api = '';
              fetch( `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${ api }&mode=retrieveAddresses&prox=51.128179 , -2.808727 , 3000` )
            			.then(  res => res.json())
                  .then( data => console.log( data.Response.View[0].Result ))
                  .catch( err => console.log( err ));

- webpack need to do:
   - move this project to my es6 template
   - change to a basic 2 class template with buttons.
   - make sure webpack dev server updates for my scss.
   - devserver doesnt build properly.

- try some unit tests with a dom testing.
   - try building a map marker
   - test distance coordinates
   - test each class works and produces the correct html container.
   -

- add data feature.

    - opening sidebar and choosing a new location allows you to click map to get new coordinates.
          - means we don't need api for city to coordinates api.
          - our geocode api needs to get locations around coordinates.
          -

    - now we need to generate locations around this coordinates.

    - choose a location as center + amount of data using slider.
       - leafletjs click map returns the coordinates.
    - buildMapDataJs is called.
        - get a random set of addresses using an api ( needs to be free ).
        - get the location coordinates of each address and return a structured array.
        - lastly, combine all apartments in array as a last clean array.
        - use the fs module and output the array to the orders file in /src.

    - rebuild map with new data
       - change mapCenter
       - change radius
       - build points.

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
