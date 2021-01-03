import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import Colors from '../constants/Colors';



const NewPlaceScreen = props => {
  const[titleValue, setTitleValue] =useState('');

  const titleChangeHandler = text => {
    setTitleValue(setTitleValue);
  }

  const savePlaceHandler = () => {

  }

  return (
    <ScrollView>
      <View style={styles.form} >
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChange={titleChangeHandler}
          value={titleValue}
        />
        <Button title="Save place"
                color={Colors.primary}
                onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin:30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

export default NewPlaceScreen;

