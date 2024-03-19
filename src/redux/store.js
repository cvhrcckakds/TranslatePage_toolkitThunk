import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slice/languageSlice";
import translateSlice from "./slice/translateSlice";

export default configureStore({
    reducer: {languageSlice, translateSlice},
});

