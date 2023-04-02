import axios from 'axios';

export function postSurvey(surveydetails)
{   
    return axios.post(`http://localhost:9000/survey/post`,surveydetails)
}

export function getSurveyDetails()
{
    return axios.get('http://localhost:9000/survey/getall');
}
