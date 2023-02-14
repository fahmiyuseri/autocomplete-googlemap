import { Autocomplete, Container, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { searchMaps, addRecentSearch, geocodeFromPlaceId } from "../slices/autoSuggestPlaceSlice";

//Google map import
import {
    GoogleMap, useLoadScript
    , Marker
} from "@react-google-maps/api";
import SimpleMap from "../components/SimpleMap";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
function HomeScreen() {
    var dispatch = useDispatch();
    const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const loaded = React.useRef(false);
    const { locations, recentSearch, geoCode } = useSelector((state) => state.autoSuggestPlaceSlice);



    return (
        <Container>
            <Autocomplete
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                sx={{ mt: 3, mb: 3 }}
                freeSolo
                options={locations.length > 0 ? locations : recentSearch}
                renderInput={(params) => <TextField {...params} label="Mencari tempat menarik" />}
                onChange={(event, value) => {
                    if (value != null) {
                        dispatch(addRecentSearch(value))
                        var place_id = value.place_id
                        dispatch(geocodeFromPlaceId({ place_id }))


                    }
                }
                }
                onInputChange={(event, query) => {
                    console.log(query)
                    dispatch(searchMaps({ query }));

                }} />
            <SimpleMap
                lat={geoCode.lat}
                lng={geoCode.lng}
                zoom={geoCode.zoom}
            ></SimpleMap>
        </Container>

    );
}
export default HomeScreen;

