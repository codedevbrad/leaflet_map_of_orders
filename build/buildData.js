/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/buildMapData.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/buildMapData.js":
/*!*****************************!*\
  !*** ./src/buildMapData.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let latLongs = [];\r\nlet fakeAddresses = [\r\n \t\"19, Anthony Road, Street, Somerset, BA16 0AE\" ,\r\n  \"9, Anthony Road, Street, Somerset, BA16 0AE\",\r\n  \"6, Bowling Green, Street, Somerset, BA16 0AH\",\r\n  \"8, Bowling Green, Street, Somerset, BA16 0AH\",\r\n  \"91, Somerton Road, Street, Somerset, BA16 0DN\",\r\n  \"1, Water Street, Langport, Somerset, TA10 0AH\",\r\n  \"14, Ham Green, Langport, Somerset, TA10 0AR\",\r\n  \"10, Ham Green, Langport, Somerset, TA10 0AR\",\r\n  \"Orchard End, Butchers Hill, Taunton, Somerset, TA3 6PD\",\r\n  \"58, Leycroft Rd, Taunton, TA1 2ED\",\r\n  \"7, Colin Ave, Taunton, TA2 7AT\",\r\n  \"8, Rochester Road Taunton TA2 7LB\",\r\n  \"66, Warwick Rd, Taunton TA2 7RH\",\r\n  \"38, Stoney Furlong, Taunton, TA2 8RY\",\r\n  \"40, Stoney Furlong, Taunton, TA2 8RY \",\r\n  \"2, Four Forks Lane, Bridgwater, Somerset, TA5 1AB\",\r\n  \"133, Four Forks Lane, Bridgwater, Somerset, TA5 1AB\",\r\n  \"Higher Aisholt Farm, Bridgwater, Somerset, TA5 1AP\",\r\n  \"Triangle House, Frog Lane, Yeovil, Somerset, BA22 7AJ\",\r\n  \"Stoneleigh, Middle Street, Yeovil, Somerset, BA22 7AP\",\r\n  \"Stable Lodge, Middle Street, Yeovil, Somerset, BA22 7AP\",\r\n  \"115 Great Mead, Yeovil, BA21 5GB\",\r\n  \"12 Sandlewood Cl, Yeovil,  BA21 5DY\" ];\r\n\r\nlet key = 'EifkqKnwhWMgdPa30JaxtVi-T1HMfEzFVz2Ivi2ixgI';\r\n\r\n\r\nlet getAdress = async ( addressQuery ) => {\r\n\t\t\tlet fetched = await fetch(`https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=${ key }&searchtext= ${ addressQuery }` )\r\n                      .then( data => data.json() )\r\n                      .then(  loc => loc )\r\n                      .catch( err => console.log( err ));\r\n\r\n       let filtered = fetched.Response.View[0].Result[0].Location;\r\n       let address  = filtered.Address;\r\n       let position = filtered.NavigationPosition[0];\r\n       return { address , position , queryAddress: addressQuery };\r\n};\r\n\r\nlet buildData = async ( ) => {\r\n  for( let i = 0; i < fakeAddresses.length; i++ ) {\r\n         let query   = fakeAddresses[i];\r\n         let mapData = await getAdress( query );\r\n         latLongs.push( mapData );\r\n  }\r\n  console.log( JSON.stringify( latLongs ) );\r\n}\r\nconsole.log( 'loaded');\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYnVpbGRNYXBEYXRhLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2J1aWxkTWFwRGF0YS5qcz8yZjM2Il0sInNvdXJjZXNDb250ZW50IjpbImxldCBsYXRMb25ncyA9IFtdO1xyXG5sZXQgZmFrZUFkZHJlc3NlcyA9wqBbXHJcbiBcdFwiMTksIEFudGhvbnkgUm9hZCwgU3RyZWV0LCBTb21lcnNldCwgQkExNiAwQUVcIiAsXHJcbiAgXCI5LCBBbnRob255IFJvYWQsIFN0cmVldCwgU29tZXJzZXQsIEJBMTYgMEFFXCIsXHJcbiAgXCI2LCBCb3dsaW5nIEdyZWVuLCBTdHJlZXQsIFNvbWVyc2V0LCBCQTE2IDBBSFwiLFxyXG4gIFwiOCwgQm93bGluZyBHcmVlbiwgU3RyZWV0LCBTb21lcnNldCwgQkExNiAwQUhcIixcclxuICBcIjkxLCBTb21lcnRvbiBSb2FkLCBTdHJlZXQsIFNvbWVyc2V0LCBCQTE2IDBETlwiLFxyXG4gIFwiMSwgV2F0ZXIgU3RyZWV0LCBMYW5ncG9ydCwgU29tZXJzZXQsIFRBMTAgMEFIXCIsXHJcbiAgXCIxNCwgSGFtIEdyZWVuLCBMYW5ncG9ydCwgU29tZXJzZXQsIFRBMTAgMEFSXCIsXHJcbiAgXCIxMCwgSGFtIEdyZWVuLCBMYW5ncG9ydCwgU29tZXJzZXQsIFRBMTAgMEFSXCIsXHJcbiAgXCJPcmNoYXJkIEVuZCwgQnV0Y2hlcnMgSGlsbCwgVGF1bnRvbiwgU29tZXJzZXQsIFRBMyA2UERcIixcclxuICBcIjU4LCBMZXljcm9mdCBSZCwgVGF1bnRvbiwgVEExIDJFRFwiLFxyXG4gIFwiNywgQ29saW4gQXZlLCBUYXVudG9uLCBUQTIgN0FUXCIsXHJcbiAgXCI4LCBSb2NoZXN0ZXIgUm9hZCBUYXVudG9uIFRBMiA3TEJcIixcclxuICBcIjY2LCBXYXJ3aWNrIFJkLCBUYXVudG9uIFRBMiA3UkhcIixcclxuICBcIjM4LCBTdG9uZXkgRnVybG9uZywgVGF1bnRvbiwgVEEyIDhSWVwiLFxyXG4gIFwiNDAsIFN0b25leSBGdXJsb25nLCBUYXVudG9uLCBUQTIgOFJZIFwiLFxyXG4gIFwiMiwgRm91ciBGb3JrcyBMYW5lLCBCcmlkZ3dhdGVyLCBTb21lcnNldCwgVEE1IDFBQlwiLFxyXG4gIFwiMTMzLCBGb3VyIEZvcmtzIExhbmUsIEJyaWRnd2F0ZXIsIFNvbWVyc2V0LCBUQTUgMUFCXCIsXHJcbiAgXCJIaWdoZXIgQWlzaG9sdCBGYXJtLCBCcmlkZ3dhdGVyLCBTb21lcnNldCwgVEE1IDFBUFwiLFxyXG4gIFwiVHJpYW5nbGUgSG91c2UsIEZyb2cgTGFuZSwgWWVvdmlsLCBTb21lcnNldCwgQkEyMiA3QUpcIixcclxuICBcIlN0b25lbGVpZ2gsIE1pZGRsZSBTdHJlZXQsIFllb3ZpbCwgU29tZXJzZXQsIEJBMjIgN0FQXCIsXHJcbiAgXCJTdGFibGUgTG9kZ2UsIE1pZGRsZSBTdHJlZXQsIFllb3ZpbCwgU29tZXJzZXQsIEJBMjIgN0FQXCIsXHJcbiAgXCIxMTUgR3JlYXQgTWVhZCwgWWVvdmlsLCBCQTIxIDVHQlwiLFxyXG4gIFwiMTIgU2FuZGxld29vZCBDbCwgWWVvdmlsLCAgQkEyMSA1RFlcIiBdO1xyXG5cclxubGV0IGtleSA9ICdFaWZrcUtud2hXTWdkUGEzMEpheHRWaS1UMUhNZkV6RlZ6Mkl2aTJpeGdJJztcclxuXHJcblxyXG5sZXQgZ2V0QWRyZXNzID0gYXN5bmMgKCBhZGRyZXNzUXVlcnkgKSA9PiB7XHJcblx0XHRcdGxldCBmZXRjaGVkID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vZ2VvY29kZXIubHMuaGVyZWFwaS5jb20vNi4yL2dlb2NvZGUuanNvbj9hcGlLZXk9JHsga2V5IH0mc2VhcmNodGV4dD0gJHsgYWRkcmVzc1F1ZXJ5IH1gIClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCBkYXRhID0+IGRhdGEuanNvbigpIClcclxuICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCAgbG9jID0+IGxvYyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goIGVyciA9PiBjb25zb2xlLmxvZyggZXJyICkpO1xyXG5cclxuICAgICAgIGxldCBmaWx0ZXJlZCA9IGZldGNoZWQuUmVzcG9uc2UuVmlld1swXS5SZXN1bHRbMF0uTG9jYXRpb247XHJcbiAgICAgICBsZXQgYWRkcmVzcyAgPSBmaWx0ZXJlZC5BZGRyZXNzO1xyXG4gICAgICAgbGV0IHBvc2l0aW9uID0gZmlsdGVyZWQuTmF2aWdhdGlvblBvc2l0aW9uWzBdO1xyXG4gICAgICAgcmV0dXJuIHsgYWRkcmVzcyAsIHBvc2l0aW9uICwgcXVlcnlBZGRyZXNzOiBhZGRyZXNzUXVlcnkgfTtcclxufTtcclxuXHJcbmxldCBidWlsZERhdGEgPSBhc3luYyAoICkgPT4ge1xyXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgZmFrZUFkZHJlc3Nlcy5sZW5ndGg7IGkrKyApIHtcclxuICAgICAgICAgbGV0IHF1ZXJ5ICAgPSBmYWtlQWRkcmVzc2VzW2ldO1xyXG4gICAgICAgICBsZXQgbWFwRGF0YSA9IGF3YWl0IGdldEFkcmVzcyggcXVlcnkgKTtcclxuICAgICAgICAgbGF0TG9uZ3MucHVzaCggbWFwRGF0YSApO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZyggSlNPTi5zdHJpbmdpZnkoIGxhdExvbmdzICkgKTtcclxufVxyXG5jb25zb2xlLmxvZyggJ2xvYWRlZCcpO1xyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/buildMapData.js\n");

/***/ })

/******/ });