import { geoJsonKey } from './env';
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
    "12 Sandlewood Cl, Yeovil,  BA21 5DY"
];

/* default build map data */

let buildDefaultData = async ( addresses ) => {
      let latLongs = [ ];

      var getAddress = async ( addressQuery ) => {
      			let fetched = await fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${ geoJsonKey }&searchtext= ${ addressQuery }`)
                            .then( data => data.json() )
                            .then(  loc => loc )
                            .catch( err => console.log( err ));

             let filtered = fetched.Response.View[0].Result[0].Location;
             let address  = filtered.Address;
             let position = filtered.NavigationPosition[0];
             return { address , position ,  complex: [] , queryAddress: addressQuery };
      };

      for( let i = 0; i < addresses.length; i++ ) {
             let query   = addresses[i];
             let mapData = await getAddress( query );
             latLongs.push( mapData );
      }
      return latLongs;
}

/* custom user ,map build */

var generateFakeAddresses = async ( lat , lng ) => {
    let addresses = await fetch( `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${ geoJsonKey }&mode=retrieveAddresses&prox=`+lat +',' + lng + 7000 )
                      .then(  res => res.json())
                      .then( data => data.Response.View[0].Result );

     let clean = addresses.map( ( { Location }) => {
     			let { DisplayPosition , Address } = Location;
          return { address: Address , position: DisplayPosition , complex: [] , queryAddress: Address.Label  };
     });
     return clean;
}

var combineApartments = ( arr ) => {
  return arr.reduce( (acc, current) => {
      const x = acc.find(item =>
      		item.position.Latitude  === current.position.Latitude &&
      		item.position.Longitude === current.position.Longitude
      );

      if (!x) { return acc.concat([current]); }
      else {
          x.complex.push( current );
          return acc;
      }
    }, []);
}

var loopData = ( arr ) => {
    arr.forEach( ( each ) => {
    		let { Latitude , Longitude } = each.position;
        console.log( Latitude , Longitude );
    });
}

export let buildMapData = async ( lat , lng ) => {
    // let cleanData  = await buildDefaultData( fakeAddresses );
    let addresses = await generateFakeAddresses( lat , lng );
    let combined  = combineApartments( addresses );
    return combined;
}

/* */
