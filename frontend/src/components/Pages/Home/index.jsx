// import React,{useState,useCallback} from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./iindex.css"

// const HomePg=()=>{

//     const [value,setValue]=useState();
//     const navigate=useNavigate();

//     const handleJoinRoom= useCallback(()=>{
//        navigate(`/room/${value}`)
//     },[navigate,value])
//     return(
//         <>
//         <div class="home">
//             <h2>Enter the meet code here</h2>
//             <input value={value} onChange={(e)=> setValue(e.target.value)} type="text" placeholder='Enter room code' ></input>
//             <button onClick={handleJoinRoom}>JOIN</button>
//             {/* <script src="//code.tidio.co/djq8ocmg9gcwijajwpnbhb5zr61lvmj8.js" async></script> */}
//         </div>
//         </>
//     );
// }
// export default HomePg;
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './iindex.css'; // Import your custom CSS

const HomePg = () => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`);
    }, [navigate, value]);

    return (
        <div className="home-container">
            <div className="home-card">
                <h2 className="home-heading">Enter the meet code here</h2>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    className="home-input"
                    placeholder="Enter room code"
                />
                <button
                    onClick={handleJoinRoom}
                    className="home-button"
                >
                    JOIN
                </button>
            </div>
        </div>
    );
};

export default HomePg;
