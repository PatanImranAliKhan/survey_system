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
