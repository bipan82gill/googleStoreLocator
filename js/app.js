var map;
var markers =[];
var infoWindow;
        function initMap() {
            var losAngeles = {
                lat : 34.063380,
                lng: -118.358080
            }
          map = new google.maps.Map(document.getElementById('map'), {
            center: losAngeles,
            zoom: 8
          });
          infoWindow = new google.maps.InfoWindow();
          displayStores()
          showStoresMarkers()
          setOnClickListener()
        }

        function setOnClickListener(){
            console.log(markers);
            var storeElements = document.querySelectorAll('.store-container');
            storeElements.forEach(function(elem, index){
                elem.addEventListener('click', function(){
                    google.maps.event.trigger(markers[index], 'click');
                   console.log(elem)
                })
            });
        }

          function displayStores() {
              var storesHtml = "";
                stores.forEach(function(store, index){
                    var address = store.addressLines;
                    var phone =store.phoneNumber;
                    storesHtml +=`
                    <div class ="store-container">
                        <div class ="store-info-container">
                            <div class ="store-address">
                                 <span>${address[0]}</span>
                                 <span>${address[1]}</span>
                            </div>
                         <div class ="store-phone-number">${phone}</div>
                        </div>
                        <div class="store-number-container">
                            <div class ="store-number">
                             ${index+1}
                            </div>
                        </div>
                    </div>`
                });
                document.querySelector('.stores-list').innerHTML = storesHtml;
    }

        function showStoresMarkers() {
            var bounds = new google.maps.LatLngBounds();
            stores.forEach(function(store, index) {
                var latlng = new google.maps.LatLng(
                    store.coordinates.latitude,
                    store.coordinates.longitude);
                    var name = store.name;
                    var address = store.addressLines[0];
                    var statusText = store.openStatusText;
                    var phone = store.phoneNumber;
                    bounds.extend(latlng);
                    createMarker(latlng, name, address, statusText, phone, index);
            });
            map.fitBounds(bounds);
        }
        function createMarker(latlng, name, address, statusText, phone, index){
             var html = `
             <div class ="store-info-window">
                <div class ="store-info-name">
                    ${name}
                </div>
                <div class ="store-info-status">
                    ${statusText}
                </div>
                <div class ="store-info-address">
                    <div class ="circle">
                        <i class="fas fa-location-arrow"></i>
                    </div>
                    ${address}
                </div>
                <div class ="store-info-phone">
                    <div class ="circle">
                        <i class="fas fa-phone-alt"></i>
                    </div>
                    ${phone}
                </div>
             </div>
             `
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                label:`${index+1}`
               
            });
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });
            markers.push(marker);
        }