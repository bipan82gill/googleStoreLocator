var map;
        function initMap() {
            var losAngeles = {
                lat : 34.063380,
                lng: -118.358080
            }
          map = new google.maps.Map(document.getElementById('map'), {
            center: losAngeles,
            zoom: 8
          });
          var marker = new google.maps.Marker({
              position: losAngeles,
              map:map
          }
          )
          displayStores()
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

        