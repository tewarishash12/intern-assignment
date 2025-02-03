import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchStocks = createAsyncThunk(
    'stock/fetchStocks',
    async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/stocks');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch stocks');
        }
    }
);

export const pollStockData = createAsyncThunk(
    'stock/pollStockData',
    async ({ id, duration }) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/api/stocks/${id}`,
                { duration },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch stock data');
        }
    }
);

const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stocks: [],
        selectedStock: null,
        stockData: [],
        loading: false,
        error: null,
    },
    reducers: {
        setStocks: (state, action) => {
            state.stocks = action.payload;
        },
        setSelectedStock: (state, action) => {
            state.selectedStock = action.payload;
        },
        setStockData: (state, action) => {
            state.stockData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.loading = false;
                state.stocks = action.payload;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(pollStockData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(pollStockData.fulfilled, (state, action) => {
                state.loading = false;
                state.stockData = action.payload;
            })
            .addCase(pollStockData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const {
    setStocks,
    setSelectedStock,
    setStockData,
    setLoading,
    setError,
} = stockSlice.actions;

export default stockSlice.reducer;
