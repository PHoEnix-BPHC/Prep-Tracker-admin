import React from "react"
import { Input, Table } from "reactstrap"
import { firestore } from "../config"


class Usage extends React.Component {
    constructor() {
        super()
        this.state = {
            totalTopicsIT: 0,
            totalQuestionsIT: 0,
            totalChaptersIT: 0,
            totalTopicsCore: 0,
            totalQuestionsCore: 0,
            totalChaptersCore: 0,
            coreUsers: [],
            itUsers: [],
            filteredValueIT: "",
            filteredValueCore: ""
        }
    }
    componentDidMount() {
        firestore.collection("Core").get().then(Snapshot => {
            var totalT = 0, totalQ = 0, totalC = 0
            var temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
                totalT += document.data().completedTopics
                totalQ += document.data().completedQuestions
                totalC += document.data().completedChapters
            })
            this.setState({ totalChaptersCore: totalC, totalQuestionsCore: totalQ, totalTopicsCore: totalT, coreUsers: temp })
        }).catch(err => { console.log(err.message); })
        firestore.collection("IT").get().then(Snapshot => {
            var totalT = 0, totalQ = 0, totalC = 0
            var temp = []
            Snapshot.forEach(document => {
                let obj = {
                    id: document.id,
                    data: document.data()
                }
                temp.push(obj)
                totalT += document.data().completedTopics
                totalQ += document.data().completedQuestions
                totalC += document.data().completedChapters
            })
            this.setState({ itUsers: temp, totalChaptersIT: totalC, totalQuestionsIT: totalQ, totalTopicsIT: totalT })
        }).catch(err => console.log(err.message))
    }
    render() {
        const filteredArrayIT = this.state.itUsers.filter(user => user.id.toLowerCase().includes(this.state.filteredValueIT.toLowerCase()))
        const filteredArrayCore = this.state.coreUsers.filter(user => user.id.toLowerCase().includes(this.state.filteredValueCore.toLowerCase()))
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalChaptersCore} <br />
                        CORE CHAPTERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalTopicsCore} <br />
                        CORE TOPICS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalQuestionsCore} <br />
                        CORE QUESTIONS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalChaptersIT} <br />
                        IT CHAPTERS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalTopicsIT} <br />
                        IT TOPICS
                    </div>
                    <div style={{ width: "max-content", margin: "20px", textAlign: "center", fontSize: "20px", padding: "10px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                        {this.state.totalQuestionsIT} <br />
                        IT QUESTIONS
                    </div>
                </div>
                <div style={{ marginBottom: "10px" }}>

                </div>
                <div style={{ display: "flex", textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 10px 30px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                    CORE STUDENTS
                </div>
                <Input onChange={event => { this.setState({ filteredValueCore: event.target.value }) }} value={this.state.filteredValueCore} bsSize="sm" name="search-comp" placeholder="Search for any user" className="mb-0" style={{ width: "350px", margin: "auto" }} type="search" />
                <div style={{ marginBottom: "10px" }}>

                </div>
                <div style={{ display: "flex", flexDirection: "column", overflow: "scroll", height: "400px" }} >
                    <Table bordered responsive size="sm" style={{ margin: "auto", width: "80%" }}>
                        <thead style={{ backgroundColor: "#303030", color: "white" }}>
                            <tr>
                                <th>
                                    ID NUMBER
                                </th>
                                <th>
                                    COMPLETED CHAPTERS
                                </th>
                                <th>
                                    COMPLETED TOPICS
                                </th>
                                <th>
                                    COMPLETED QUESTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArrayCore.map(eachUser => {
                                return (
                                    <tr >
                                        <td>
                                            {eachUser.id}
                                        </td>
                                        <td>
                                            {eachUser.data.completedChapters}
                                        </td>
                                        <td>
                                            {eachUser.data.completedTopics}
                                        </td>
                                        <td>
                                            {eachUser.data.completedQuestions}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div style={{ display: "flex", textAlign: "center", width: "max-content", height: "max-content", padding: "20px", letterSpacing: "5px", fontSize: "20px", margin: "20px 0px 10px 30px", backgroundColor: "rgba(0,0,0,0.1)" }}>
                    IT STUDENTS
                </div>
                <Input onChange={event => { this.setState({ filteredValueIT: event.target.value }) }} value={this.state.filteredValueIT} bsSize="sm" name="search-comp" placeholder="Search for any user" className="mb-0" style={{ width: "350px", margin: "auto" }} type="search" />
                <div style={{ marginBottom: "10px" }}>

                </div>
                <div style={{ display: "flex", flexDirection: "column", overflow: "scroll", height: "400px" }} >
                    <Table bordered responsive size="sm" style={{ margin: "auto", width: "80%" }}>
                        <thead style={{ backgroundColor: "#303030", color: "white" }}>
                            <tr>
                                <th>
                                    ID NUMBER
                                </th>
                                <th>
                                    COMPLETED CHAPTERS
                                </th>
                                <th>
                                    COMPLETED TOPICS
                                </th>
                                <th>
                                    COMPLETED QUESTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredArrayIT.map(eachUser => {
                                return (
                                    <tr >
                                        <td>
                                            {eachUser.id}
                                        </td>
                                        <td>
                                            {eachUser.data.completedChapters}
                                        </td>
                                        <td>
                                            {eachUser.data.completedTopics}
                                        </td>
                                        <td>
                                            {eachUser.data.completedQuestions}
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

export default Usage