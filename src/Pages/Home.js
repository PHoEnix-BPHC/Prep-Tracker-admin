import React from "react"
import Prep from "../Assets/Prep.jpg"

class Home extends React.Component {
    render() {
        return (
            <div>
                <div style={{ margin: "50px 10px 50px 20px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <img style={{ width: "300px", height: "80%", alignSelf: "center", marginBottom: "20px" }} src={Prep} alt="Preparation" />
                    <div style={{ textAlign: "center" }}>
                        ADMIN BOARD FOR PREPTRACKER
                    </div>
                </div>
            </div>
        )
    }
}

export default Home