import { API } from "../_api"

export const getTransactions = async () => {
    const { data } = await API.get("/transactions", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
    });
    return data.data;
}

export const createTransactions = async (data) => {
    try {
        const response = await API.post("/transactions", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating book:", error.response?.data || error.message);
        throw error;
    }
};

export const showTransaction = async (id) => {
    const { data } = await API.get(`/transactions/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
    });
    return data.data;
}