import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../api"
import { signout } from "./auth";

/**
 * @typedef {object} CreateQuestionResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id
 * @param {string} props.question
 * @param {string} props.answer
 * 
 * @returns {CreateQuestionResponse}
 */

const createQuestion = async (props) => {
    let formData = new FormData();
    formData.append('patient_id', props.patient_id);
    formData.append('question', props.question);
    formData.append('answer', props.answer);

    try {
        const res = await axios.post(`/questionnaires`, formData);
        if (res.status != 201) {
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

        const data = res.data.data;
        
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

export {
    createQuestion
}