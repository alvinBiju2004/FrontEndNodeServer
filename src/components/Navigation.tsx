import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-xl font-bold hover:text-blue-400">
            User Management
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Users
            </Link>
            <Link
              to="/create"
              className={`px-4 py-2 rounded-md transition-colors ${
                location.pathname === '/create'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;