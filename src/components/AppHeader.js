import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { widthToPercent } from '../utility/Responsive';
import Constants from '../constants';
import CommonStyles from '../utility/CommonStyles';

const AppHeader = (props) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={{ marginLeft: widthToPercent('2%') }}
                onPress={() =>{props.navigationProps.goBack()}}>
                <Image source={Constants.Images.BACK} />
            </TouchableOpacity>

            <View style={styles.appTitleContainer}>
                <Image source={Constants.Images.DETAILS} style={{ marginRight: widthToPercent('1%') }} />
                <Text style={CommonStyles.appTitle}>Roster Details</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: widthToPercent('15%'),
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4
    },
    appTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '75%',
        alignItems: 'center'
    }

})

export default AppHeader;