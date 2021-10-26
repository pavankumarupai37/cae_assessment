import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Roster from '../screens/Roster';
import RosterDetails from '../screens/RosterDetails';

const Stack=createStackNavigator();

const AppContainer=(props)=>{
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Roster'} headerMode='none'>
                <Stack.Screen name='Roster' component={Roster}/>
                <Stack.Screen name='RosterDetails' component={RosterDetails}/>
                </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;