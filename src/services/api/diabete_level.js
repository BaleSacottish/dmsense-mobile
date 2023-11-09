import { axios } from "../api"

/**
 * @typedef {Object} IMeasureDiabete
 * @property {number} diabete_level_id
 * @property {string} level_name
 * @property {string} level_description
 * @property {string} color
 */

/**
 * @typedef {Object} MeasureResponse
 * @property {IMeasureDiabete} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {number} props.value
 * 
 * @returns {MeasureResponse}
 */

const measureDiabete = async (props) => {
    try {
        const res = await axios.get(`/diabete-level-measure?diabete_value=${props.value}`);
        if (!res.data) {
            return {
                data: null,
                status: false,
            }
        }
        const data = res.data;

        return {
            data: {
                diabete_level_id: data.diabete_level_id,
                level_name: data.level_name,
                level_description: data.level_description,
                color: data.color
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
    measureDiabete
}