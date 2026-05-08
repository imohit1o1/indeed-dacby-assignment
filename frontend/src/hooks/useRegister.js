import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const initialFormData = {
    username: '',
    password: '',
    confirmPassword: '',
};

const validateRegisterForm = ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

    return '';
};

export const useRegister = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
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

        const validationError = validateRegisterForm(formData);

        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        const result = await register(formData.username, formData.password);

        if (result.success) {
            navigate('/stories');
        } else {
            setError(result.error);
        }

        setLoading(false);
    }, [formData, navigate, register]);

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
