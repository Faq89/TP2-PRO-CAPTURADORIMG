import React, { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [filteredData, setFilteredData] = useState({});
    const [tipoOperacion, setTipoOperacion] = useState('Compra');
    const [showFilteredData, setShowFilteredData] = useState(false);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleTipoOperacionChange = (event) => {
        setTipoOperacion(event.target.value);
    };

    const analyzeImage = async () => {
        if (!image) {
            alert("Por favor, selecciona una imagen");
            return;
        }

        const subscriptionKey = 'ef2e30c734e24e5995561b165c46c5a0';
        const endpoint = 'https://appfacturas.cognitiveservices.azure.com/';
        const uriBase = endpoint + 'vision/v3.0/ocr';

        const formData = new FormData();
        formData.append('image', image);

        const requestData = {
            language: 'es',
            detectOrientation: true
        };

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            params: requestData
        };

        try {
            const response = await axios.post(uriBase, formData, config);
            const extractedText = response.data.regions.map(region =>
                region.lines.map(line =>
                    line.words.map(word => word.text).join(' ')
                ).join('\n')
            ).join('\n');
            setText(extractedText);
            extractFacturaData(extractedText);
        } catch (error) {
            console.error('Error al analizar imagen: ', error);
            alert('Error al analizar imagen. Intente de nuevo más tarde');
        }
    };

    const extractFacturaData = (text) => {
        const extractField = (regex, defaultValue = '') => regex.exec(text)?.[1] || defaultValue;

        const razonSocial = extractField(/Razón Social: (.+)/);
        const cuit = extractField(/CUIT[:\s]+(\d{2}-\d{8}-\d{1}|\d{11})/);

        // Capturar la fecha precedida por "Fecha de Emisión"
        const fechaEmisionRegex = /Fecha de Emisión[:\s]+(\d{2}\/\d{2}\/\d{4})/;
        const fechaEmision = extractField(fechaEmisionRegex);

        let fechaFacturacion = null;
        if (fechaEmision) {
            const [day, month, year] = fechaEmision.split('/');
            fechaFacturacion = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0]; // Convertir a YYYY-MM-DD
        }

        const puntoVenta = extractField(/Punto de Venta: (\d+)/);

        // Extraer el número de comprobante de 8 caracteres numéricos consecutivos
        let numeroComprobante = '';
        const numeroComprobanteRegex = /\b(\d{8})\b/;
        const numeroComprobanteMatch = numeroComprobanteRegex.exec(text);
        if (numeroComprobanteMatch) {
            numeroComprobante = numeroComprobanteMatch[1];
        }

        // Extraer los importes
        const importeRegex = /([\d.]+,\d{2})/g;
        const importes = Array.from(text.matchAll(importeRegex)).map(match => parseFloat(match[1].replace(/\./g, '').replace(',', '.')));

        const importeTotal = Math.max(...importes);
        const importeTotalNeto = importeTotal / 1.21; // Dividir por 1.21 para obtener el importe total neto
        const iva = importeTotal - importeTotalNeto; // Calcular el IVA restando el importe total menos el importe total neto

        const data = {
            tipoOperacion,
            razonSocial,
            cuit,
            tipoFactura: 'A', // Forzamos que el tipo de factura sea siempre "A"
            fechaFacturacion,
            puntoVenta,
            numeroComprobante,
            importeTotalNeto: parseFloat(importeTotalNeto.toFixed(2)),
            iva: parseFloat(iva.toFixed(2)),
            importeTotal: parseFloat(importeTotal.toFixed(2))
        };

        setFilteredData(data);
        setShowFilteredData(true); // Mostrar los datos filtrados
    };

    const handleGuardarEnBaseDeDatos = async () => {
        try {
            // Realizar la solicitud POST a la API para guardar los datos
            await axios.post('http://127.0.0.1:3001/api/facturas', filteredData);
            alert('Datos guardados en la base de datos correctamente');
        } catch (error) {
            console.error('Error al guardar en la base de datos: ', error);
            alert('Error al guardar en la base de datos. Intente nuevamente más tarde');
        }
    };

    const downloadFilteredData = () => {
        if (Object.keys(filteredData).length > 0) {
            const textData = `Tipo de Operación: ${filteredData.tipoOperacion}\n` +
                             `Razón Social: ${filteredData.razonSocial}\n` +
                             `CUIT: ${filteredData.cuit}\n` +
                             `Tipo de Factura: ${filteredData.tipoFactura}\n` +
                             `Fecha de Facturación: ${filteredData.fechaFacturacion}\n` +
                             `Punto de Venta: ${filteredData.puntoVenta}\n` +
                             `Número de Comprobante: ${filteredData.numeroComprobante}\n` +
                             `Importe Total Neto: ${filteredData.importeTotalNeto}\n` +
                             `IVA: ${filteredData.iva}\n` +
                             `Importe Total: ${filteredData.importeTotal}`;

            const blob = new Blob([textData], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'factura_filtrada.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('No hay datos filtrados para descargar');
        }
    };

    return (
        <div className="container">
            <input type="file" accept="image/jpeg, image/png" onChange={handleImageUpload} />
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="image" />}
            <div>
                <label>Tipo de Operación:</label>
                <select value={tipoOperacion} onChange={handleTipoOperacionChange}>
                    <option value="Compra">Compra</option>
                    <option value="Venta">Venta</option>
                </select>
            </div>
            <button onClick={analyzeImage}>Analizar imagen</button>
            {text && !showFilteredData && (
                <pre className="text">{text}</pre>
            )}
            {text && showFilteredData && (
                <pre className="text">{JSON.stringify(filteredData, null, 2)}</pre>
            )}
            <div className="filteredData">
                <h3>Datos Filtrados de la Factura</h3>
                {Object.keys(filteredData).length > 0 ? (
                    <button onClick={handleGuardarEnBaseDeDatos}>Guardar en base de datos</button>
                ) : (
                    <p>Analiza una imagen para ver los datos filtrados</p>
                )}
                {Object.keys(filteredData).length > 0 && (
                    <button onClick={downloadFilteredData}>Descargar datos filtrados en TXT</button>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
