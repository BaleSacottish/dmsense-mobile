import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../api"
import { signout } from "./auth";

/**
 * @typedef {Object} ITerm
 * @property {number} id
 * @property {string} content
 */

/**
 * @typedef {Object} GetTermResponse
 * @property {ITerm} data
 * @property {boolean} status
 */

/**
 * 
 * @returns {GetTermResponse}
 */

const getTerm = async () => {
    try {
        const res = await axios.get(`/term-and-condition/public`);
        if (!res.data) {
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

        const data = res.data;
        return {
            data: {
                id: data.id,
                content: data.content,
            },
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

export {
    getTerm
}