import { StyleSheet } from "react-native";
import { widthToPercent } from "./Responsive";

export default StyleSheet.create({
    appTitle:{
        fontSize:widthToPercent('5.75%'),
        fontWeight:'bold'
    },
    commonTextStyle:{
        color:'#c1c1c1',
        fontSize:widthToPercent('3.33%')
      },
      itemTitle:{
        fontWeight:'bold',
        fontSize:widthToPercent('4.2%')
      },
      cardLayout:{
        backgroundColor:'white',
        justifyContent:'space-between',
        width:'80%',
        alignSelf:'center',
        marginVertical:widthToPercent('5%'),
        borderRadius:widthToPercent('1%'),
        elevation:4
      }
})