import FontAwesome from '@expo/vector-icons/FontAwesome'
import { StyleSheet } from 'react-native'
import { Tabs, useRouter } from 'expo-router'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'

export default function TabsLayout ()  {

    
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor:"#E3B9BC",
            headerShown:false,
            tabBarStyle:{
                backgroundColor:"#1C1C1E"
            }
            }}>
            <Tabs.Screen 
                 name="index"
                 options={{
                    title:"",
                    tabBarIcon: ({color}) => <FontAwesome size={24} name="home" color={color} />,
                    
                 }}
            />

            <Tabs.Screen 
                 name="bondwell"
                 options={{
                    title:"",
                    label:"Mrs.Bondwell",

                    tabBarIcon: ({color}) => <FontAwesome size={24} name="wechat" color={color} />
                 }}
            />


            <Tabs.Screen 
                 name="shop"
                 options={{
                    title:"",
                    tabBarIcon: ({color}) => <FontAwesome size={24} name="shopping-cart" color={color} />
                 }}
            />


            <Tabs.Screen 
                 name="stories"
                 options={{
                    title:"",
                    tabBarIcon: ({color}) => <FontAwesome size={24} name="book" color={color} />
                 }}
            />

            <Tabs.Screen 
                 name="quiz"
                 options={{
                    title:"",
                    tabBarIcon: ({color}) => <FontAwesome size={24} name="question-circle" color={color} />
                 }}
            />

      <Tabs.Screen
   
        name="quizzes/quizdetail/[id]"
        options={{
          href:null
        }}
      />

            
        </Tabs>
    )
}

