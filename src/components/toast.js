import Toast from 'react-native-tiny-toast';
import { fontFamily, fontSize } from '../constants/fonts';

const toastLoading = ({ text }) => {
    return Toast.showLoading(text, {
        textStyle: {
            fontFamily: fontFamily.regular,
            fontSize: fontSize.small,
            marginTop: 12,
        },
        containerStyle: { padding: 20 },
        animation: true,
    });
}

const toastSuccess = ({ text }) => {
    return Toast.showSuccess(text, {
        textStyle: {
            fontFamily: fontFamily.regular,
            fontSize: fontSize.small,
            marginTop: 12,
        },
        containerStyle: { padding: 20 },
        animation: true,
        imgSource: require('../assets/images/check.png'),
        imgStyle: { width: 30, height: 30 },
    });
}

const toastError = ({ text }) => {
    return Toast.showSuccess(text, {
        textStyle: {
            fontFamily: fontFamily.regular,
            fontSize: fontSize.small,
            marginTop: 12,
        },
        containerStyle: { padding: 20 },
        animation: true,
        imgSource: require('../assets/images/error.png'),
        imgStyle: { width: 30, height: 30 },
    });
}

export {
    toastLoading,
    toastSuccess,
    toastError,
}