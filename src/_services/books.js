import { API } from "../_api"

export const getBooks = async () => {
    const { data } = await API.get("/books")
    return data.data;
}

export const createBook = async (formData) => {
    try {
        const response = await API.post("/books", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error.response?.data || error.message);
        throw error;
    }
};

export const showBook = async (id) => {
    const { data } = await API.get(`/books/${id}`);
    return data.data;
};

export const updateBook = async (id, formData) => {
    try {
        const response = await API.post(`/books/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating book:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        await API.delete(`/books/${id}` ,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

