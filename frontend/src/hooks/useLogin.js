import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const initialFormData = {
    username: '',
    password: '',
};

export const useLogin = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        setFormData(previousFormData => ({
            ...previousFormData,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.username, formData.password);

        if (result.success) {
            navigate('/stories');
        } else {
            setError(result.error);
        }

        setLoading(false);
    }, [formData.password, formData.username, login, navigate]);

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
