// components/EditUser.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService,} from '../services/userService';
import UserForm from './UserForm';
import type { User,} from '../services/userService';


const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setFetchLoading(true);
      const users = await userService.getUsers();
      const foundUser = users.find(u => u.id === Number(id));
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Failed to fetch user');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (userData: { name: string; email: string }) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await userService.updateUser(Number(id), userData);
      navigate('/');
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading user...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Users
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
        <p className="text-red-700 mb-4">User not found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <UserForm
        title="Edit User"
        initialData={{ name: user.name, email: user.email }}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Update User"
      />
    </div>
  );
};

export default EditUser;