import './css/normalise.scss';
import './css/styles.scss';

import axios from 'axios';
import L from 'leaflet';
import { accessToken , geoJsonKey } from './env';

import { buildMapData } from './buildMapData.js';
import { orders } from './orders';


class SidebarBuild {
    constructor( mapObj , mapData , html ) {
      this.element  = document.querySelector('#navigation_el');
      this.mapKeys  = document.querySelector('#map_controls');
      this.chooseLocationBtn = this.$('#loc_pick_btn');
      this.mapObj   = mapObj;
      this.mapData  = mapData;
      this.map      = mapObj.map;
      this.htmlObj  = html;
      this.chosenMarker = null;
      this.location     = null;
      this.bindEvents();
    }

    resetAllmap() {
        this.mapObj.resetMap();
        this.mapData.cleanMapData();
    }

    resetChosenMarkers ( ) {
       this.map.removeLayer( this.chosenMarker );
       this.chosenMarker = null;
       this.location = null;
    }

    setClickableLocation( map , shouldClick ) {
        if ( shouldClick ) {
            map.on('click', ( e ) => {
                if ( this.chosenMarker ) this.resetChosenMarkers( );
                this.createCenterMarker( [ e.latlng.lat , e.latlng.lng ] , 'your chosen location' );
            });
        } else {
            map.off( 'click' );
        }
    }

    createCenterMarker( center , centerText ) {
        let marker = L.marker( center )
                      .addTo(  this.map )
                      .bindPopup( centerText )
                      .openPopup();
        this.chosenMarker = marker;
        this.location = center;
    }


    chooseLocation() {
        // reset map
        this.resetAllmap();
        this.setClickableLocation( this.map , true );

        this.mapKeys.style.visibility = 'hidden';
        this.chooseLocationBtn.innerHTML = 'select somewhere...';
    }

    buildNewMap ( elementText ) {
        ( async () => {
              elementText.innerHTML = 'generating new map';
              let data = await buildMapData( this.location[0] , this.location[1] );

              setTimeout( ( ) => {
                  elementText.innerHTML = 'new map has been created';
                  this.mapData.setNewMapData( data );
                  this.mapObj.changeMap( this.location , 9 , 29000 , 'new location' );
                  this.resetChosenMarkers();
              } , 1000 );
        })( );
    }

    bindEvents() {
        this.$('#loc_pick_btn').addEventListener('click' , ( e ) => {
            this.chooseLocation();
        });
        this.$('#submit_map_data').addEventListener('click' , async ( e ) => {
            if ( this.location === null ) return;
            this.buildNewMap( e.target );
        });
        this.$('#close_navMenu').addEventListener('click' , ( ) => {
            // use the html Object animation method.
            this.mapKeys.style.visibility = 'visible';
            this.chooseLocationBtn.innerHTML = 'choose a base location';
            this.htmlObj.close_navMenu();
            this.setClickableLocation( this.map , false );
            this.mapObj.flyToLocation();
        });
    }

    $( query ) {
       return this.element.querySelector( query );
    }
}

class MapBuild {
    constructor( element , center , zoom , radius , centerText ) {
        this.center  = center;
        this.zoom    = zoom;
        this.radius  = radius;
        this.currentMarkers  = [ ];

        this.map = L.map( element ).setView( this.center , this.zoom );
        this.mapStyle = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={ accessToken }`;

        this.setEverything( centerText );
    }

    publicMethods()  {
        return {
            getMap:  () => this.map ,
            getZoom: () => this.zoom
       }
    }

    refreshMapTiles () {
        this.map.invalidateSize();
    }

    flyToLocation() {
        this.map.flyTo( this.center , this.zoom );
    }

    changeMap( center , zoom , radius , centerText ) {
        this.center = center;
        this.zoom   = zoom;
        this.radius = radius;
        this.setEverything( centerText );
    }

    setEverything ( centerText ) {
        this.resetMap();
        this.setMap();
        this.setCenterMarker( this.center , centerText );
        this.setCenterRadius();
    }

    resetMap() {
        this.currentMarkers.forEach( ( layer , i ) => {
           this.map.removeLayer( layer );
        });
        this.currentMarkers = [ ];
    }

    setMap() {
        L.tileLayer( this.mapStyle , {
            id: 'mapbox/navigation-guidance-night-v4',
            tileSize: 512  , zoomOffset: -1 , accessToken: accessToken
        }).addTo( this.map );
    }
    setCenterMarker( center , centerText ) {
        let marker = L.marker( center )
                      .addTo(  this.map )
                      .bindPopup( centerText )
                      .openPopup();
        this.currentMarkers.push( marker );
    }
    setCenterRadius() {
        let centerRadius = L.circle( this.center , { color: 'red' , fillColor:  '#f03', fillOpacity: 0.1 , radius: this.radius })
                            .addTo(  this.map );
        this.currentMarkers.push( centerRadius );
    }

    mapEvents( map , DataObj ) {
        map.on('zoomend' , ( e ) => {
            let zoomLevel = this.map.getZoom();
            console.log( zoomLevel );
        });
    }
}

class MapData {
    constructor ( orders , MapObj ) {
      this.mapObj         = MapObj;
      this.map            = MapObj.map;
      this.element        = document.querySelector('#map_controls');
      this.colorChoices   = [ '#ff6b6b' , '#5f27cd' , '#ff9f43' , '#10ac84' , '#222f3e' , '#40407a' ,
                              '#b33939' ,'#ff6b81' , '#5352ed' ];
      this.currentMarkers = [ ];

      // set markers.
      this.setNewMapData( orders );
    }

    setNewMapData( newData ) {
       this.cleanMapData();
       this.orders = newData;
       this.districts = this.cleanKeys();
       this.displayBubbleMarkers( this.districts );
       this.populateMapKeys( this.districts , this.$( '#map_keys > div > ul' ) );
       this.bindEvents();
    }

    cleanMapData() {
       this.currentMarkers.forEach( ( layer , i ) => {
          this.map.removeLayer( layer );
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
        this.cleanMapData();
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
                 }).addTo( this.map )
                   .bindPopup( stringValue );
                  this.currentMarkers.push( circle );
              });
         });
    }

    displayBubbleMarkers( districts ) {
        this.cleanMapData();
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
             }).addTo( this.map );
            this.currentMarkers.push( rounded );
        });
    }

    populateMapKeys( array , element ) {
        // remove any elements in element first ...
        element.innerHTML = '';
        // populate with new content.
        array.forEach( ( item , i ) => {
            let { City , Data , Color } = item;
            let fm = Data[0].position;

            let child = document.createElement('li');
                child.innerHTML = `${ item.City } <span style=background:${ Color }> ${ item.dataAmount } </span>`;
                child.addEventListener( 'click' , ( ) => {
                      this.map.flyTo( [ fm.Latitude , fm.Longitude ] , 12 );
                });
              element.appendChild( child );
        });
    }

    bindEvents() {
        this.$('#map_center').addEventListener('click', () => {
            this.map.flyTo( this.mapObj.center , this.mapObj.zoom );
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
    constructor ( width ) {
      this.body    = document.querySelector('body');

      this.outer   = this.$('#outer');
      this.inner   = this.$('#inner_move');
      this.navSize = 270;
      this.leftMap = this.$('#map_container_flow');
      this.toggle  = false;
      this.obj     = {
           defaultData: orders ,
           center: [ 51.128179 , -2.808727 ] , zoom: 9.45 , radius: 32200.0 ,
           centerText: 'business location'
      }

      this.map_key_element  = this.$('#map_controls');

      this.loading_component = this.$('#loading_component');
      this.loading_animate   = this.$('#map_circle > #load > div');
      // events..
      this.events();
    }

    loadingAnimation ( ) {
        let { center , zoom , radius , centerText } = this.obj;

        setTimeout( ( ) => {
            var countInterval = 10;
            var countPercent = 100 / countInterval;

            for ( let i = 0; i <= countPercent; i++ ) {
                this.loading_animate.style.width = `${ i }0px `;
            }

            setTimeout( ( ) => {
                this.loading_component.style.display = 'none';
                this.outer.style.display = 'block';
                this.setMainWidth(  );

                var mapContent   = new MapBuild( 'map_container' , center , zoom , radius , centerText );
                var mapDatas     = new MapData(  orders , mapContent );
                var sideSelect   = new SidebarBuild( mapContent , mapDatas , this );
                mapContent.mapEvents( mapContent.map );
            } , 2000 );
        }, 1500 );
    }

    setMainWidth ( ) {
        // set main width to windowWidth + sideBar width.
       this.inner.style.width   = outer.getBoundingClientRect().width + this.navSize + 'px';
       this.leftMap.style.width = outer.getBoundingClientRect().width + 'px';
    }

    animateSideNav ( value ) {
        this.inner.style.transform = "translateX(" + value + "px)";
    }

    close_navMenu() {
      this.animateSideNav( 0 );
      this.toggle = false;
    }

    events ( ) {
        let doit;
        window.onresize = ( ) => {
              clearTimeout(doit);
              doit = setTimeout( () => {
                    this.setMainWidth();
              } , 100 );
        }
        this.$('#data_add').addEventListener('click' , ( ) => {
            this.inner.style.transition = 'all 300ms';

            if ( this.toggle ) {
                this.animateSideNav( 0 );
            } else {
                this.animateSideNav( -this.navSize );
            }
            this.toggle = !this.toggle;
        });
    }
    $( query ) {
       return this.body.querySelector( query );
    }
}


( ( ) => {

    // if center or radius changes. we need our mapContent and keyContainer to change.
    var htmlBuild    = new HTMLBuild();
    htmlBuild.loadingAnimation( );

})( );
