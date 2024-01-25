import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const BookingList = ({ navigation }) => {
  const { bookingList } = useSelector((state) => state.bookingReducer)

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.listContainer}>
        <Text style={{}}>{`Name: ${item.name}`}</Text>
        <Text>{"Email: ${item.email}"}</Text>
        <Text>{`Apoiment: ${item.apoinmentTime.date} ${item.apoinmentTime.time}`}</Text>
      </View>
    )
  }

  const listEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTextStyle}>{"No Booking Available"}</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={bookingList}
        style={styles.container}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={()=>listEmptyComponent()}
      />
    </View>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    borderRadius: 20
  },
  emptyContainer: {
    backgroundColor: '#f5f5f5',
    elevation: 2,
    height: 160,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTextStyle:{ 
    color: "black", 
    fontSize: 16, 
    fontWeight: '700' 
  }
})