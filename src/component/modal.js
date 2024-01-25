import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Modal from 'react-native-modal';

const ModalComponent = ({
    name,
    email,
    appointmentDetails,
    isVisible,
    handleCloseModal
}) => {
const closeModal = () =>{
    handleCloseModal()
}

  return (
    <Modal
  isVisible={isVisible}
  useNativeDriverForBackdrop
  animationOut={'slideOutDown'}
  swipeDirection="down"
  deviceHeight={900}
  statusBarTranslucent
  backdropOpacity={0.75}  // Set the backdrop opacity as needed
  onBackdropPress={() => closeModal()} // Define a function to close the modal
>
    <TouchableOpacity
    style={{position:'absolute',top:30,right:0}}
    onPress={()=>closeModal()}
    >
        <Image source={require("../assets/images/cancel.png")}
        style={{width:24,height:24,tintColor:'white'}}
        />
    </TouchableOpacity>
  <View style={styles.container}>
    <Text style={styles.titleStyle}>
      {"Successful Appointment Schedule"}
    </Text>
    <View style={styles.cardContainer}>
    <Text>{`Name: ${name}`}</Text>
    <Text>{`Email: ${email}`}</Text>
    <Text>{`Appointment Details: ${appointmentDetails?.date} ${appointmentDetails?.time}`}</Text>
  </View>
  </View>
</Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingVertical:20,
    paddingHorizontal: 10,
    height:200,
    backgroundColor: 'white'
  },
  titleStyle:{ 
    color: 'black', 
  fontSize: 20, 
  textAlign: 'center' 
},
cardContainer:{
  marginTop:20,
  gap:10
}
});
