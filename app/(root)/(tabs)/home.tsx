import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import {SignOutButton} from "@/components/SignOutButton";
import {SafeAreaView} from "react-native-safe-area-context";


export default function Home() {
    const { user } = useUser()

    return (
        <SafeAreaView>
            <View>
                <SignedIn>
                    <Text>Bonjour {user?.emailAddresses[0].emailAddress}</Text>
                    <SignOutButton />
                </SignedIn>
            </View>
        </SafeAreaView>

    )
}