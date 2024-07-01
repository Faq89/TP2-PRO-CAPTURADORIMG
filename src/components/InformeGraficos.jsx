import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './InformeGrafico.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InformesGrafico = () => {
  const [facturas, setFacturas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3001/api/facturas");
        setFacturas(response.data);
      } catch (error) {
        console.error("Error al obtener las facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  useEffect(() => {
    const comprasFacturas = facturas.filter(factura => factura.tipoOperacion === "compra");
    const ventasFacturas = facturas.filter(factura => factura.tipoOperacion === "venta");

    setCompras(comprasFacturas);
    setVentas(ventasFacturas);

    const totalCompras = comprasFacturas.reduce((acc, factura) => acc + factura.importeTotal, 0);
    const totalVentas = ventasFacturas.reduce((acc, factura) => acc + factura.importeTotal, 0);

    setTotalCompras(totalCompras);
    setTotalVentas(totalVentas);
  }, [facturas]);

  const data = {
    labels: ['Compras', 'Ventas'],
    datasets: [
      {
        label: 'Importes Totales',
        data: [totalCompras, totalVentas],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
      title: {
        display: true,
        text: 'Importes Totales de Compras y Ventas',
      },
    },
  };

  return (
    <div className="MenuConteiner">
      <h2>Informes de datos y Gráficos</h2>
      <div style={{ width: '800px', height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
      <div>
        <p>Total Facturas Cargadas: {facturas.length}</p>
        <p>Total Facturas Compras: {compras.length}</p>
        <p>Total Facturas Ventas: {ventas.length}</p>
        <p>Total Importe Compras: ${totalCompras.toFixed(2)}</p>
        <p>Total Importe Ventas: ${totalVentas.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InformesGrafico;
