import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [auth, setAuth] = useState<'signin' | 'signup'>('signin');

  const changeAuth = (auth: 'signin' | 'signup') => {
    setAuth(auth);
  };

  return (
    <div className='bg-[#EAEAEA] min-h-screen justify-center items-center flex'>
      <div className='py-4 px-4 w-full sm:w-xl'>
        <div className='flex items-center gap-4 mb-6 justify-center'>
          <img src='/icon.svg' alt='logo' className='size-8 rounded-md' />
          <div>
            <div className='font-semibold text-base'>Delivery Admin</div>
            <div className='text-[10px] text-gray-500'>Local Delivery Platform</div>
          </div>
        </div>

        <div className='border shadow-sm rounded-md border-gray-300 py-4 px-4'>
          {auth === 'signin' && <SignInAuth handleChangeAuth={changeAuth} />}
          {auth === 'signup' && <SignUpAuth handleChangeAuth={changeAuth} />}
        </div>
      </div>
    </div>
  );
}

interface signinValueInterface {
  username: string;
  password: string;
}

function SignInAuth({
  handleChangeAuth,
}: {
  handleChangeAuth: (value: 'signin' | 'signup') => void;
}) {
  const navigate = useNavigate();

  const [signinValue, setSigninValue] = useState<signinValueInterface>({
    username: '',
    password: '',
  });

  const handleSignin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!signinValue.username || !signinValue.password) {
      toast.info('Missing credentials');
      return;
    }

    toast.success('Signin Successfully');

    navigate('/');
  };

  const handleValueChange = (key: string, value: string) => {
    setSigninValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <>
      <div className='text-base font-semibold'>Welcome Back</div>
      <div className='text-xs text-gray-500 mb-6'>Sign in to access the admin dashboard</div>
      <form className='space-y-4 mb-4'>
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-sm mb-1 text-neutral-700'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={signinValue.username}
            autoComplete='off'
            placeholder='Enter your username'
            onChange={(e) => handleValueChange('username', e.target.value)}
            className='input min-h-11 w-full focus:ring focus:ring-indigo-400 focus:border-indigo-400 border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
          />
        </div>

        <div>
          <label htmlFor='password' className='text-sm mb-1 text-neutral-700'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter your password'
            value={signinValue.password}
            onChange={(e) => handleValueChange('password', e.target.value)}
            autoComplete='off'
            className='input min-h-11 w-full focus:ring focus:ring-indigo-400 focus:border-indigo-400 border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
          />
        </div>

        <button
          type='submit'
          onClick={handleSignin}
          className='btn min-h-11 px-4 py-2 rounded-md bg-blue-900 w-full text-white hover:opacity-80'
        >
          Sign In
        </button>
      </form>

      <div className='text-gray-500 text-xs text-center'>
        Don't have an account?{' '}
        <button className='text-blue-900' onClick={() => handleChangeAuth('signup')}>
          Register
        </button>
      </div>
    </>
  );
}

function SignUpAuth({
  handleChangeAuth,
}: {
  handleChangeAuth: (value: 'signin' | 'signup') => void;
}) {
  const [checked, setChecked] = useState(false);

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    toast.info('User already registered');
  };
  return (
    <>
      <div className='text-base font-semibold'>Create Account</div>
      <div className='text-xs text-gray-500 mb-6'>Register a new admin account</div>
      <form className='space-y-4 mb-4'>
        <div className='flex flex-col'>
          <label htmlFor='reg-username' className='text-sm mb-1 text-neutral-700'>
            Username
          </label>
          <input
            type='text'
            id='reg-username'
            name='username'
            placeholder='Enter your username'
            className='input min-h-11 w-full focus:ring focus:ring-indigo-400 focus:border-indigo-400 border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
          />
        </div>

        <div>
          <label htmlFor='reg-password' className='text-sm mb-1 text-neutral-700'>
            Password
          </label>
          <input
            type='password'
            id='reg-password'
            name='password'
            placeholder='Enter your password'
            className='input min-h-11 w-full focus:ring focus:ring-indigo-400 focus:border-indigo-400 border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
          />
        </div>

        <div className='flex justify-center'>
          <label className='inline-flex items-center gap-2 min-h-11 cursor-pointer select-none'>
            <input
              type='checkbox'
              className='sr-only peer'
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <div className='w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-colors duration-150 peer-checked:bg-blue-500 peer-checked:border-blue-500'>
              <svg
                className='w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <span className='text-xs text-gray-700'>
              I agree to the User Agreement and Privacy Policy
            </span>
          </label>
        </div>

        <button
          type='submit'
          onClick={handleCreate}
          className='btn min-h-11 px-4 py-2 rounded-md bg-blue-900 w-full text-white hover:opacity-80'
        >
          Create Account
        </button>
      </form>

      <div className='text-gray-500 text-xs text-center'>
        Already have an account?{' '}
        <button className='text-blue-900' onClick={() => handleChangeAuth('signin')}>
          Signin
        </button>
      </div>
    </>
  );
}
