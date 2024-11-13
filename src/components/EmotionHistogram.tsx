import { Bar } from 'react-chartjs-2';

//Importing data visualization elements to build the bar graph
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required elements for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Takes a array of frequencies for each emotion
// The array has size equal to the amount of emotions
// The value at each index is the count for each emotion
// EmotionHistogram is called at AnalysisCard.tsx
interface EmotionHistogramProps {
  freqArray: number[];
}

const EmotionHistogram: React.FC<EmotionHistogramProps> = ({ freqArray }) => {
  const data = {
    labels: ['Angry', 'Sad', 'Happy', 'Curious', 'Sick', 'Love'],
    datasets: [
      {
        data: freqArray,  // Corresponding counts for each label
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',  // Color for 'Happy'
          'rgba(147, 51, 234, 0.7)',  // Color for 'Sad'
          'rgba(147, 51, 234, 0.7)',  // Color for 'Angry'
          'rgba(147, 51, 234, 0.7)'  // Color for 'Tired'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default EmotionHistogram;
