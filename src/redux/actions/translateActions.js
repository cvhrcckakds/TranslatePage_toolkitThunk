import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

//thunk aksiyonu
export const getLanguages = createAsyncThunk("translate/getLanguages", async () => {
  const res = await axios.request(options);


  //aksiyonun payloadı olacak veriyi return etme
  return res.data.data.languages;
});


//Çeviri işlemi yapıp sonucunu store aktar
export const translateText=createAsyncThunk(
    "translate/text", 
    async({text, sourceLang, targetLang})=>{
        console.log(text, sourceLang, targetLang)

//İstek için gerekli ayarlar(api içinden translate kısmından code snippets bölünden aldık)
const params = new URLSearchParams();
params.set('source_language', sourceLang.value);
params.set('target_language', targetLang.value);
params.set('text', text);

const options = {
  method: 'POST',
  url: 'https://text-translator2.p.rapidapi.com/translate',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'b3a8459b6dmsh64bb6d176f81af1p174ce5jsnf58fa4be6dcf',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  },
  data: params,
};

//Yukarıdaki ayarlara göre api isteği atar
const res = await axios.request(options)
//aksiyonun payloadını belirleme
return res.data.data.translatedText;
    }
)