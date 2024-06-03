import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
const Logout = () => {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        return navigate('/login', { replace: true });
    }, []);
    
}

export default Logout