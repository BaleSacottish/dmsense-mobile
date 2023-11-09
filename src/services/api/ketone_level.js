import { axios } from "../api"

/**
 * @typedef {Object} IMeasureKetone
 * @property {number} ketone_level_id
 * @property {string} level_name
 * @property {string} level_description
 * @property {string} color
 */

/**
 * @typedef {Object} MeasureResponse
 * @property {IMeasureKetone} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {number} props.value
 * 
 * @returns {MeasureResponse}
 */

const measureKetone = async (props) => {
    try {
        const res = await axios.get(`/ketone-level-measure?ketone_value=${props.value}`);
        if (!res.data?.status) {
            return {
                data: null,
                status: false,
            }
        }
        const data = res.data;

        return {
            data: {
                ketone_level_id: data.ketone_level_id,
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
    measureKetone
}