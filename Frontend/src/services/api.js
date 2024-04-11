import axios from 'axios'

const URL="http://localhost:5000/api"

export const addTasks=(data)=>{
    try{
        return axios.post(`${URL}/tasks`,data);
    }
    catch(err){
        console.log('Error while calling addTasks API');
    }
}

export const getItems=(qStatus)=>{
    console.log(qStatus + "API");

    try{
        if(!qStatus){
            return axios.get(`${URL}/tasks`);
        }
        else{
            return axios.get(`${URL}/tasks?status=${qStatus}`);
        }
    }
    catch(err){
        console.log('Error wile calling getItems API');
    }
}