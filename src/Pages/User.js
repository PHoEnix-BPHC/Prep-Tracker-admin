import React from "react"
import { Input, Table } from "reactstrap"
import { firestore } from "../config"


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            totalUsers: 0,
            total18Batch: 0,
            total19Batch: 0,
            total20Batch: 0,
            total21Batch: 0,
            users: [],
            filteredValue: ""
        }
    }
    componentDidMount() {
        firestore.collection("users").get().then(Snapshot => {
            var total = 0, total18 = 0, total19 = 0, total20 = 0, total21 = 0
            var temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
                if (document.id.substring(0, 4) === "2018") {
                    total += 1
                    total18 += 1
                }
                if (document.id.substring(0, 4) === "2019") {
                    total += 1
                    total19 += 1
                }
                if (document.id.substring(0, 4) === "2020") {
                    total += 1
                    total20 += 1
                }
                if (document.id.substring(0, 4) === "2021") {
                    total += 1
                    total21 += 1
                }
            })
            this.setState({ users: temp, totalUsers: total, total18Batch: total18, total20Batch: total20, total19Batch: total19, total21Batch: total21 })
        }).catch(err => { console.log(err.message); })
    }
    render() {
        const filteredArray = this.state.users.filter(user => user.name.toLowerCase().includes(this.state.filteredValue.toLowerCase()))
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalUsers} <br />
                        TOTAL USERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.total18Batch} <br />
                        18 BATCH USERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.total19Batch} <br />
                        19 BATCH USERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.total20Batch} <br />
                        20 BATCH USERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.total21Batch} <br />
                        21 BATCH USERS
                    </div>
                </div>
                <Input onChange={event => { this.setState({ filteredValue: event.target.value }) }} value={this.state.filteredValue} bsSize="sm" name="search-comp" placeholder="Search for any user" className="mb-0" style={{ width: "350px", margin: "auto" }} type="search" />
                <div style={{ marginBottom: "10px" }}>

                </div>
                <div style={{ display: "flex", flexDirection: "column", overflow: "scroll", height: "400px" }} >
                    <Table bordered responsive size="sm" style={{ margin: "auto", width: "80%" }}>
                        <thead style={{ backgroundColor: "#303030", color: "white" }}>
                            <tr>
                                <th>
                                    NAME
                                </th>
                                <th>
                                    ID NUMBER
                                </th>
                                <th>
                                    YEAR
                                </th>
                                <th>
                                    BRANCH
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredArray.map(eachUser => {
                                return (
                                    <tr >
                                        <td>
                                            {eachUser.name}
                                        </td>
                                        <td>
                                            {eachUser.idNo}
                                        </td>
                                        <td>
                                            {eachUser.year}
                                        </td>
                                        <td>
                                            {eachUser.branch}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default User