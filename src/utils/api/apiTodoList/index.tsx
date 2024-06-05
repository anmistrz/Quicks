'use server';

export const getApiTodoList = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        return data
    } catch (error:any) {
        throw new Error(error)
    }
}
