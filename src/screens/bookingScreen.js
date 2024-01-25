import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNew, updateTimeSlot } from '../store/slice';
import ModalComponent from '../component/modal';
import uuid from 'react-native-uuid';

export const isValidEmail = email => {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const BookingScreen = ({ navigation }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState()
  const [emailError, setEmailError] = useState("")

  const { timeSlot, bookingList } = useSelector((state) => state.bookingReducer)

  const dispatch = useDispatch()

  const handleSlotPress = (id) => {
        setSelectedSlot(id)
        dispatch(updateTimeSlot(id))
      
  };

  console.log("selected ",selectedSlot);

  const handleBookAppointment = () => {
    console.log("item");
    const userId = uuid.v4()
    let temp;
    timeSlot.forEach((item) => {
      if (selectedSlot === item.id) {
        temp = { ...item, }
      }
    })
    let fromData = {
      id: userId,
      name: name,
      email: email,
      apoinmentTime: temp
    }
    bookingList.map((item)=>{
      if(item.apoinmentTime.id === selectedSlot){
        Alert.alert("This Time Sloat Already Selected Please Select Another Time Sloat")
      }
      else{
        setAppointmentDetails(temp)
        dispatch(addNew(fromData))
        setModalVisible(true)
      }
    })
  };

  const handleEmailChange = (text) => {
    if (!isValidEmail(text)) {
      setEmailError("Please Enter Vailid Email example@gmail.com")
      setEmail(text)
    } else {
      setEmail(text)
      setEmailError("")
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSlotPress(item.id)}
      style={[
        styles.slotItem,
        { backgroundColor: item.available ? 'white' : '#add8e6' },
      ]}
    >
      <View style={{ gap: 5 }}>
        <Text>{item.date}</Text>
        <Text>{item.time}</Text>
      </View>
      <Text>
        {item.available ? 'Available' : 'Booked'}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BookingList")
            }}
            style={styles.headerButtonStyle}>
            <Text style={styles.bookingCount}>{bookingList.length}</Text>
            <Text style={styles.bookingAppoinmentText}>{"Booking Appoinment"}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={timeSlot}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <View style={styles.bookingForm}>
          <Text style={styles.formLabel}>{"Name:"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />

          <Text style={styles.formLabel}>{"Email:"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              handleEmailChange(text)
            }}
          />
          {emailError &&
            <Text style={styles.errorText}>{emailError}</Text>
          }
          <TouchableOpacity
            disabled={(!selectedSlot || !name || emailError !== "" || !email)}
            onPress={() => handleBookAppointment()}
            style={[
              styles.bookingAppoinmentButton,
              {
                backgroundColor:
                  (!selectedSlot || !name || emailError !== "" || !email )? 'lightgrey' : 'tomato'
              },
            ]}
          >
            <Text
              style={{
                color:
                  !selectedSlot || !name || emailError !== "" ? 'black' : 'white'
              }}
            >
              {"Book Appointment"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalComponent
        isVisible={modalVisible}
        name={name}
        email={email}
        appointmentDetails={appointmentDetails}
        handleCloseModal={() => {
          setModalVisible(false)
          setName("")
          setEmail("")
          setAppointmentDetails(null)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  headerButtonStyle: {
    backgroundColor: "white",
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    alignSelf: 'flex-end'
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bookingCount: {
    fontSize: 16,
    fontWeight: '700'
  },
  bookingAppoinmentText: {
    color: 'grey'
  },
  bookingForm: {
    marginTop: 20,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12
  },
  bookingAppoinmentButton: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  slotItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5
  }
});

export default BookingScreen;