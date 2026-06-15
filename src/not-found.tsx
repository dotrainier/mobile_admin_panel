import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-6xl font-bold text-gray-800'>404</h1>
      <p className='text-gray-500'>Page not found</p>
      <button
        onClick={() => navigate('/dashboard')}
        className='px-4 py-2 bg-blue-600 text-white rounded-lg'
      >
        Go back home
      </button>
    </div>
  );
}

export default NotFound;
