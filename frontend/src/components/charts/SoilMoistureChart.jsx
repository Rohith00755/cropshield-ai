import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CHART_SERIES } from '../../utils/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function SoilMoistureChart() {
  const data = {
    labels: CHART_SERIES.timestamps,
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: CHART_SERIES.soilMoisture,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Rainfall (mm)',
        data: CHART_SERIES.rainfall,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 8,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#9ca3af', font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' } }
      },
      tooltip: {
        backgroundColor: '#111827',
        titleColor: '#34d399',
        bodyColor: '#f3f4f6',
        borderColor: '#374151',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        grid: { color: 'rgba(156, 163, 175, 0.1)' },
        ticks: { color: '#9ca3af' }
      }
    }
  };

  return (
    <div className="w-full h-72">
      <Bar data={data} options={options} />
    </div>
  );
}
export default SoilMoistureChart;
