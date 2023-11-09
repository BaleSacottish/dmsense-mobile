import { axios } from "../api"

/**
 * @typedef {Object} CreateDiabeteResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id - ID ของ Patient
 * @param {number} props.diabete_level_id - ID ของระดับคีโตน (Ketone level)
 * @param {number} props.value - ID ค่าคีโตน
 * @param {string} props.bluetooth_id - ID ของ Bluetooth
 * 
 * @returns {CreateDiabeteResponse}
 */

const createDiabeteLastRecord = async (props) => {
    const formData = new FormData();

    formData.append('patient_id', props.patient_id);
    formData.append('diabete_level_id', Number(props.diabete_level_id));
    formData.append('value', Number(props.value));
    formData.append('bloothoth_id', props.bluetooth_id);

    try {
        const res = await axios.post(`/diabete-values`, formData);
        if (res.status != 201) {
            return {
                data: null,
                status: false,
            }
        }
        // const data = res.data;

        return {
            data: null,
            status: true,
        }


    }
    catch (err) {
        console.error(err);
        console.error(err.response.data);
        return {
            data: null,
            status: false,
        };
    }
}

/**
 * @typedef {Object} IDiabete
 * @property {string} created_at
 * @property {number} values
 * @property {string} level_name
 * @property {string} color
 */

/**
 * @typedef {Object} GetDiabeteResponse
 * @property {IDiabete[]} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id
 * @param {number} props.day
 * 
 * @returns {GetDiabeteResponse}
 */

const getDiabeteLastRecord = async (props) => {
    try {
        const res = await axios.get(`/diabete-values/last-record/day/${props.patient_id}?day=${props.day}`);
        if (!res.data) {
            return {
                data: null,
                status: false,
            }
        }
        const data = res.data;

        return {
            data: data.map((item) => {
                return {
                    created_at: item.created_at,
                    level_name: item.level_name,
                    values: item.value,
                    color: item.color
                }
            }),
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
    createDiabeteLastRecord,
    getDiabeteLastRecord,
}