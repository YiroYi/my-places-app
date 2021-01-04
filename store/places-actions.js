import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.mapPickedLocation.lat}&lon=${location.mapPickedLocation.lng}&lang=de&limit=10&apiKey=${ENV.googleApiKey}`

    const response = await fetch(url);

    if(!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    if(!resData.features) {
      throw new Error('Something went wrong');
    }

    const address = resData.features[0].properties.formatted;

    const fileName = image.split('/').pop();

    const newPath = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.mapPickedLocation.lat,
        location.mapPickedLocation.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.mapPickedLocation.lat,
            lng: location.mapPickedLocation.lng
          }
        }
      });
    } catch(err) {
      console.log(err);
      throw err;
    }


  }
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();

      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array
      });
    } catch (err) {
      throw err;
    };


  }
}
