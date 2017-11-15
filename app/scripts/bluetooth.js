const bluetoothButton = document.querySelector('#bluetooth')
const signalButton = document.querySelector('#signal')
const disconnectButton = document.querySelector('#disconnect')

// bluetoothButton.addEventListener('pointerup', function(event) {
//     navigator.bluetooth.requestDevice({ filters: [{ name: 'LEDGPS' }] })
//     .then(device => {
//       // Human-readable name of the device.
//       console.log(device.name);
    
//       // Attempts to connect to remote GATT Server.
//       return device.gatt.connect();
//     })
//     // .then(server => { /* ... */ })
//     .catch(error => { console.log(error); });
//   });
  

class LEDGPS {
    
      constructor() {
        this.device = null;
        this.onDisconnected = this.onDisconnected.bind(this);
      }
      
      request() {
        let options = {
          'filters': [{
            'name': 'LEDGPS'
          }],
          'optionalServices': [0xFF02]
        };
        return navigator.bluetooth.requestDevice(options)
        .then(device => {
          this.device = device;
          console.log('------------------------------------');
          console.log(this.device);
          console.log('------------------------------------');
          // this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
        });
      }
      
      connect() {
        if (!this.device) {
          return Promise.reject('Device is not connected.');
        }
        console.log(this.device)
        return this.device.gatt.connect();
      }
      
      writeColor(data) {
        return this.device.gatt.getPrimaryService(0xFF02)
        .then(service => service.getCharacteristic(0xFFFC))
        .then(characteristic => characteristic.writeValue(data));
      }
    
      disconnect() {
        if (!this.device) {
          return Promise.reject('Device is not connected.');
        }
        return this.device.gatt.disconnect();
      }
    
      onDisconnected() {
        console.log('Device is disconnected.');
      }
      showDevice() {
          console.log('------------------------------------');
          console.log(navigator.bluetooth);
          console.log(this.device);
          console.log('------------------------------------');
      }
      writeData(data) {
        console.log('Sending: '+ data);
        // return this.device.characteristic.writeValue(new Uint8Array(data));  
        return this.device.gatt.getPrimaryService(0xFF02)
        .then(service => service.getCharacteristic(0xFFFC))
        .then(characteristic => characteristic.writeValue(data));
      }
    }
    
    var ledGPS = new LEDGPS();

    bluetoothButton.addEventListener('click', event => {
      ledGPS.request()
      .then(_ => ledGPS.connect())
      .then(_ => { 
        console.log('device should be connected')  

        /* Do something with LEDGPS... */})
      .catch(error => { console.log(error) });
    });

    signalButton.addEventListener('click', event => {
      ledGPS.connect()
      .then(_ => {
        console.log('dingen')
        ledGPS.writeData('12345')
      })  
      .catch(error => { console.log(error) });      
    })

    disconnectButton.addEventListener('click', event => {
      ledGPS.disconnect()
      console.log('Device disconnected')
    })