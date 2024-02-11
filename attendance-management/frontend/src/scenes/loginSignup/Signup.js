import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {

    
  const [values, setValues] =useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

    const handleInput = (event) =>{
        setValues((prev) => ({...prev, [event.target.name]: [event.target.value]}))
    }
  const handleSubmit=(event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if(errors.name === "" && errors.email === "" && errors.password === "" && errors.role === ""){
        axios.post('http://localhost:8081/signup', values)
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-dark'><strong>Sign Up</strong></h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-3 text-dark'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type="text" placeholder='Enter Name' name='name'
                onChange = {handleInput} className='form-control rounded-0'/>
                {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>
            <div className='mb-3 text-dark'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='email'
                 onChange = {handleInput} className='form-control rounded-0'/>
                 {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

            <div className='mb-3 text-dark'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='password'
                 onChange = {handleInput}className='form-control rounded-0'/>
                 {errors.password && <span className='text-danger'>{errors.password}</span>}
             </div>
             <div className='mb-3 text-dark'>
              <label htmlFor="role">
                <strong>Select Role</strong>
              </label>
             <div>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={values.role === 'admin'}
                  onChange={handleInput}
                />
                Admin
              </label>
              <label className="ml-2">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={values.role === 'employee'}
                  onChange={handleInput}
                />
                Employee
              </label>
            </div>
            </div>
            <button type= 'submit' className='btn btn-success w-100 '><strong>Sign Up</strong></button>
            <p></p>
            <Link to="/" className='btn btn-default border w-100 bg-light text-dark'>Login</Link>
            {/* <button className='btn btn-default border w-100 bg-light'>Create Account</button> */}
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
