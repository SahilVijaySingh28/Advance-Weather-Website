const API_KEY = '060b209ad78444b6b9194248232004';

    document.getElementById('search').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        fetchWeather(e.target.value);
      }
    });

    function fetchWeather(city) {
      fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=10&aqi=yes&alerts=no`)
        .then(res => res.json())
        .then(data => {
          const current = data.current;
          const forecast = data.forecast;

          document.getElementById('temp').textContent = `${current.temp_c}°`;
          document.getElementById('feels').textContent = `${current.feelslike_c}°`;
          document.getElementById('desc').textContent = current.condition.text;
          document.getElementById('summary').textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
          document.getElementById('humidity').textContent = `${current.humidity}%`;
          document.getElementById('vis').textContent = `${current.vis_km} km`;
          document.getElementById('wind').textContent = `${current.wind_kph} kph`;
          document.getElementById('gusts').textContent = `${current.gust_kph} kph`;
          document.getElementById('precip').textContent = `${current.precip_mm} mm`;
          document.getElementById('uv').textContent = current.uv;
          document.querySelector('.uv-pointer').style.left = `${(current.uv / 11) * 100}%`;

          const aqi = current.air_quality.pm2_5;
          document.getElementById('aqi').textContent = aqi.toFixed(1);
          let level = '';
          if (aqi <= 12) level = 'Good';
          else if (aqi <= 35.4) level = 'Moderate';
          else if (aqi <= 55.4) level = 'Unhealthy for Sensitive Groups';
          else if (aqi <= 150.4) level = 'Unhealthy';
          else if (aqi <= 250.4) level = 'Very Unhealthy';
          else level = 'Hazardous';
          document.getElementById('aqi-level').textContent = level;

          const hourlyEl = document.getElementById('hourly');
          const dailyEl = document.getElementById('daily');
          hourlyEl.innerHTML = '';
          dailyEl.innerHTML = '';

          forecast.forecastday[0].hour.slice(0, 6).forEach(hour => {
            const time = hour.time.split(' ')[1];
            hourlyEl.innerHTML += `<div class="hour">${time}<br>${hour.temp_c}°</div>`;
          });

          forecast.forecastday.forEach(day => {
            const date = day.date;
            const avg = day.day.avgtemp_c;
            dailyEl.innerHTML += `<div class="day">${date}<br>${avg}°</div>`;
          });
        });
    }