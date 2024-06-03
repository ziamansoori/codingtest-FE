import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import useToken from '../../utils/useToken';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [carMake, setCarMake] = useState([]);
    const [error, setError] = useState(false);
    const [yearOption, setYearOption] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = useToken();
    let navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`${apiUrl}cars-make`, {
            headers: {
              Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
            }
           })
          .then((res) =>{
            setCarMake(res.data);
          }
          )
          .catch((err) => {
            setError('There is some Error');
            setTimeout(() => {
                setError(false);
            }, 5000);
          });

          let years = [];
          const time = new Date();
          for(let i=time.getFullYear(); i>=1990; i--)
            {
                years.push(i);
            }
            setYearOption(years);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {make_id: make, model: model, year: year, vin: vin};
        axios
          .post(`${apiUrl}cars`, data, {
            headers: {
              Authorization: 'Bearer ' + token.token //the token is a variable which holds the token
            }
           })
          .then((res) =>{
            console.log(res);
            navigate('/', { replace: true});
          }
          )
          .catch((err) => {
            setError('Invalid User Name or Password');
            setTimeout(() => {
                setError(false);
            }, 5000);
          });
    }

    return (
        <div className="mx-auto login-box">
            <h1>Add New Car</h1>
            {error && <Alert key='warning' variant='warning'>
                    {error}
            </Alert> }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Make</Form.Label>
                    <Form.Select aria-label="Default select example" name="make_id" onChange={(e) => {setMake(e.target.value); console.log(e.target.value)}} required>
                        {carMake.map((cm) => {
                            return (
                                <option value={cm.id}>{cm.title}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(e) => setModel(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Year</Form.Label>
                    <Form.Select aria-label="Default select example" name="year" onChange={(e) => setYear(e.target.value)}>
                        {yearOption.map((y) => {
                               return( <option value={y}>{y}</option> );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>VIN</Form.Label>
                    <Form.Control type="text" placeholder="" onChange={(e) => setVin(e.target.value)} required maxLength={17} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddCar