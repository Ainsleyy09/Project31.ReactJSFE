import { API } from "../_api"

export const getGenres = async () => {
    const { data } = await API.get("/genres")
    return data.data;
}

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const showGenre = async (id) => {
    const { data } = await API.get(`/genres/${id}`);
    return data.data;
};

export const updateGenre = async (id, formData) => {
    try {
        const response = await API.post(`/genres/${id}?_method=PUT`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating genre:", error.response?.data || error.message);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        await API.delete(`/genres/${id}`);
    } catch (error) {
        console.error("Error deleting genre:", error.response?.data || error.message);
        throw error;
    }
};