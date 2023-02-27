import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { signOut } from '../utils/auth';
import FormButton from '../components/shared/FormButton';

const HomeScreen = ({navigation}) => {
    // const [all]
    return (
        <View>
            <Text>HomeScreen</Text>
            <Text onPress={signOut}>Loggout</Text>
            <FormButton
            labelText='Create Quiz'
            handleOnPress={()=>{
                navigation.navigate('CreateQuizScreen')
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

})

export default HomeScreen;
