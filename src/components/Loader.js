import React from 'react';
import {Modal,ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader=(props)=>{
    return(
        <Modal transparent={true} 
        visible={props.isLoading}>
            <View style={styles.mainContainer}>
                <ActivityIndicator size='large' color={'black'}/>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    }
})

export default Loader;