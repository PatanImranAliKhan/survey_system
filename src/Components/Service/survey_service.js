import axios from 'axios';

export function postSurvey(surveydetails)
{   
    return axios.post(`http://localhost:9000/survey/post`,surveydetails)
}

export function getAllSurveyDetails(email)
{
    return axios.get(`http://localhost:9000/survey/getServeyDetailsList/${email}`);
}

export function getOneSurveyDetails(id)
{
    return axios.get(`http://localhost:9000/survey/getSurvey/${id}`);
}

export function deleteSurveyDetail(id)
{
    return axios.delete(`http://localhost:9000/survey/delete/${id}`)
}

export function changeActiveStatus(id, active, expiry_data)
{
    return axios.put(`http://localhost:9000/survey/updateActive/${id}/${active}/${expiry_data}`)
}

export function UpdateSurveyByFillingByUsers(id, data)
{
    return axios.put(`http://localhost:9000/survey/update/${id}`,data);
}