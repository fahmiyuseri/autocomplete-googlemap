import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";

export const searchMaps = createAsyncThunk(
    "maps/searchMaps",
    async ({ query }, { dispatch, getstate }) => {
        // console.log(query)
        // const { predictions } = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
        // console.log(predictions)
        // return predictions;
        const apikey = process.env.React_app_GOOGLE_API_KEY;
        console.log(apikey);
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?types=geocode&key=${apikey}&location=2.9374578,101.6055382&input=${query}`);
        return data;
    }
);

export const geocodeFromPlaceId = createAsyncThunk(
    "maps/geocodeFromPlaceId",
    async ({ place_id }, { dispatch, getstate }) => {
        // console.log(query)
        // const { predictions } = await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
        // console.log(predictions)
        // return predictions;
        const apikey = process.env.React_app_GOOGLE_API_KEY;
        console.log(place_id);
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?types=geocode&key=${apikey}&place_id=${place_id}`);
        return data;
    }
);
const searchMapsSlices = createSlice({
    name: "maps",
    initialState: {
        locations: [],
        geoCode: {
            lat: 2.9374578,
            lng: 101.6055382,
            zoom: 8
        },
        loading: false,
        recentSearch: localStorage.getItem("recentSearch")
            ? JSON.parse(localStorage.getItem("recentSearch"))
            : []
    },

    reducers: {
        addRecentSearch: (state, action) => {
            if (action.payload != null) {
                const existItem = state.recentSearch.find((x) => x.place_id === action.payload.place_id);
                if (!existItem) {
                    state.recentSearch.unshift(action.payload);

                    localStorage.setItem("recentSearch", JSON.stringify(state.recentSearch));
                }
            }
        },
    },
    extraReducers: {
        [searchMaps.pending]: (state, action) => {
            console.log("pending");
            state.loading = true;
        },
        [searchMaps.fulfilled]: (state, { payload }) => {
            console.log(payload);

            state.locations = payload.predictions;
            state.loading = false;
        },
        [searchMaps.rejected]: (state, action) => {
            state.loading = false;
        },

        [geocodeFromPlaceId.pending]: (state, action) => {
            console.log("pending");
            state.loading = true;
        },
        [geocodeFromPlaceId.fulfilled]: (state, { payload }) => {
            console.log(payload);

            state.geoCode = payload.results[0].geometry.location;
            state.geoCode.zoom = 15;
            state.loading = false;
        },
        [geocodeFromPlaceId.rejected]: (state, action) => {
            state.loading = false;
        },
    }
})
export const { addRecentSearch } = searchMapsSlices.actions;

export default searchMapsSlices.reducer;
