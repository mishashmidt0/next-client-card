import {useQuery} from "@tanstack/react-query";



export default async function useGetAllMessage(){
const data = fetch(`http://localhost:3080/api/chat`,{
    method:"GET",
    mode: 'no-cors',
    headers: {
        "Content-Type": "application/json",
    },
})
    .then(function (response) {
    return response.json()
    })
    .then(function (data) {
        console.log('data', data)
    })


    return data
}

