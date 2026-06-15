import { useState } from 'react';
import CircleCheckbox from '../components/ui/CircleCheckbox';
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
          <div className='aspect-square size-8 rounded-md bg-blue-900 text-white p-1'>
            <TruckIcon />
          </div>
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

  const handleSignin = (e: React.FormEvent) => {
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
            className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm outline-indigo-400'
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
            className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm outline-indigo-400'
          />
        </div>

        <button
          type='submit'
          onClick={handleSignin}
          className='px-4 py-2 rounded-md bg-blue-900 w-full text-white hover:opacity-80'
        >
          {' '}
          Sign In{' '}
        </button>
      </form>

      <div className='text-gray-500 text-xs text-center'>
        Don't have an account?{' '}
        <span>
          {' '}
          <button className='text-blue-900' onClick={() => handleChangeAuth('signup')}>
            Register
          </button>
        </span>
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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('User already registered');
  };
  return (
    <>
      <div className='text-base font-semibold'>Create Account</div>
      <div className='text-xs text-gray-500 mb-6'>Register a new admin account</div>
      <form className='space-y-4 mb-4'>
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-sm mb-1 text-neutral-700'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter your username'
            className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
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
            className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm'
          />
        </div>

        <div className='flex justify-center'>
          <CircleCheckbox
            checked={checked}
            onChange={() => setChecked(!checked)}
            label='I agree to the User Agreement and Privacy Policy'
          />
        </div>

        <button
          type='submit'
          onClick={handleCreate}
          className='px-4 py-2 rounded-md bg-blue-900 w-full text-white hover:opacity-80'
        >
          {' '}
          Create Account{' '}
        </button>
      </form>

      <div className='text-gray-500 text-xs text-center'>
        Already have an account?{' '}
        <span>
          {' '}
          <button className='text-blue-900' onClick={() => handleChangeAuth('signin')}>
            Signin
          </button>
        </span>
      </div>
    </>
  );
}

function TruckIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <g fill='none'>
        <path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'></path>
        <path
          fill='currentColor'
          d='M15 4a2 2 0 0 1 2 2v1h1.52a2 2 0 0 1 1.561.75l1.48 1.851a2 2 0 0 1 .439 1.25V15a2 2 0 0 1-2 2a3 3 0 1 1-6 0h-4a3 3 0 1 1-6 0a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2M15 6H4v9h.764a2.997 2.997 0 0 1 4.341-.138l.131.138h5.528l.115-.121l.121-.115zm3.52 3H17v5c.82 0 1.563.33 2.105.862l.131.138H20v-4.15z'
        ></path>
      </g>
    </svg>
  );
}
