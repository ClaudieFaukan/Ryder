import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import {SignOutButton} from "@/components/SignOutButton";


export default function Home() {
    const { user } = useUser()

    return (
        <View>
            <SignedIn>
                <Text>Bonjour {user?.emailAddresses[0].emailAddress}</Text>
                <SignOutButton />
            </SignedIn>
        </View>
    )
}