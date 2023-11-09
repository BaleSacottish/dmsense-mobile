import { useNavigation } from "@react-navigation/native";
import { axios } from "../api"
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @typedef {object} SigninResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.citizen_id - เลขบัตรประชาชน
 * @param {string} props.password - รหัสผ่าน
 * 
 * @returns {SigninResponse}
 */

const signIn = async (props) => {
    if (!props.citizen_id)
        return { data: null, status: false }

    let formData = new FormData();
    formData.append('citizen_id', props.citizen_id);
    formData.append('password', props.password);

    try {
        const res = await axios.post(`/patient/auth`, formData);
        if (res.status != 200) {
            return {
                data: null,
                status: false,
            }
        }
        // else if (res.status == 401) {
        //     signout(id);
        //     return;
        // }
        const data = res.data.data;

        axios.defaults.headers.common['uid'] = data.id;
        AsyncStorage.setItem('id', data.id);
        AsyncStorage.setItem('user', JSON.stringify(data));
        return {
            data: data,
            status: true,
        }


    }
    catch (err) {
        console.error(err);
        return {
            data: null,
            status: false,
        };
    }
}

/**
 * @typedef {object} SignoutResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @returns {SignoutResponse}
 */

const signout = async (props) => {

    const id = await AsyncStorage.getItem('id');
    const formData = new FormData();
    formData.append('uid', id);

    try {
        const res = await axios.post(`/sign-out`, formData);
        if (res.status != 200) {
            return {
                data: null,
                status: false,
            }
        }
        else if (res.status == 401) {
            signout();
            return {
                data: 'expire',
                status: false
            }
        }
        
        axios.defaults.headers.common['uid'] = null;
        AsyncStorage.clear();

        return {
            data: null,
            status: true
        }


    }
    catch (err) {
        console.error(err);
        return {
            data: null,
            status: false,
        };
    }
}

/**
 * @typedef {object} ChangePasswordResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.citizen_id
 * @param {string} props.password - รหัสผ่าน
 * 
 * @returns {ChangePasswordResponse}
 */

const updatePassword = async (props) => {
    let formData = new FormData();
    formData.append('citizen_id', props.citizen_id);
    formData.append('password', props.password);

    try {
        const res = await axios.put(`/patient/update-password`, formData);
        if (res.status != 200) {
            return {
                data: null,
                status: false,
            }
        }
        const data = res.data.data;

        return {
            data: data,
            status: true,
        }


    }
    catch (err) {
        console.error(err);
        console.error(err.response.data)
        return {
            data: null,
            status: false,
        };
    }
}

export {
    signIn,
    signout,
    updatePassword
}