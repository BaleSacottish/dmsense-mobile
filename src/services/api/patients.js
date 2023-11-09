import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "../api";
import { signout } from "./auth";

/**
 * @typedef {object} IPatient
 * @property {string} id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} deleted_at
 * @property {string} citizen_id
 * @property {string} phone_number
 * @property {string} password
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} line_id
 * @property {string} gender
 * @property {string} blood_type
 * @property {string} birthday
 * @property {number} weight
 * @property {number} height
 * @property {number} waistline
 * @property {string} family_history_diabetes
 * @property {string} family_history_ketones
 * @property {string} congenital_disease
 * @property {string} smoking_behavior_drink_alcohol
 * @property {string} food_consumption_behavior
 * @property {string} exercise_behavior
 * @property {string} history_of_drug_use
 * @property {string} address
 * @property {number} subdistrict_id
 * @property {number} district_id
 * @property {number} province_id
 * @property {string} zipcode
 * @property {number} consented
 * 
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {object} CreatePatientBody
 * @property {string} phone_number - เบอร์โทรศัพท์
 * @property {string} first_name - ชื่อจริง
 * @property {string} last_name - นามสกุล
 * @property {string} email - อีเมล์
 * @property {string} line_id - ไอดีไลน์
 * @property {string} gender - เพศ (ใส่นอกเหนือจากนี้ได้ เป็น string)
 * @property {string} blood_type - กรุ๊ปเลือด
 * @property {string} birthday
 * @property {number} weight
 * @property {number} height
 * @property {number} waistline
 * @property {string} family_history_diabetes
 * @property {string} family_history_ketones
 * @property {string} congenital_disease
 * @property {string} smoking_behavior_drink_alcohol
 * @property {string} food_consumption_behavior
 * @property {string} exercise_behavior
 * @property {string} history_of_drug_use
 * @property {string} address
 * @property {number} subdistrict_id
 * @property {number} district_id
 * @property {number} province_id
 * @property {string} zipcode
 * @property {number} consented - ส่งค่า 1 มา
 */

/**
 * @typedef {Object} CreatePatientResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.citizen_id
 * @param {string} props.password
 * @param {number} props.latitude
 * @param {number} props.longitude
 * 
 * @returns {CreatePatientResponse}
 */

const createPatient = async (props) => {
    if (!props.citizen_id)
        return { data: null, status: false }

    const formData = new FormData();

    formData.append('citizen_id', String(props.citizen_id));
    formData.append('password', String(props.password));

    formData.append('lat', props.latitude);
    formData.append('lng', props.longitude);
    // formData.append('weight', props.userData.weight);
    // formData.append('height', props.userData.height);

    try {
        const res = await axios.post(`/patients`, formData);
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

        const data = res.data;

        axios.defaults.headers.common['uid'] = data.insertId;
        AsyncStorage.setItem('id', data.insertId);

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
 * @typedef {object} GetPatientResponse
 * @property {IPatient} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.citizen_id
 * @param {string} props.phoneNumber
 * 
 * @returns {GetPatientResponse}
 */

 const getPatient = async (props) => {
    try {
        const res = await axios.get(`/patient/get?citizen_id=${props.citizen_id}`);
        if (res.status != 200 && res.status != 204) {
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
                created_at: data.created_at,
                updated_at: data.updated_at,
                deleted_at: data.deleted_at,
                citizen_id: data.citizen_id,
                password: data.password,
                salt: data.salt,
                phone_number: data.phone_number,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                line_id: data.line_id,
                gender: data.gender,
                blood_type: data.blood_type,
                birthday: data.birthday,
                weight: data.weight,
                height: data.height,
                waistline: data.waistline,
                family_history_diabetes: data.family_history_diabetes,
                family_history_ketones: data.family_history_ketones,
                congenital_disease: data.congenital_disease,
                smoking_behavior_drink_alcohol: data.smoking_behavior_drink_alcohol,
                food_consumption_behavior: data.food_consumption_behavior,
                exercise_behavior: data.exercise_behavior,
                history_of_drug_use: data.history_of_drug_use,
                address: data.address,
                subdistrict_id: data.subdistrict_id,
                district_id: data.district_id,
                province_id: data.province_id,
                zipcode: data.zipcode,
                consented: data.consented
            },
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
 * @typedef {Object} CreatePatientResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.patient_id
 * @param {IPatient} props.userData
 * 
 * @returns {CreatePatientResponse}
 */

const updatePatient = async (props) => {
    const formData = new FormData();

    formData.append('gender', props.userData.gender);
    formData.append('birthday', props.userData.birthday);
    formData.append('weight', props.userData.weight);
    formData.append('height', props.userData.height);

    try {
        const res = await axios.put(`/patient/${props.patient_id}`, formData);
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
 * @typedef {Object} CheckPatientResponse
 * @property {object} data
 * @property {boolean} status
 */

/**
 * @param {object} props
 * @param {string} props.citizen_id
 * 
 * @returns {CheckPatientResponse}
 */

const checkPatient = async (props) => {
    const formData = new FormData();

    try {
        const res = await axios.get(`/patient-check/${props.citizen_id}`);
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

        return {
            data: res.data.available,
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

export {
    createPatient,
    getPatient,
    updatePatient,
    checkPatient
}