import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  logInWithFacebook,
  logInWithGithub,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div className="row d-flex justify-content-center align-items-center h-90">
         
          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">

            <div className="card bg-dark">
              <div className="card-body px-4 py-5 px-md-5">
                <form>
                  <div className="row">
                    <div className="form-outline mb-4 ">
                      <div className="form-outline">
                        <input type="text" id="form3Example1" className="form-control text-white bg-dark" placeholder='Full name'
                          value={name}
                          onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="email" id="form3Example3"
                      className="form-control text-white bg-dark" placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="form3Example4"
                      className="form-control bg-dark text-white" placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-outline-light btn" type="submit" onClick={register}>Register</button>
                  </div>
                  <div className="text-center">
                    <p>or sign up with:</p>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white icon" onClick={logInWithFacebook}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                      <a href="#!" className="text-white icon" onClick={logInWithGithub}><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                      <a href="#!" className="text-white icon" onClick={signInWithGoogle}><FontAwesomeIcon icon={faGoogle} size="2x" /></a>
                    </div>

                    <p className="small mb-5 pb-lg-2 text-white m-5">Already have an account? <Link className="text-white-50 fw-bold" to="/">Login</Link> now.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;