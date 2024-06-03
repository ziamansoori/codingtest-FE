import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import useToken from '../../utils/useToken';
import Header from '../Header/Header';
import './Dashboard.css';

const Dashboard = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(false);
    const [disable, setDisable] = useState('');
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = useToken();
    const shipping_status = [];
    shipping_status[1] = 'Available';
    shipping_status[2] = 'Shipped';
    shipping_status[3] = 'Delivered'

    useEffect(() => {
        
        axios
          .get(apiUrl+"cars", {
            headers: {
              Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
            }
           })
          .then((res) =>{
            setCars(res.data.data);
            setPages(res.data.pages);
          }
          )
          .catch((err) => {
            setError('There is some Error');
            setTimeout(() => {
                setError(false);
            }, 5000);
          });
    }, []);

    const updateShippingStatus = (car, e) => {
        e.preventDefault();
        setDisable('disable-div');
        const data = {shipping_status: e.target.value}
        //console.log(data);
        axios
          .put(`${apiUrl}cars/${car.id}`, data, {
            headers: {
              Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
            }
           })
          .then((res) =>{
            setDisable('');
          }
          )
          .catch((err) => {
            setError('There is some Error');
            setTimeout(() => {
                setError(false);
            }, 5000);
            setDisable('');
          });

    }

    return (
        <div className="container">
        <Header />
        <div className={disable}>
            <h1>Cars</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th key="make">Make</th>
                        <th key="model">Model</th>
                        <th key="year">Year</th>
                        <th key="vin">VIN</th>
                        <th key="shippingstatus">Shipping Status</th>
                    </tr>
                </thead>
                <tbody>
                    {cars && 
                        cars.map((car) => (
                                <tr>
                                    <td key={car.id+"-make"}>{car.make}</td>
                                    <td key={car.id+"-model"}>{car.model}</td>
                                    <td key={car.id+"-year"}>{car.year}</td>
                                    <td key={car.id+"-vin"}>{car.vin}</td>
                                    <td key={car.id+"-shippingstatus"}>
                                        <Form.Select aria-label="Default select example" 
                                        name="make_id" 
                                        onChange={(e) => updateShippingStatus(car, e)} 
                                        defaultValue={car.shipping_status}
                                        required>
                                            {shipping_status.map((s, k) => {
                                                return (
                                                    <option value={k}>{s}</option>
                                                );
                                            })}
                                        </Form.Select>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>

                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        </div>
    );
}

export default Dashboard;