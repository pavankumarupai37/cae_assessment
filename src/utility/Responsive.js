import { Dimensions, PixelRatio } from 'react-native';

let screenWidth = Dimensions.get('window').width;

const widthToPercent = widthPercent => {
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};


export { widthToPercent };