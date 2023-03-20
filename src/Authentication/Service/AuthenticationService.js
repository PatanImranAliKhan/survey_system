import axios from 'axios'

export function CheckAdminCred(email,password)
{
    const promise = new Promise((resolve, reject) => {
        if(email==="admin@gmail.com" && password==="Admin@123")
        {
            resolve("true");
        }
        else
        {
            reject("false");
        }
    });
    return promise;
}

export function AuthenticateUser(email,password)
{
    return axios.get(`http://localhost:9000/user/login/${email}/${password}`)
}

export function PostUserDetails(data)
{
    return axios.post('http://localhost:9000/user/add',data);
}