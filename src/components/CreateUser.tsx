// components/CreateUser.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import UserForm from './UserForm';

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (userData: { name: string; email: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.createUser(userData);
      navigate('/');
    } catch (err) {
      setError('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <UserForm
        title="Create New User"
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Create User"
      />
    </div>
  );
};

export default CreateUser;