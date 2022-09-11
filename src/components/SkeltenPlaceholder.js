import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Theme from "../screens/Utils/Theme";

const Skeleton = ({width,height}) => {
  return (
    <SkeletonPlaceholder
    direction="right"
    speed={1000}
    backgroundColor={"#808080"}
    highlightColor="#C5C5C5"
    
    >
      <View style={{ height:height,width:width ,borderRadius:5,alignSelf:"center"}}>
      </View>
    </SkeletonPlaceholder>
  );
};
export default Skeleton;