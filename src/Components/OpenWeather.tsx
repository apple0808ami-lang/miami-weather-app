// importとAPIキー
import { useState } from "react";
import axios from "axios";

const API_KEY = 'a8f92150912ef1430501f6534a39a016';

// Jsonデータ用インターフェース
interface WeatherData {
    weather : 
        {
            description : string; // 天気の説明
            icon : string; // アイコンの説明
        }[],
    main : {
        temp : number; //気温（C°）
    }
}

// 関数OpenWeatherの定義
function OpenWeather () {
    // useStateの宣言
    const [city, setCity] = useState('Tokyo');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    
    // 天気データの取得部分
    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`);
            setWeatherData(response.data);
        }
        catch (error) {
            console.error('データ取得エラー', error);
        }
    };
    // 取得データの表示部分
    return (
        <>
            <input type="text" placeholder="地域名を記入" value={city} onChange={ (e) => {setCity(e.target.value)}}></input>
            <button onClick={fetchWeatherData}>天気取得</button>
            { weatherData && (
                <div>
                    <h2>{city}のお天気</h2>
                    <p><img src={"https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"} alt={weatherData.weather[0].description} /></p>
                    <p>天気： {weatherData.weather[0].description}</p>
                    <p>気温：{weatherData.main.temp}° C</p>
                </div>
            )}
        </>
    );
};

export default OpenWeather;
