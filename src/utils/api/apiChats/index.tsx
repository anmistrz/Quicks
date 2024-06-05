'use server';


// import { APP_ID, BASE_URL } from "@/utils/environment";




export const getApiUser= async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        return data
    } catch (error:any) {
        throw new Error(error)
    }
}



// export const getApiUser = async (limit?: string) => {
//     try {
//         console.log('APP_ID', APP_ID);
//         const response = await fetch(`${BASE_URL}/user`, {
//             method: "GET",
//             headers: {
//               "Content-type": "application/json; charset=UTF-8",
//               "app-id": APP_ID ? APP_ID : "",
//             }
//             });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//     console.error(error);
//     }
// };


// export const getApiComment = async (limit?: string) => {
//     try {
//         console.log('APP_ID', APP_ID);
//         const response = await fetch(`${BASE_URL}/comment`, {
//             method: "GET",
//             headers: {
//               "Content-type": "application/json; charset=UTF-8",
//               "app-id": APP_ID ? APP_ID : "",
//             }
//             });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//     console.error(error);
//     }
// };
