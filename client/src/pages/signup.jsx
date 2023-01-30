import Typewriter from 'typewriter-effect';
import { Link, useHistory } from 'react-router-dom';
import "./initialPage.css"
import { useRef, useState } from 'react';
import authFetch from '../reusableFunction/authFetch';
import ClipLoader from "react-spinners/ClipLoader"
const Login = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const errTag = useRef()
    const email = useRef()
    const password = useRef()
    const name = useRef()
    const interest = useRef()
    async function signup() {
        setLoading(true)
        const body = { email: email.current.value, password: password.current.value, name: name.current.value, interest: interest.current.value }
        const authRes = await authFetch(body, "signup")
        console.log("it came here", authRes);
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
                <h4 className="text-nowrap">SIGNUP TO VIEW <Typewriter

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
                <input ref={name} className="px-2 py-1" type="text" placeholder="Username" style={{ "width": "100%" }} />
                <input ref={email} className="px-2 py-1" type="email" placeholder="Email" style={{ "width": "100%" }} />
                <input ref={password} className="px-2 py-1" type="text" placeholder="Password" style={{ "width": "100%" }} />
                <select ref={interest} className="form-select" aria-label="Default select example">
                    <option selected>Interest</option>
                    <option value="educational">Educational</option>
                    <option value="technology">Technology</option>
                    <option value="science">Science</option>
                </select>
                <p ref={errTag} className="fs-6" style={{ "color": "red" }}></p>
                <ClipLoader loading={loading} color="rgba(88, 104, 254, 1)" className='pb-3' />
                <Link to={"/login"}>
                    <p href="">Already a user login</p>
                </Link>

                <button type="button" className="btn btn-primary" onClick={signup} style={{ "width": "100%", "backgroundColor": "#5868FE", "fontWeight": "bold" }}>SIGNUP</button>
            </div >
        </div >);
}

export default Login;