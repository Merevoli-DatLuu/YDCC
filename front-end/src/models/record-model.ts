export interface RecordModel {
    "id": number,
    "patient_name": string,
    "hospital_name": string,
    "hospital_referral_name": string,
    "symptom": string,
    "diagnose": string,
    "treatment": string,
    "doctor": string,
    "note": string,
    "start_date": string,
    "end_date": string,
    "re_examination": string | null,
    "organ_donor": string | null,
    "emergency": boolean,
    "appropriate_levels": boolean,
    "health_insurance_id": string,
    "hospital_id": number,
    "referral": string | null
}