import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet, ScrollView} from 'react-native';
import AppHeader from '../components/AppHeader';

import CommonStyles from '../utility/CommonStyles';
import { widthToPercent } from '../utility/Responsive';


const RosterDetails=(props)=>{
const [rosterDetails,setRosterDetails]=useState([]);

useEffect(()=>{
setRosterDetails([props.route.params.data])
},[])


return(
    <>
    <AppHeader navigationProps={props.navigation}/>
        
    <View style={styles.mainContainer}>
        <ScrollView>
        <View style={CommonStyles.cardLayout}>
        {rosterDetails&&rosterDetails.map((item,index)=>{
            return(
                Object.entries(item).map(([key, val]) =>{
                    return(
                <View style={styles.cardContent}>
                <Text style={CommonStyles.itemTitle}>{key}</Text>
                <Text style={CommonStyles.commonTextStyle}>{val!=""?val:`N/A`}</Text>
                </View>
                    )
                })
                
            )
        })
        }
        </View>
    </ScrollView>
    </View>
    </>

)
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'#e2e2e2',
        justifyContent:'center',
    },
    cardContent:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:widthToPercent('2%')
    }
})

export default RosterDetails;