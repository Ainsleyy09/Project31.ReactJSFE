import { API } from "../_api"

export const getAuthors = async () => {
    const { data } = await API.get("/authors")
    return data.data;
}

export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const showAuthor = async (id) => {
    const { data } = await API.get(`/authors/${id}`);
    return data.data;
};

export const updateAuthor = async (id, formData) => {
    try {
        const response = await API.post(`/authors/${id}?_method=PUT`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating author:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteAuthor = async (id) => {
    try {
        await API.delete(`/authors/${id}`, {
            headers : {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error("Error deleting author:", error.response?.data || error.message);
        throw error;
    }
};