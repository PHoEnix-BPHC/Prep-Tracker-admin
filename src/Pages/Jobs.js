import React from "react"
import { Button, Card, Alert, CardBody, CardTitle, CardSubtitle, Badge } from "reactstrap"
import { firestore } from "../config"
import Moment from "react-moment"

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            allJobs: []
        }
    }
    componentDidMount() {
        firestore.collection("jobs").where("isVerified", "==", false).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                const obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
            })
            this.setState({ allJobs: temp }, () => { console.log(this.state.allJobs) })
        }).catch(() => {

        })
    }
    render() {
        const verifySubmit = (eachJob) => {
            firestore.collection("jobs").doc(eachJob.id).update({
                isVerified: true
            }).then(() => { window.location.reload() }).catch(() => { })
        }
        const declineSubmit = (eachJob) => {
            firestore.collection("jobs").doc(eachJob.id).delete().then(() => { window.location.reload() }).catch(() => { })
        }
        return (
            <div>
                <div>
                    {this.state.allJobs.length === 0 ?
                        <div style={{ textAlign: "center", marginTop: "10px", color: "rgba(0,0,0,0.2)" }}>
                            There are no off campus opportunities currently
                        </div> :
                        <div>
                            {this.state.allJobs.map(eachJob => {
                                return (
                                    <div>
                                        {true ?
                                            <Card style={{ margin: "30px", width: "275px" }}>
                                                <CardBody>
                                                    <CardTitle tag="h4">
                                                        {eachJob.data.name}
                                                    </CardTitle>
                                                    <CardSubtitle style={{ color: "rgba(0,0,0,0.3)" }}>
                                                        {eachJob.data.role}
                                                    </CardSubtitle>
                                                    <div style={{ marginTop: "0px" }}>
                                                        <Badge color="warning">
                                                            {eachJob.data.type === "Intern3" ? "3 Months Internship" : <div>{eachJob.data.type === "Intern6" ? "6 Months Internship" : "Full Time"}</div>}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        DEADLINE: <Moment format="D MMM HH:MM " >{eachJob.data.deadline}</Moment> hrs
                                                    </div>
                                                    {eachJob.data.message ? <Alert style={{ textAlign: "left" }} color="warning">
                                                        {eachJob.data.message}
                                                    </Alert> : null}
                                                    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                        {eachJob.data.mode === "link" ?
                                                            <a style={{ textDecoration: "none", color: "black", marginTop: "10px" }} href={eachJob.data.link} target="_blank">{eachJob.data.link}</a>
                                                            :
                                                            <a style={{ textDecoration: "none", color: "black", marginTop: "10px" }} href={`mailto: ${eachJob.data.link}`} target="_blank">{eachJob.data.link}</a>
                                                        }
                                                        {eachJob.data.mode === "referral" ? <div>
                                                            <Button style={{ marginTop: "10px" }}>
                                                                <a style={{ textDecoration: "none", color: "white" }} href={eachJob.data.jd} target="_blank">JOB DESCRIPTION</a>
                                                            </Button>
                                                            <Button style={{ marginTop: "10px" }}>
                                                                <a style={{ textDecoration: "none", color: "white" }} href={eachJob.data.proof} target="_blank">PROOF</a>
                                                            </Button>
                                                        </div> : null}
                                                        <Button onClick={() => declineSubmit(eachJob)} style={{ marginTop: "10px" }} color="danger">
                                                            DECLINE
                                                        </Button>
                                                        <Button onClick={() => { verifySubmit(eachJob) }} style={{ marginTop: "10px" }} color="success">
                                                            VERIFY
                                                        </Button>
                                                    </div>
                                                </CardBody>
                                            </Card> : null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default Jobs