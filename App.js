import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useState } from 'react';

export default function App() {

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([
    { key: 1, latitude: 37.78825, longitude: -122.4324, pinColor: `#${Math.floor(Math.random()*16777215).toString(16)}` },
    { key: 2, latitude: 37.78825, longitude: -122.4100, pinColor: `#${Math.floor(Math.random()*16777215).toString(16)}` },
    { key: 3, latitude: 37.78810, longitude: -122.4320, pinColor: `#${Math.floor(Math.random()*16777215).toString(16)}` },
  ]);

  const [latLong, setLatLong] = useState([])

  const moveMap = (lat, long) => {
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }

  // const ChangeMap = (region) => {
  //   setRegion({
  //     latitude: region.latitude,
  //     longitude: region.longitude,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   }); 
  //   setLatLong([region.latitude, region.longitude])
  // }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button title='SP' style={{margin:4}}  onPress={() => moveMap(-23.5492243, -46.5813785)}/>
        <Button title='DF' style={{margin:4}} onPress={() => moveMap(-15.8080373, -47.8750231)}/>
      </View>
      <Text>{[latLong[0],latLong[1]]}</Text>
      <StatusBar hidden={true} />
      <MapView 
      //mapTypes : 'standard', 'satellite', 'hybrid', 'terrain', 'none'
      // onRegionChangeComplete={ChangeMap}
      onPress={(e) => [ setMarkers([...markers, {key: markers.length + 1, latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude, pinColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}]), moveMap(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)]}
      // showTraffic={true}
      mapType='standard'
      style={styles.mapStyle} 
      region={region} >
        {
          markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              title={'Marker Title'}
              description={'Marker Description'}
              image={require('./src/assets/carro.png')}
            />))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: '100%',
    height: '90%',
    marginTop: 20,
  },
});

//AIzaSyCq0SG6VfOXWMmrHXvx6lug2D7Xjt0WFII