import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CHART_SERIES } from '../../utils/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TempHumidityChart() {
  const data = {
    labels: CHART_SERIES.timestamps,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: CHART_SERIES.temperature,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        fill: true,
        tension: 0.4,
        yAxisID: 'yTemp',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Humidity (%)',
        data: CHART_SERIES.humidity,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        fill: true,
        tension: 0.4,
        yAxisID: 'yHumidity',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' },
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#34d399',
        bodyColor: '#f3f4f6',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans', size: 11 } }
      },
      yTemp: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Temp (°C)', color: '#f59e0b', font: { size: 11, weight: 'bold' } },
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      yHumidity: {
        type: 'linear',
        display: true,
        position: 'right',
        title: { display: true, text: 'Humidity (%)', color: '#06b6d4', font: { size: 11, weight: 'bold' } },
        grid: { drawOnChartArea: false },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  return (
    <div className="w-full h-72">
      <Line data={data} options={options} />
    </div>
  );
}
export default TempHumidityChart;
