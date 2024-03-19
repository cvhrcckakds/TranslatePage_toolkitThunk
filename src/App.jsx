import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateActions";
import Select from "react-select";
import {setAnswer} from "./redux/slice/translateSlice"


const App = () => {
  const dispatch = useDispatch(); // Aksiyonları çalıştır
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice); // Doğru reducer adını kullandığınızdan emin olun
  const [text, setText] = useState(""); // Yazılanları state'de tutmak için
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  // Apiden dil verilerini al store'a aktar
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // Diziyi istenen formata çevirme
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  );

  //değiştirme işlemi
  const handleSwap=()=>{
    setSourceLang(targetLang)
    setTargetLang(sourceLang);

  //cevap textatea bölgelerindeki metinleri değiştirme
  setText(translateSlice.answer); //alttakini üste getirme
  dispatch(setAnswer(text)) //üstekini alta getir

  }



  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri*</h1>
        {/* Üst kısım */}
        <div className="upper">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
          <button onClick={handleSwap}>Değiştir</button>
          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        {/* Orta kısım */}
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>

          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && (
              <div className="wrapper">
                 <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
              </div>
              </div>
             
            )}
          </div>
        </div>

        {/* Alt kısım */}
        <button onClick={() => dispatch(translateText({text, sourceLang, targetLang}))}>
          ÇEVİR
        </button>
      </div>
    </div>
  );
};

export default App;
