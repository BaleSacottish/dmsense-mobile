import { StyleSheet } from 'react-native'
import colors from './colors';

const globalStyles = StyleSheet.create({
    welcome_padding: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 32,
        backgroundColor:colors.pink_2,
        padding:10,
        alignItems: 'center'
    },

    screen_padding: {
        flex: 1,
        backgroundColor:colors.pink_2,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },

    //Shadow
    shadow_2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    shadow_5: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    connectDevice_padding: {
        flex: 1,
        paddingHorizontal: 32,
        paddingVertical: 32,
        backgroundColor:'#1631C2',
        padding:10
    },
})

export default globalStyles;