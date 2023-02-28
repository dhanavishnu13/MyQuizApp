import React, {useState} from 'react';
import {View, StyleSheet,Text, ToastAndroid} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormButton from '../components/shared/FormButton';
import FormInput from '../components/shared/FormInput';
import { COLORS } from '../constants/theme';
import { createQuiz } from '../utils/database';
import AddQuestionScreen from './AddQuestionScreen';

const CreateQuizScreen = ({navigation}) => {
    const [title, setTitle]=useState('')
    const [description, setDiscription]=useState('')

    const handelQuizSave=async ()=>{
        const currentQuizId=Math.floor(100000+Math.random() *9000).toString();
        await createQuiz(currentQuizId, title, description)

        navigation.navigate('AddQuestionScreen',{
            currentQuizId:currentQuizId,
            currentQuizTitle:title,
        });

        setTitle('');
        setDiscription('');
        ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
    };
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:COLORS.black,
            padding:20,
        }}>
            <Text style={{
                fontSize:20,
                textAlign:'center',
                marginVertical:20,
                fontWeight:'bold',
                color:COLORS.white

            }}>Create Quiz</Text>

            <FormInput
                labelText='Title'
                placeholderText='Enter Quiz Title'
                onChangeText={val => setTitle(val)}
                value={title}
            />
            <FormInput
                labelText='Description'
                placeholderText='Enter Quiz Discription'
                onChangeText={val =>setDiscription(val)}
                value={description}
            />

            <FormButton labelText='Save Quiz' handleOnPress={handelQuizSave}/>
            {/* Temp */}
            <FormButton
        labelText="Navigate to AddQuestionScreen"
        style={{
          marginVertical: 20,
        }}
        handleOnPress={() => {
            navigation.navigate('AddQuestionScreen',{
                currentQuizId:'107819',
                currentQuizTitle:'Demo',
            });
        }}
      />
        </SafeAreaView>
    );
}



export default CreateQuizScreen;
