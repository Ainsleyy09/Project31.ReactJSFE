import React, { useEffect, useState } from "react";
import { getTransactions, showTransaction } from "../../../_services/transaction";
import { bookImageStorage } from "../../../_api";
import { API } from "../../../_api";


function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                if (!userInfo) return;
    
                if (userInfo.role === "admin") {
                    const allTransactions = await getTransactions();
                    setTransactions(allTransactions);
                } else {
                    const res = await API.get("/mytransactions", {
                        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                    });
                    setTransactions(res.data.data); // ini array semua transaksi customer
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
    
        fetchTransactions();
    }, [userInfo]);    

    return (
        <section className="py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Riwayat Pembelian</h1>
                {transactions.length === 0 ? (
                    <p>Belum ada transaksi.</p>
                ) : (
                    <div className="space-y-4">
                        {transactions.map(tx => (
                            <div key={tx.id} className="flex items-center border p-4 rounded-lg">
                                <img
                                    src={
                                        tx.book.cover_photo?.startsWith("http")
                                            ? tx.book.cover_photo
                                            : `${bookImageStorage}/${tx.book.cover_photo}`
                                    }
                                    alt={tx.book.title}
                                    className="w-20 h-28 object-cover rounded"
                                />
                                <div className="ml-4 flex-1">
                                    <h2 className="text-lg font-medium">{tx.book.title}</h2>
                                    <p>Order Number: {tx.order_number}</p>
                                    <p>Total: Rp {tx.total_amount}</p>
                                    <p>Tanggal: {new Date(tx.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default TransactionHistory;
