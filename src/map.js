import axios from 'axios';
import { orders } from './orders';
import L from 'leaflet';

import { accessToken } from './env';

let mapCenter   = [ 51.128179 , -2.808727 ];
var map         = L.map('map_container')
                   .setView( mapCenter , 9.45 );
let mapboxstyle = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={ accessToken }`;

console.log( accessToken );

L.tileLayer( mapboxstyle , {
    id:          'mapbox/navigation-guidance-night-v4',
    tileSize:    512  ,
    zoomOffset:  -1   ,
    accessToken: accessToken }
).addTo(map);

L.marker( mapCenter )
 .addTo(map)
 .bindPopup('business location')
 .openPopup();

L.circle( mapCenter , { color: 'red' , fillColor:  '#f03', fillOpacity: 0.1 , radius: 32200.0 })
 .addTo( map );


let zoomLevels = [
   { zoom: 5  , size: 10 , split: 0 } ,
   { zoom: 8  , size: 15 , split: 0 } ,
   { zoom: 10 , size: 10 , split: 1 } ,
   { zoom: 14 , size: 10 , split: 1 }
]

map.on('zoomend' , ( e ) => {
    let zoomLevel = map.getZoom();
});

class MapData {
    constructor ( orders ) {
      this.element        = document.querySelector('#map_controls');
      this.colorChoices   = [ '#ff6b6b' , '#5f27cd' , '#ff9f43' , '#10ac84' , '#222f3e' , '#40407a' , '#b33939' ,'#ff6b81' , '#5352ed' ];

      this.currentMarkers = [ ];
      this.orders         = orders;
      this.districts      = this.cleanKeys();

      // methods
      this.populateMapKeys( this.districts , this.$( '#map_keys > div > ul' ) );
      this.displayBubbleMarkers( this.districts );
      this.bindEvents();
      console.log( this.districts );
    }

    cleanMap() {
       this.currentMarkers.forEach( ( layer , i ) => {
          map.removeLayer( layer );
       });
       this.currentMarkers = [ ];
    }

    cleanKeys ( ) {
      let districts = this.orders
               .map( ( { address } ) => { return {
                         City:  address.City , Data: [ ] , dataAmount: 0 ,
                         Color: this.colorChoices[ Math.floor( Math.random( ) * this.colorChoices.length ) ] }
               } )
               .filter( ( v , i , a ) => a.findIndex( t => ( t.City === v.City ) ) === i );

      districts.forEach( ( each , index ) => {
            each.Data = this.orders.filter( i => { return each.City === i.address.City; });
            each.dataAmount = each.Data.length;
            // combine each complex amount to dataAmount.
            each.Data.forEach( ( dataPoint , i ) => {
                  each.dataAmount = each.dataAmount + dataPoint.complex.length;
            });
      });
      return districts;
    }

    displaySingleMarkers( ) {
        this.cleanMap();
        this.districts.forEach( (  district , i ) => {
              district.Data.forEach( ( item , index ) => {

                 console.log( item );
                 let { position , address , complex , queryAddress } = item;
                 let { Label , Country , State , County , City , District , Street , PostalCode } = address;
                 let stringValue = `<li> ${ item.queryAddress  } </li>`;

                 // if a datapoint contains a complex( 2 data points sharing same location );
                 if ( complex.length > 0 ) {
                      complex.forEach( ( point , i ) => {
                         stringValue = stringValue.concat(`<li> ${point.queryAddress } </li>`);
                      });
                 }

                 let circle = L.circle([ position.Latitude  ,  position.Longitude  ] , {
                     color:        district.Color ,
                     fillColor:    'white'  ,
                     fillOpacity:  0.4  ,
                     radius:       400
                 }).addTo( map )
                   .bindPopup( stringValue );
                  this.currentMarkers.push( circle );
              });
         });
    }

    displayBubbleMarkers( districts ) {
        this.cleanMap();
        districts.forEach( ( item , i ) => {
            let { City , Data , Color , dataAmount } = item;

            let fm = Data[0].position;

            let rounded = new L.Marker( [ fm.Latitude , fm.Longitude ] , {
                 icon: new L.DivIcon( {
                     className: 'my-div-icon',
                     html: `<div class="circle_outer" style="background:${ Color }">
                              <div class="circle_text"> ${ dataAmount } </div>
                            </div>`
                 } )
             }).addTo( map );
            this.currentMarkers.push( rounded );
        });
    }

    populateMapKeys( array , element ) {
        array.forEach( ( item , i ) => {
            let { City , Data , Color } = item;
            let fm = Data[0].position;

            let child = document.createElement('li');
                child.innerHTML = `${ item.City } <span style=background:${ Color }> ${ item.dataAmount } </span>`;
                child.addEventListener( 'click' , ( ) => {
                      map.flyTo( [ fm.Latitude , fm.Longitude ] , 12 );
                });
              element.appendChild( child );
        });
    }

    bindEvents() {
        this.$('#map_center').addEventListener('click', () => {
            map.flyTo( mapCenter , 9 );
        });
        this.$('#map_bubble').addEventListener('click' , () => {
            this.displayBubbleMarkers( this.districts );
        });
        this.$('#map_single').addEventListener('click' , () => {
            this.displaySingleMarkers();
        });
    }

    $( query ) {
       return this.element.querySelector( query );
    }
}

class HTMLBuild {
    constructor ( ) {
      this.body = document.querySelector('body');
    }

    $( query ) {
       return this.body.querySelector( query );
    }
}

( ( ) => {
    let htmlContent  = new HTMLBuild();
    let keyContainer = new MapData( orders );

} )( );



//
