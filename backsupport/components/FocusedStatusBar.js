import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { COLORS } from "../constants";

const FocusedStatusBar = ({backgroundColor, ...props}) => {
	const isFocused = useIsFocused();
	//console.log(...props)
	return isFocused ? <StatusBar animated={true} barStyle="light-content" {...props} /> : null;
}

export default FocusedStatusBar;