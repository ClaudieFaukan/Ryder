import {View, Text, ScrollView, Image, Alert} from "react-native";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link,useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from '@clerk/clerk-expo'

const SignIn= () =>{
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const [form,setForm] = useState({
        email:'',
        password:'',
    })

    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.navigate('/(root)/(tabs)/home')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                Alert.alert('Error',JSON.stringify(signInAttempt, null, 2))
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/guides/development/custom-flows/error-handling
            // for more info on error handling2))
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Bienvenue 👋</Text>
                </View>
                <View className="p-5">

                    <InputField label="Email"
                                placeholder="Entrer votre Email"
                                icon={icons.email}
                                value={form.email}
                                onChangeText={(value) => {
                                    setForm({...form, email: value});
                                }}
                    />
                    <InputField label="Mot de passe"
                                placeholder="Votre mot de passe"
                                icon={icons.lock}
                                value={form.password}
                                secureTextEntry={true}
                                onChangeText={(value) => {
                                    setForm({...form, password: value});
                                }}
                    />

                    <CustomButton title="Se connecter" onPress={onSignInPress} className="mt-6" />

                    <OAuth />

                    <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-10">
                        <Text>Vous n'avez pas de compte? </Text>
                        <Text className="text-primary-500">S'incscrire</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignIn;