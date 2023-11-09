import { axios } from "../api"

/**
 * @typedef {Object} CreateKetoneResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id - ID ของ Patient
 * @param {number} props.ketone_level_id - ID ของระดับคีโตน (Ketone level)
 * @param {number} props.value - ID ค่าคีโตน
 * @param {string} props.bluetooth_id - ID ของ Bluetooth
 * 
 * @returns {CreateKetoneResponse}
 */

const createKetoneLastRecord = async (props) => {
    const formData = new FormData();

    formData.append('patient_id', props.patient_id);
    formData.append('ketone_level_id', props.ketone_level_id);
    formData.append('value', props.value);
    formData.append('bloothoth_id', props.bluetooth_id);


    try {
        const res = await axios.post(`/ketone-values`, formData);
        console.log(res.data)
        if (res?.status != 201) {
            return {
                data: null,
                status: false,
            }
        }
        return {
            data: null,
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
 * @typedef {Object} IKetoneValue
 * @property {string} created_at
 * @property {number} values
 * @property {string} level_name
 * @property {string} color
 */

/**
 * @typedef {Object} GetKetoneResponse
 * @property {IKetoneValue} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id
 * @param {number} props.day
 * 
 * @returns {GetKetoneResponse}
 */

const getKetoneLastRecord = async (props) => {
    try {
        const res = await axios.get(`/ketone-values/last-record/day/${props.patient_id}?day=${props.day}`);
        console.log(res.status)
        if (res.status != 200) {
            return {
                data: null,
                status: false,
            }
        }
        const data = res.data;
        return {
            data: data,
            status: false,
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
    createKetoneLastRecord,
    getKetoneLastRecord,
}