import React from "react"
import { Navigate } from "react-router-dom"
import { CardBody, Card, CardTitle, Input, Button } from "reactstrap"


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            emailId: "",
            password: "",
            user: ""
        }
    }
    componentDidMount() {
        const user = localStorage.getItem("IDNumber")
        this.setState({ user: user })
    }
    render() {
        const onChange = event => {
            const { value, name } = event.target
            this.setState({ [name]: value })
        }

        const onSubmit = () => {
            if (this.state.emailId === "prep-admin@hyderabad.bits-pilani.ac.in" && this.state.password === "PrepAdmin@2022") {
                localStorage.setItem("IDNumber", "ADMINPS0000H")
                window.location.reload()
            }
        }
        if (this.state.user)
            return <Navigate to="/" />
        else return (
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", margin: "10px" }}>
                <Card style={{ width: "300px" }}>
                    <CardBody>
                        <CardTitle tag="h4">
                            LOGIN
                        </CardTitle>
                        <Input onChange={onChange} placeholder="Enter admin email id" name="emailId" value={this.state.emailId} style={{ marginBottom: "10px" }} type="email" />
                        <Input onChange={onChange} placeholder="Enter admin password" name="password" value={this.state.password} style={{ marginBottom: "10px" }} type="password" />
                        <Button onClick={onSubmit} id="login" color="success">
                            LOGIN
                        </Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default Login