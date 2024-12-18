import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from 'state/auth/auth';

const Login = () => {
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState( "");
    const [password, setPassword] = useState("");
  
    const { isLoggingIn } = useSelector((state) => state.auth);
    
    const handleLogin = (e) => {
      e.preventDefault();
      dispatch(login({ email, password }));
    }
    // console.log(user)
  return (
    <div>
        
<div className=" flex items-center justify-center mx-auto min-h-screen">
  <section className="rounded-md p-2 bg-white">
  <h2 className="text-2xl text-black font-bold text-center py-6 leading-tight">
          Sign In Here
        </h2>
    <div className="flex items-center w-[35rem] justify-center my-3">
      <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
        <div className="mb-2"></div>
        
        <Link to={'/signup'}>
        <p className="mt-2 text-base text-gray-600">
          Don't have an account? <span className='text-blue-400 cursor-pointer'>Sign Up</span>
        </p>
        </Link> 
        <form className="mt-5" onSubmit={handleLogin}>
          <div className="space-y-4">
  
            <div>
              <label className="text-base font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name="email"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="flex h-10 w-full text-black rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name="password"
                />
              </div>

            </div>
            <div>
              <button
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                type="submit"
              >
                 {isLoggingIn ? "Sign In..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>

    </div>
  )
}

export default Login