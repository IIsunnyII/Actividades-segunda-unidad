import React, { useState, useEffect } from 'react';

interface WeatherData {
  state: string;
  date: string;
  temperature: number;
  condition: string;
  description: string;
}

const estadosDeMexico = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán',
  'Zacatecas',
];

const getNextSixDaysDates = (): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate.toISOString().split('T')[0]);
  }
  return dates;
};

const WeatherForecast: React.FC = () => {
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const generateForecast = (): WeatherData[] => {
      const conditions = ['Soleado', 'Parcialmente nublado', 'Nublado', 'Lluvias ligeras'];
      const days = getNextSixDaysDates();

      return estadosDeMexico.flatMap((state) => {
        return days.map((date) => {
          const condition = conditions[Math.floor(Math.random() * conditions.length)];
          const temperature = Math.floor(20 + Math.random() * 15);
          return {
            state,
            date,
            temperature,
            condition,
            description: `El pronóstico para ${state} el ${date} indica un clima ${condition.toLowerCase()} con una temperatura de ${temperature}°C.`,
          };
        });
      });
    };

    const uniqueForecast = (data: WeatherData[]): WeatherData[] => {
      const seenStates = new Set<string>();
      return data.filter((item) => {
        if (seenStates.has(item.state)) {
          return false;
        }
        seenStates.add(item.state);
        return true;
      });
    };

    setForecast(uniqueForecast(generateForecast()));
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Soleado':
        return '☀️';
      case 'Parcialmente nublado':
        return '🌤️';
      case 'Nublado':
        return '☁️';
      case 'Lluvias ligeras':
        return '🌦️';
      default:
        return '❓';
    }
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        margin: '20px',
        padding: '10px',
      }}
    >
      <h2 style={{ color: 'Black' }}>Pronóstico del Clima en Estados de México</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        {forecast.map((day, index) => (
          <div
            key={index}
            style={{
              backgroundColor: hoveredCard === index ? '#ff80ab' : '#81d4fa',
              border: '2px solid #fff',
              borderRadius: '12px',
              boxShadow:
                hoveredCard === index
                  ? '0 8px 12px rgba(0, 0, 0, 0.2)'
                  : '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              width: '220px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s',
              transform: hoveredCard === index ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 style={{ fontSize: '1.5em', color: '#fff', marginBottom: '10px' }}>Clima Juvenil</h3>
            <h4
              style={{
                fontSize: '1.2em',
                margin: '10px 0',
                color: '#ffe57f',
              }}
            >
              {day.state} - {day.date} {getWeatherIcon(day.condition)}
            </h4>
            <p style={{ fontSize: '1em', color: '#fff' }}>Temp: {day.temperature}°C</p>
            <p style={{ fontSize: '1em', color: '#fff' }}>Condición: {day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
