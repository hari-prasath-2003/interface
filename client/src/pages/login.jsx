import Typewriter from 'typewriter-effect';
import { Link, useHistory } from 'react-router-dom';
import "./initialPage.css"
import authFetch from '../reusableFunction/authFetch';
import { useState, useRef } from 'react';
import ClipLoader from "react-spinners/ClipLoader"
import PropagateLoader from "react-spinners/PropagateLoader"


const Login = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const errTag = useRef()
    const email = useRef()
    const password = useRef()
    async function login() {
        const body = { email: email.current.value, password: password.current.value }
        setLoading(true)
        const authRes = await authFetch(body, "login")
        if (authRes) {
            if (authRes.msg === "success") {
                history.push("/")
            } else {
                console.log("work");
                console.log(errTag);
                errTag.current.innerHTML = authRes
                setLoading(false)
            }
        }
    }
    return (
        <div className='d-flex h-100 w-100 justify-content-center align-items-center'>


            <div className="d-flex gap-3 flex-column justify-content-center align-items-center" style={{ "width": "300px" }}>
                <h4 className="text-nowrap">LOGIN TO VIEW <Typewriter

                    options={{
                        delay: 250,
                        deleteSpeed: 200
                    }

                    }
                    onInit={(typewriter) => {
                        typewriter
                            .typeString('INTFERF')
                            .pauseFor(500)
                            .deleteChars(4)
                            .typeString('ERFACE')
                            .start()
                            .callFunction(() => {
                                setTimeout(() => {
                                    document.getElementsByClassName("Typewriter__cursor").style += "display:none"
                                    console.log("hi");
                                }, 1000)
                            })

                    }}
                /></h4>
                <input ref={email} required className="px-2 py-1" type="email" placeholder="Email" style={{ "width": "100%" }} />
                <input ref={password} required className="px-2 py-1" type="text" placeholder="Password" style={{ "width": "100%" }} />
                <p ref={errTag} className="fs-6" style={{ "color": "red" }}></p>
                {/* <PropagateLoader color="rgba(88, 104, 254, 1)" className='pb-3' /> */}
                <ClipLoader loading={loading} color="rgba(88, 104, 254, 1)" className='pb-3' />
                <Link to={"/signup"}>
                    <p href="">Not a user Signup</p>
                </Link>
                <button type="button" className="btn btn-primary" onClick={login} style={{ "width": "100%", "backgroundColor": "#5868FE", "fontWeight": "bold" }}>LOGIN</button>
            </div>
        </div>);
}

export default Login;