import React from 'react'
import { auth } from '../config/firebase'

const Login = () => {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')

    const handleOnLog = async (e) => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email,password)
        } catch (error) {
            console.log(error)
        }
    }

    const formList = (
        <form>
            <div className="mb-3">
                <input 
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                />
            </div>
            <div className="mb-4">
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                />
            </div>
            <div>
                <button 
                    type="submit"
                    className="btn border-0 bg-dark text-light w-100"
                    onClick={handleOnLog}
                >
                    Sign in
                </button>
            </div>
        </form>
    )

    return (
        <div 
            className="position-absolute"
            style={{
                left: 0,
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)'
            }}
        >
            <div className="col-12 col-sm-10 col-md-3 mx-auto">
                {formList}
            </div>
        </div>
    )
}

export default Login
