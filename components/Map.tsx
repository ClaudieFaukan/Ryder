import {View, Text, StyleSheet} from "react-native";
import MapView, {PROVIDER_DEFAULT} from "react-native-maps";

const Map = () => {

    // const region = {}
    return  (
        <MapView provider={PROVIDER_DEFAULT}
                 tintColor="black"
                 mapType="mutedStandard"
                 showsPointsOfInterest={false}
                 style={{width: '100%', height: '100%'}}
                 //initialRegion={region?}
            showsUserLocation={true}
                 userInterfaceStyle="light"
        >
            <Text>MAP</Text>
        </MapView>
    )
}


export default Map;