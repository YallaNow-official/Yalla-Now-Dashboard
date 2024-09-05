import React, { useEffect, useState } from 'react'

import {Chart as ChartJs } from "chart.js/auto"
import {Bar , Doughnout ,Line } from "react-chartjs-2"
import revenueData from "../../../src/data/revenueData.json";
import sourceData from "../../../src/data/sourceData.json";
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

export default function Dashboard() {
  const [token] = useState(localStorage.getItem("token"));
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    setLoading(true);
    try {
      const  {data} = await axios.get(
        'https://yallanow.runasp.net/api/Dashboard/AdminDashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      
      setRevenue(data || []);
    } catch (err) {
      console.error('Error fetching rider data:', err.response ? err.response.data : err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchDashboard();
  }, [token]);
  return (
    <>
    <div className='w-75 ms-auto mt-5 py-3'>
    <div className="dataCard d-flex justify-content-center revenueCard container bg-white w-75 mt-5 me-auto p-3 shadow-sm rounded-3 bg-gradient-custom">
      <Line 
        data={{
          labels: revenueData.map((data) => data.label),
          datasets: [
            {
              label: "Revenue",
              data: revenueData.map((data) => data.revenue),
              borderColor: 'rgba(0, 123, 255, 1)',
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // Set the same color as borderColor for the gradient effect
              borderWidth: 1,
              fill: true,
            },
          ],
        }}
        options={{
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Monthly Revenue",
            },
          },
        }}
      
      />
 
  
    </div>
  </div>
 
    </>
  )
}
