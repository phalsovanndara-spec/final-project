import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StaffList from '../../Data/StaffList';

const Login = ({ setCurrentUser }) => {
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();
  // const [inputEmail, setInputmail]= useState("");

  // បើ Login រួចហើយ ពេលបើកទំព័រ Login មក ឱ្យ Auto Redirect ទៅតាម Role តែម្តង
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.role === "STAFF") {
        navigate('/admin', { replace: true });
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const isStaff = StaffList.some(
      (staff) => staff.fullName.toLowerCase().trim() === inputName.toLowerCase().trim()
    );

    const userLoginData = {
      fullName: inputName,
      role: isStaff ? "STAFF" : "CUSTOMER"
    };

    setCurrentUser(userLoginData);
    localStorage.setItem('user', JSON.stringify(userLoginData));

    if (isStaff) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: "800px",height:"400px",margin: "50px auto", display:"flex",}} className='shadow drop-shadow-amber-50'>
      <div style={{ backgroundColor:"",maxWidth:"500px",height:"100%",padding:"20px",marginTop:"50px"}}>
        <h2 style={{fontSize:"30px", textAlign:"center",color:"red"}}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name:</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter full name (e.g. vin va)"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Enter Your Password "
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px 20px", borderRadius:"10px",width:"100%",color:"white"}}
          className='shadow bg-red-600 hover:bg-red-500'
          >Login</button>
          <p style={{textAlign:"center"}}>Don't have account!! <a style={{color:"blue"}} href="">Sign in account?</a></p>
        </form>
      </div>
      <div style={{backgroundColor:"red",height:"100%", width:"300px",color:"white"}}>
        <p style={{fontSize:"30px",display:"flex",justifyContent:"center",marginTop:"130px"}}>Welcome!!</p>
        <p style={{display:"flex",justifyContent:"center",textAlign:"center"}}>Welcome back to your shop guys<br />
          have a good day!!!
        </p>
      </div>
    </div>
  );
};

export default Login;