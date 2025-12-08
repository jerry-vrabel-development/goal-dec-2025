import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, BarController, LineController } from 'chart.js';
import './App.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface Application {
  Company: string;
  Position: string;
  "Date Applied": string;
  Status: string;
  Notes: string;
}

const App: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const barChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<ChartJS | null>(null);
  const lineChartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Import the data directly
        const data = await import('../src/assets/data.json');
        // Make sure we're setting the correct data type
        setApplications(data.default as Application[]);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load applications data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (applications.length > 0 && barChartRef.current && lineChartRef.current) {
      // Destroy existing charts if they exist
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      // Create bar chart
      const barCtx = barChartRef.current.getContext('2d');
      if (barCtx) {
        barChartInstance.current = new ChartJS(barCtx, {
          type: 'bar',
          data: {
            labels: ['Submitted', 'Response Received', 'Interview Scheduled'],
            datasets: [{
              label: 'Applications by Status',
              data: [
                applications.filter(app => app.Status === 'Submitted').length,
                applications.filter(app => app.Status === 'Response Received').length,
                applications.filter(app => app.Status === 'Interview Scheduled').length
              ],
              backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800'
              ]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }

      // Create line chart
      const lineCtx = lineChartRef.current.getContext('2d');
      if (lineCtx) {
        // Group applications by date for line chart
        const dateCounts: Record<string, number> = {};
        applications.forEach(app => {
          const date = app["Date Applied"];
          dateCounts[date] = (dateCounts[date] || 0) + 1;
        });

        const sortedDates = Object.keys(dateCounts).sort();
        const dateValues = sortedDates.map(date => dateCounts[date]);

        lineChartInstance.current = new ChartJS(lineCtx, {
          type: 'line',
          data: {
            labels: sortedDates,
            datasets: [{
              label: 'Applications Over Time',
              data: dateValues,
              fill: false,
              borderColor: '#4BC0C0',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }, [applications]); // Only depend on applications data

  const filteredApplications = applications.filter(app => {
    const companyMatch = companyFilter ? app.Company.toLowerCase().includes(companyFilter.toLowerCase()) : true;
    const statusMatch = statusFilter ? app.Status.toLowerCase().includes(statusFilter.toLowerCase()) : true;
    return companyMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="app-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
      </header>

      <main className="app-main">
        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Filter by company..."
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <input
              type="text"
              placeholder="Filter by status..."
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p>{applications.length}</p>
          </div>
          <div className="stat-card">
            <h3>Submitted</h3>
            <p>{applications.filter(app => app.Status === 'Submitted').length}</p>
          </div>
          <div className="stat-card">
            <h3>Response Received</h3>
            <p>{applications.filter(app => app.Status === 'Response Received').length}</p>
          </div>
          <div className="stat-card">
            <h3>Interview Scheduled</h3>
            <p>{applications.filter(app => app.Status === 'Interview Scheduled').length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>Applications by Status</h3>
            <canvas ref={barChartRef} />
          </div>
          <div className="chart-card">
            <h3>Applications Over Time</h3>
            <canvas ref={lineChartRef} />
          </div>
        </div>

        {/* Applications Table */}
        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr key={index}>
                  <td>{app.Company}</td>
                  <td>{app.Position}</td>
                  <td>{app.Status}</td>
                  <td>{app["Date Applied"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
