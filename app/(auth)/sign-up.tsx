import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import React, {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from '@clerk/clerk-expo'
import {ReactNativeModal} from "react-native-modal";
import {fetchAPI} from "@/lib/fetch";

const SignUp= () =>{
    const { isLoaded, signUp, setActive } = useSignUp();
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [showSuccessModal,setShowSuccessModal] = useState(false)
    const [form,setForm] = useState({
        name:'',
        email:'',
        password:'',
    })
    const [verification,setVerification] = useState({
        state: 'default',
        error:'',
        code:''
    })
    const [code, setCode] = React.useState('')
    const router = useRouter()


    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: form.email,
                password : form.password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setVerification({ ...verification,state:'pending'})
            setPendingVerification(true)
        } catch (err:any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            Alert.alert('Error',err.errors[0].longMessage)
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await fetchAPI('/(api)/user',{
                    method: 'POST',
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: signUpAttempt.createdUserId
                    })
                })
                await setActive({ session: signUpAttempt.createdSessionId })
                setShowSuccessModal(true)
                setVerification({ ...verification, state: 'success' })

            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
                setVerification({ ...verification, state: 'failed',error: "Verification failed" })
            }
        } catch (err:any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({ ...verification, state: 'failed',error: err.errors[0].longMessage })
            console.error(JSON.stringify(err, null, 2))
        }
    }


    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px">
                   <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Créer Votre Compte</Text>
                </View>
                <View className="p-5">
                    <InputField label="Nom"
                                placeholder="Entrer votre Nom"
                                icon={icons.person}
                        value={form.name}
                                onChangeText={(value) => {
                                    setForm({...form, name: value});
                                }}
                    />
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

                    <CustomButton title="S'incrire" onPress={onSignUpPress} className="mt-6" />

                    <OAuth />

                    <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Vous avez déjà un compte? </Text>
                        <Text className="text-primary-500">Se connecter</Text>
                    </Link>
                </View>
                <ReactNativeModal isVisible={showSuccessModal} >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                    <Image source={images.check} className='w-[110px] h-[110px] mx-auto my-5' />
                        <Text className="text-3xl font-JakartaSemiBold text-center">Vérifié</Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">Vous avez verifier votre compte avec succes</Text>
                        <CustomButton title="Rediriger vers l'accueil"
                                      className="mt-5"
                                      onPress={()=> {
                                          setShowSuccessModal(false)
                            router.navigate('/(root)/(tabs)/home')
                        }}/>
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={pendingVerification}
                                  onModalHide={() => {
                                      if (verification.state === 'success') {
                                        setShowSuccessModal(true)
                                      }
                                  }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">
                            Vérification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            Nous avons envoyé un code de vérification à {form.email}
                        </Text>
                        <InputField label="Code"
                                    placeholder="12345"
                                    icon={icons.lock}
                                    value={verification.code}
                                    keyboardType="numeric"
                                    onChangeText={(code)=>{
                                        setVerification({...verification,code})
                                    }}
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>
                        )}
                        <CustomButton title="Vérifier mon email" onPress={onVerifyPress} className="mt-5" bgVariant="success" />
                    </View>

                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}
export default SignUp;