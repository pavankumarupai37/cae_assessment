import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { callGetMethod, isNetworkAvailable } from '../services/Api';
import Constants from '../constants';
import Loader from '../components/Loader';
import { widthToPercent } from '../utility/Responsive';
import CommonStyles from '../utility/CommonStyles';


const Roster = (props) => {

  const [rosterData, setRosterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { offlineData } = useSelector(state => state.StoreReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkNet() {
      let netCheck = await isNetworkAvailable();
      if (netCheck) {
        fetchData()
      } else {
        if (offlineData) {
          setRosterData(offlineData)
        } else {
          alert('No offline data available yet')
        }

      }
    }
    checkNet()
  }, [])

  async function fetchData() {
    setLoading(true)
    let apiResponse = await callGetMethod(Constants.Endpoints.GET_ROSTER)
    setLoading(false)
    setRefresh(false)
    if (!apiResponse.statusMessage) {
      if (apiResponse.status == 200) {
        if (apiResponse.responseJson.length != 0) {
          let listData = apiResponse.responseJson.map((item) => {
            return { title: item.Date, data: apiResponse.responseJson }
          })
          dispatch({ payload: listData, type: Constants.ActionTypes.STORE_DATA })
          setRosterData(listData)
        } else {
          alert('No records found')
        }
      } else if (apiResponse.status == 500) {
        alert('Something went wrong. Please try again later')
      } else {
        alert('Something went wrong. Please try again later')
      }
    } else {
      alert(apiResponse.statusMessage)
    }

  }

  const getHours = (time1, time2) => {
    let start = time1, end = time2
    var diff = start.split(':').map((item, index) => Math.abs(end.split(':')[index] - item)).join(':')
    return diff
  }

  const onRefresh = () => {
    setRosterData([])
    setRefresh(true)
    fetchData()
  }

  const getImage = (code) => {
    let codeValue = code.toUpperCase()
    switch (codeValue) {
      case 'FLIGHT':
        return Constants.Images.FLIGHT;
      case 'STANDBY':
        return Constants.Images.STANDBY;
      case 'LAYOVER':
        return Constants.Images.LAYOVER;
      case 'TRAINING':
        return Constants.Images.TRAINING;
      case 'OFF':
        return Constants.Images.OFF;
      case 'DEBRIEF':
        return Constants.Images.DEBRIEF;
      default:
        return Constants.Images.OTHER;
    }
  }


  return (
    <View style={styles.mainContainer}>
      <SectionList data={rosterData}
        sections={rosterData}
        renderSectionHeader={({ section }) => {
          return (
            <View style={styles.sectionContainer}>
              <Text style={CommonStyles.itemTitle}>{moment(section.title).format('DD MMM. YYYY')}</Text>
            </View>
          )
        }}
        keyExtractor={(item, index) => index.toString()}

        renderItem={({ item }) => {
          let layoverHrs = getHours(item.Time_Depart, item.Time_Arrive)
          return (
            <TouchableOpacity onPress={() => { props.navigation.navigate('RosterDetails', { data: item }) }}>
              <View style={styles.listContainer}>
                <View style={styles.imageContainer}>
                  <Image source={getImage(item.DutyCode)} />
                </View>

                <View style={styles.listItemFirstSec}>
                  <Text style={CommonStyles.itemTitle}>{item.DutyCode == 'FLIGHT' ? `${item.Departure} - ${item.Destination}` : item.DutyCode}</Text>
                  <Text style={CommonStyles.commonTextStyle}>{item.DutyCode == 'LAYOVER' ? item.Departure : item.DutyCode == 'Standby' ? `${item.DutyID} (${item.Departure})` : null}</Text>
                </View>

                <View style={styles.listItemSecondSec}>
                  <Text style={CommonStyles.commonTextStyle}>{item.DutyCode == 'Standby' && `Match Crew`}</Text>
                  <Text style={{ color: 'red', fontSize: widthToPercent('3.33%') }}>{item.DutyCode == 'FLIGHT' || item.DutyCode == 'Standby' ? `${item.Time_Depart} - ${item.Time_Arrive}` : `${layoverHrs} hours`}</Text>
                </View>

              </View>
            </TouchableOpacity>
          )
        }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh} />
        }
      />
      <Loader isLoading={loading} />
    </View>

  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthToPercent('4.5%')
  },
  sectionContainer: {
    backgroundColor: '#e2e2e2',
    paddingHorizontal: widthToPercent('3.75%'),
    paddingVertical: widthToPercent('2%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    borderTopColor: '#d9d9d9'
  },
  listItemFirstSec: {
    flex: 2,
    paddingVertical: widthToPercent('1%'),
    justifyContent: 'space-between'
  },
  listItemSecondSec: {
    flex: 1.5,
    justifyContent: 'space-between',
    paddingVertical: widthToPercent('1%'),
    alignItems: 'flex-end',
    marginRight: widthToPercent('4%')
  }

})

export default Roster;