import React, { useEffect, useState } from "react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from "axios";

export default function Dashboard() {
  const [token] = useState(localStorage.getItem("token"));
  const [data, setData] = useState({
    riders: [],
    totalMoneyEarned: 0,
    totalRides: 0,
    averageRiderRating: null,
    topPaymentChoices: [],
    ridesPerDay: [],
    ridesPerMonth: [],
    ridesPerWeek: [],
    tripStatus: [],
  });
  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://yallanow.runasp.net/api/Dashboard/AdminDashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setData(data);
    } catch (err) {
      console.error(
        "Error fetching dashboard data:",
        err.response ? err.response.data : err
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  // Prepare data for the charts
  const ridesPerDayData = {
    labels: data.ridesPerDay.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Rides Per Day",
        data: data.ridesPerDay.map((item) => item.ridesCount),
        borderColor: "rgba(0, 123, 255, 1)",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const ridesPerMonthData = {
    labels: data.ridesPerMonth.map((item) => `${item.month}/${item.year}`),
    datasets: [
      {
        label: "Rides Per Month",
        data: data.ridesPerMonth.map((item) => item.ridesCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const topPaymentChoicesDataFormatted = {
    labels: data.topPaymentChoices.map((item) => item.paymentMethod),
    datasets: [
      {
        label: "Top Payment Choices",
        data: data.topPaymentChoices.map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const tripStatusData = {
    labels: data.tripStatus.map((item) => item.rides[0]),
    datasets: [
      {
        label: "Trip Status",
        data: data.tripStatus.map((item) => item.ridesCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="users container me-5 px-0 py-3    w-75  mt-5 ">
        <div className="container ms-0 d-flex justify-content-center align-items-center py-3 users w-25  bg-white  mt-5 shadow-sm rounded-3">
          <div className="d-flex justify-content-between align-items-center px-4">
            <div className="mx-4">
              <h3 >{data.totalRides} </h3>
            </div>
            <div>
              <p>ToTal rides</p>
              <h6>Rides number</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="users">
        <div className="container d-flex justify-content-center align-items-center py-4 users w-75 me-5 bg-white  mt-5 shadow-sm rounded-3">
          {" "}
          <div className="row">
            {/* Rides Per Day Line Chart */}
            <div className="col-md-6 mb-4">
              <div className="dataCard bg-white p-3 shadow-sm rounded-3 bg-gradient-custom">
                <Line
                  data={ridesPerDayData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Rides Per Day",
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Rides Per Month Bar Chart */}
            <div className="col-md-6 mb-4">
              <div className="dataCard bg-white p-3 shadow-sm rounded-3 bg-gradient-custom">
                <Bar
                  data={ridesPerMonthData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Rides Per Month",
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
            {/* Top Payment Choices Doughnut Chart */}
            <div className="col-md-4">
              <div className="dataCard bg-white p-3 shadow-sm rounded-1 bg-gradient-custom">
                <Doughnut
                  data={topPaymentChoicesDataFormatted}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Top Payment Choices",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Trip Status Bar Chart */}
            <div className="col-md-8 mb-4">
              <div className="dataCard bg-white p-3 shadow-sm rounded-3 bg-gradient-custom">
                <Bar
                  data={tripStatusData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Trip Status",
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
