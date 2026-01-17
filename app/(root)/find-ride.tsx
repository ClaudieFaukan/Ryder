import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RydeLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";

const FindRide = () => {
const {userAddress,destinationAddress,setDestinationLocation,setUserLocation} = useLocationStore();

    return (
        // @ts-ignore
        <RideLayout title="Trajet" snapPoints={['85%']}>
            <View className={'my-3'}>
                <Text className={'text-lg font-JakartaSemiBold mb-3'}>
                   Départ
                </Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress ?? undefined}
                    containerStyle='bg-neutral-100'
                    textInputBackgroundColor="#f5f5f5"
                    handlePress={(location) => {
                        setUserLocation(location);
                    }} />
            </View>
            <View className={'my-3'}>
                <Text className={'text-lg font-JakartaSemiBold mb-3'}>
                    Arrivé
                </Text>
                <GoogleTextInput
                    icon={icons.map}
                    initialLocation={destinationAddress ?? undefined}
                    containerStyle='bg-neutral-100'
                    textInputBackgroundColor="#f5f5f5"
                    handlePress={(location) => {
                        setDestinationLocation(location);
                    }} />
            </View>
            <CustomButton
                className={'mt-5'}
                title={"Trouvé maintenant"} onPress={() => router.navigate('/(root)/confirm-ride')}/>
        </RideLayout>
    )
}

export default FindRide;