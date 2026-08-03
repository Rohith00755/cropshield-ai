import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DISEASE_ANALYTICS_DATA } from '../../utils/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function RiskDonutChart() {
  const commonDiseases = DISEASE_ANALYTICS_DATA?.commonDiseases || [
    { name: "Rice Blast", percentage: 42, color: "#E53935" },
    { name: "Bacterial Leaf Blight", percentage: 24, color: "#F9A825" },
    { name: "Tomato Early Blight", percentage: 18, color: "#42A5F5" },
    { name: "Potato Late Blight", percentage: 10, color: "#8E24AA" },
    { name: "Healthy Fields", percentage: 6, color: "#2E7D32" }
  ];

  const data = {
    labels: commonDiseases.map(d => (d.name || '').split(' (')[0]),
    datasets: [
      {
        data: commonDiseases.map(d => d.percentage),
        backgroundColor: commonDiseases.map(d => d.color),
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverOffset: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#263238',
          font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' },
          padding: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#2E7D32',
        bodyColor: '#263238',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}% prevalence`
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
export default RiskDonutChart;
