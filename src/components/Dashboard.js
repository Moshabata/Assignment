import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Dashboard() {
    const [data, setData] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:5000/api/dashboard")
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error("Network error:", err);
                alert("Failed to load dashboard data. Please check the server.");
            });
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const imageRotation = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % data.length);
            }, 3000);
            return () => clearInterval(imageRotation);
        }
    }, [data]);

    const chartData = {
        labels: data.map((product) => product.name),
        datasets: [
            {
                label: "Current Stock",
                data: data.map((product) => product.quantity),
                backgroundColor: "rgba(75,192,192,0.4)"
            }
        ]
    };

    return (
        <div className="bar">
            <h2>Dashboard</h2>
            <Bar data={chartData} />

            {data.length > 0 && (
                <div className="bar">
                    <img
                        src={data[currentImage].image || "/images/th(1).jpeg"}
                        alt={data[currentImage].name || "Product Image"}
                        style={{ width: "100px", height: "100px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default Dashboard;
