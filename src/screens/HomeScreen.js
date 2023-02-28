import React, { useState,useEffect } from 'react';
import {View, StyleSheet,Text,SafeAreaView, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import { signOut } from '../utils/auth';
import FormButton from '../components/shared/FormButton';
import {COLORS } from '../constants/theme'
import {getQuizzes} from '../utils/database';


const HomeScreen = ({navigation}) => {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    const getAllQuizzes=async ()=>{

        setRefreshing(true)
        const quizzes = await getQuizzes();

        let tempQuizzes=[];
        await quizzes.docs.forEach(async quiz=> {
            await tempQuizzes.push({ id: quiz.id, ...quiz.data()})
        })

        await setAllQuizzes([...tempQuizzes])

        setRefreshing(false)
    };

    useEffect(() => {
     getAllQuizzes()
    },[])

    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor: COLORS.background,
            position:'relative'
        }}>
        <StatusBar backgroundColor ={COLORS.black} barstyle={'dark-content'} />
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:COLORS.black,
            elevation:4,
            paddingHorizontal:20,
        }}>
            <Text style={{fontSize:20, color:COLORS.white}}>Quiz App</Text>
            <Text style={{
                fontsize:20,
                padding:10,
                colo:COLORS.error,
            }}
            onPress={signOut}>
            Logout</Text>
        </View>

        <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
            paddingVertical:20
        }}
        renderItem={({item: quiz})=>
        (
          <View style={{
            padding:20,
            borderRadius:5,
            marginVertical:5,
            marginHorizontal:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            backgroundColor:COLORS.white,
            elevation:2,
          }}>
            <View style={{flex:1,paddingRight:10}}>
                <Text style={{fontSize:18, color:COLORS.black}}>{quiz.title} </Text>
                {
                quiz.description!='' ? (<Text style={{opacity : 0.5, color:COLORS.black}}>{quiz.description}</Text>): null
             }
            </View>

          
          <TouchableOpacity style={{
            paddingVertical : 10,
            paddingHorizontal:30,
            borderRadius:50,
            backgroundColor:COLORS.primary+'20'
            }  }>
          <Text style={{color:COLORS.primary}}>Play</Text>
          </TouchableOpacity>
          </View> 
        )}
        />


        <FormButton labelText='Create Quiz' style={{
            position:'absolute',
            bottom :20,
            right:20,
            borderRadius :50,
            paddingHorizontal:30,

        }}
        handleOnPress ={() => navigation.navigate('CreateQuizScreen')}
        />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})

export default HomeScreen;
