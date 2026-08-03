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

export function DiseaseTrendChart() {
  const labels = CHART_SERIES?.timestamps || CHART_SERIES?.labels || ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];
  const trendData = CHART_SERIES?.diseaseRiskTrend || CHART_SERIES?.diseaseProbability || [45, 52, 68, 82, 85, 80, 78];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rice Blast Risk Trajectory (%)',
        data: trendData,
        borderColor: '#E53935',
        backgroundColor: 'rgba(229, 57, 53, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#E53935',
        pointBorderColor: '#FFFFFF'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#E53935', font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' } }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#E53935',
        bodyColor: '#263238',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(229, 231, 235, 0.8)' },
        ticks: { color: '#607D8B' }
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(229, 231, 235, 0.8)' },
        ticks: { 
          color: '#607D8B',
          callback: (value) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="w-full h-72">
      <Line data={data} options={options} />
    </div>
  );
}
export default DiseaseTrendChart;
