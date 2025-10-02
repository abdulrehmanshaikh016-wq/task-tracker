import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register components globally
Chart.register(
  BarController,
  CategoryScale, // This is the 'category' scale
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);