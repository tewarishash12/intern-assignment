import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pollStockData, fetchStocks } from "../slice/stockSlice";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const StockGraph = () => {
    const dispatch = useDispatch();
    const { stocks, stockData, loading, error } = useSelector((state) => state?.stock);

    const [selectedStockId, setSelectedStockId] = useState("");
    const [duration, setDuration] = useState("");

    useEffect(() => {
        dispatch(fetchStocks());
    }, [dispatch]);

    useEffect(() => {
        if (selectedStockId && duration) {
            dispatch(pollStockData({ id: selectedStockId, duration }));
        }
    }, [selectedStockId, duration, dispatch]);

    // Prepare separate chart data for Stock Price and Price Change
    const stockPriceData = {
        labels: stockData?.data?.map(item => new Date(item.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Stock Price",
                data: stockData?.data?.map(item => item.price),
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
                fill: false,
            },
        ],
    };

    const priceChangeData = {
        labels: stockData?.data?.map(item => new Date(item.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Price Change",
                data: stockData?.data?.map(item => item.change),
                borderColor: "rgba(255, 99, 132, 1)",
                tension: 0.1,
                fill: false,
            },
        ],
    };

    const selectedStockMeta = stocks.find((stock) => stock.id === selectedStockId);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-200 shadow-lg rounded-lg">
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <span className="ml-4 text-blue-500 font-semibold">Loading...</span>
                </div>
            )}

            {error && <div className="text-center text-red-500 font-semibold">{error}</div>}

            {!loading && !error && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Select Stock:</label>
                    <select
                        onChange={(e) => setSelectedStockId(e.target.value)}
                        value={selectedStockId}
                        className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        {stocks.map(({ id, name, symbol }) => (
                            <option key={id} value={id}>{name} ({symbol})</option>
                        ))}
                    </select>
                </div>
            )}

            {!loading && selectedStockMeta?.available?.length > 0 && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Select Duration:</label>
                    <select
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                        className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        {selectedStockMeta.available.map((dur) => (
                            <option key={dur} value={dur}>{dur.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            )}

            {!loading && !error && stockData?.data?.length > 0 && (
                <div className="my-6">
                    {/* Stock Price Graph */}
                    <div className="my-4 w-full" style={{ height: "400px" }}>
                        <h3 className="text-xl font-semibold mb-2">Stock Price</h3>
                        <Line
                            data={stockPriceData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>

                    {/* Price Change Graph */}
                    <div className="my-8 w-full" style={{ height: "400px" }}>
                        <h3 className="text-xl font-semibold mb-2">Price Change</h3>
                        <Line
                            data={priceChangeData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </div>
            )}

            {!loading && !error && stockData?.data?.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-300">No Data Available</div>
            )}
        </div>
    );
};

export default StockGraph;
