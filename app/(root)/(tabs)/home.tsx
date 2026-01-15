import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import {SignOutButton} from "@/components/SignOutButton";
import {SafeAreaView} from "react-native-safe-area-context";
import RideCard from "@/components/RideCard";
import {icons, images} from "@/constants";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import rides from "@/app/(root)/(tabs)/rides";
import {useLocationStore} from "@/store";
import {useEffect, useState} from "react";
import * as Location from "expo-location";


const recentRides = [
    {
        "ride_id": "1",
        "origin_address": "Gare de Lyon, Paris, France",
        "destination_address": "Tour Eiffel, Paris, France",
        "origin_latitude": 48.844300,
        "origin_longitude": 2.373000,
        "destination_latitude": 48.858370,
        "destination_longitude": 2.294481,
        "ride_time": 35,
        "fare_price": 19500.00,
        "payment_status": "paid",
        "driver_id": 2,
        "user_id": "1",
        "user_email":"test@test.fr",
        "created_at": "2024-08-12 05:19:20.620007",
        "driver": {
            "driver_id": "2",
            "first_name": "David",
            "last_name": "Brown",
            "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
            "car_seats": 5,
            "rating": "4.60"
        }
    },
    {
        "ride_id": "2",
        "origin_address": "La Défense, Courbevoie, France",
        "destination_address": "Champs-Élysées, Paris, France",
        "origin_latitude": 48.892427,
        "origin_longitude": 2.236294,
        "destination_latitude": 48.869796,
        "destination_longitude": 2.307266,
        "ride_time": 42,
        "fare_price": 24500.00,
        "payment_status": "paid",
        "driver_id": 1,
        "user_id": "1",
        "user_email":"test@test.fr",
        "created_at": "2024-08-12 06:12:17.683046",
        "driver": {
            "driver_id": "1",
            "first_name": "James",
            "last_name": "Wilson",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "3",
        "origin_address": "Montmartre, Paris, France",
        "destination_address": "Gare Montparnasse, Paris, France",
        "origin_latitude": 48.886704,
        "origin_longitude": 2.343104,
        "destination_latitude": 48.840220,
        "destination_longitude": 2.320200,
        "ride_time": 28,
        "fare_price": 6200.00,
        "payment_status": "paid",
        "driver_id": 1,
        "user_id": "1",
        "user_email":"test@test.fr",
        "created_at": "2024-08-12 08:49:01.809053",
        "driver": {
            "driver_id": "1",
            "first_name": "James",
            "last_name": "Wilson",
            "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
            "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
            "car_seats": 4,
            "rating": "4.80"
        }
    },
    {
        "ride_id": "4",
        "origin_address": "Aéroport Charles de Gaulle, Roissy-en-France, France",
        "destination_address": "Opéra Garnier, Paris, France",
        "origin_latitude": 49.009690,
        "origin_longitude": 2.547925,
        "destination_latitude": 48.871906,
        "destination_longitude": 2.331600,
        "ride_time": 55,
        "fare_price": 7900.00,
        "payment_status": "paid",
        "driver_id": 3,
        "user_id": "1",
        "user_email":"test@test.fr",
        "created_at": "2024-08-12 18:43:54.297838",
        "driver": {
            "driver_id": "3",
            "first_name": "Michael",
            "last_name": "Johnson",
            "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
            "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
            "car_seats": 4,
            "rating": "4.70"
        }
    }
]

export default function Home() {
    const {setUserLocation, setDestinationLocation} = useLocationStore();
    const { user } = useUser();
    const loading = false;

    const [hasPersmissions,setHasPermissions] = useState<boolean>(false)
    const handleSignOut = () => {}
    const handleDestination = () => {}

    useEffect(() => {
        const requestLocation = async () =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setHasPermissions(false);
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords?.latitude!,
                longitude: location.coords?.longitude!
            })

            setUserLocation({
                latitude:location.coords.latitude,
                longitude:location.coords.longitude,
                address:`${address[0].name},${address[0].region}`
            });
        };


        requestLocation();
    },[])

    return (
        <SafeAreaView className="bg-general-500">
            <FlatList data={recentRides?.slice(0,5)}
                      renderItem={({item}) => <RideCard ride={item}/>}
                      className="px-5"
                      keyboardShouldPersistTaps="handled"
                      contentContainerStyle={{
                          paddingBottom: 100
                      }}
                      ListEmptyComponent={() => (
                          <View className="flex flex-col items-center justify-center">
                              {!loading ? (
                                  <>
                                      <Image source={images.noResult} className="w-40 h-40" alt='No recent rides founds' resizeMode="contain" />
                                      <Text className="text-sm">Pas de courses récentes..</Text>
                                  </>
                              ):(
                                  <ActivityIndicator size="small" color="#000" />
                              )}

                          </View>
                      )}
                      ListHeaderComponent={() => (
                          <>
                              <View className="flex flex-row items-center justify-between my-5">
                                  <Text className="text-2xl capitalize font-JakartaBold">Bienvenue{', '}{user?.firstName || user?.emailAddresses[0].emailAddress.split('@')[0]} 👋</Text>
                              <TouchableOpacity onPress={handleSignOut} className="justify-center items-center w-10 h-10 rounded-full bg-white">
                                  <Image source={icons.out} className="w-4 h-4" />
                              </TouchableOpacity>
                              </View>
                              <GoogleTextInput icon={icons.search} containerStyle="bg-white shadow-neutral-300"
                                               handlePress={handleDestination}
                              />
                              <>
                                  <Text className="text-xl font-JakartaBold mt-5 mb-3">
                                      Votre position actuel
                                  </Text>
                                  <View className="flex flex-row items-center bg-transparent h-[300px]">
                                        <Map/>
                                  </View>
                              </>
                              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                                 Courses récente
                              </Text>

                          </>
                      )}
            />

        </SafeAreaView>

    )
}