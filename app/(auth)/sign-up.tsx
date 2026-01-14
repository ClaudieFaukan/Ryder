import {View, Text, ScrollView, Image} from "react-native";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";

const SignUp= () =>{

    const [form,setForm] = useState({
        name:'',
        email:'',
        password:'',
    })

    const onSignUpPress = async () => {

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

                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Vous avez déjà un compte? </Text>
                        <Text className="text-primary-500">Se connecter</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    )
}
export default SignUp;