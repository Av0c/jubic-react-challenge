import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import * as maptalks from 'maptalks';
import NavBar from '~/common/navbar';

class Phone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPhoneDigit: "",
            maxPhoneLength: 9,
            hasStarted: false,
            hasEnded: false,

            shuffleInterval: 100,
        };
    }

    phoneRestart() {
        const { hasStarted } = this.state;
        if (!hasStarted) {
            var int = setInterval(() => {
                let currentPhoneDigit;
                if (this.state.currentPhoneDigit === "") {
                    currentPhoneDigit = 0;
                } else {
                    currentPhoneDigit = this.state.currentPhoneDigit+1;
                }
                if (currentPhoneDigit > 9) {
                    currentPhoneDigit = 0;
                }
                this.setState({
                    currentPhoneDigit: currentPhoneDigit,
                });
            }, this.state.shuffleInterval);

            this.setState({
                hasStarted: true,
                int: int,
            });
        } else {
            this.setState({
                hasEnded: false,
            });
        }
    }

    phoneSet() {
        let phoneNumber = this.props.phoneNumber + this.state.currentPhoneDigit;
        if (phoneNumber.length <= this.state.maxPhoneLength) {
            this.props.onChange({"target": {"name": "phoneNumber", "value": phoneNumber}});
        }
        if (phoneNumber.length >= this.state.maxPhoneLength) {
            this.setState({
                hasEnded: true,
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.int);
    }

    render() {
        const { currentPhoneDigit, maxPhoneLength, hasStarted, hasEnded } = this.state;
        const { phoneNumber } = this.props;

        var phoneRender = [(<div key="phone-prefix" className="phone-digit prefix">+358</div>)];
        for (var i = 0; i < maxPhoneLength; i++) {
            let currentNumber = phoneNumber + currentPhoneDigit;
            currentNumber = currentNumber.substring(i, i+1);
            phoneRender.push(
                <div key={"key"+i} className="phone-digit active">{currentNumber}</div>
            )
        }

        return (
            <React.Fragment>
                <label htmlFor="phone">Mobile phone</label>
                <div className="phone-input">
                    {phoneRender}
                    <div className="phone-button" style={{marginLeft: "40px"}} onClick={() => {this.phoneRestart()}}>{hasStarted ? "Restart" : "Start"}</div>
                    <div className={(hasStarted & !hasEnded) ? "phone-button" : "phone-button disabled"} onClick={() => {this.phoneSet()}}>Set</div>
                </div>
            </React.Fragment>
        );
    }
}

class Birthday extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Placeholder
        };
    }

    componentDidMount() {
        var birthdayMonthOptions = ["April", "August", "December", "February", "January", "July", "June", "March", "May", "November", "October", "September"];

        var birthdayMonthRender = [<option key="placeholder" disabled value="">-- Select month --</option>];
        for (var i = 0; i < birthdayMonthOptions.length; i++) {
            let m = birthdayMonthOptions[i];
            birthdayMonthRender.push(<option key={m} value={m}>{m}</option>);
        }

        this.setState({
            birthdayMonthRender: birthdayMonthRender,
        });

        // Generate date options
        var birthdayDateOptions = [];
        var smallNumbers =
        ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth"];
        var tens =
        ["", "", "Twenty", "Thirty"];
        var tensOrdinal =
        ["", "", "Twentieth", "Thirtieth"];
        var words = "";
        for (var i = 1; i < 32; i++) {
            if (i <= 0) {
                // Nothing
            } else if (i <= 19) {
                words = smallNumbers[i];
            } else {
                var tenUnit = Math.floor(i/10);
                var unit = i % 10;
                if (unit == 0) {
                    words = tensOrdinal[tenUnit];
                } else {
                    words = tens[tenUnit] + "-" + smallNumbers[unit].toLowerCase();
                }
            }

            birthdayDateOptions.push(words);
        }

        birthdayDateOptions = birthdayDateOptions.sort();

        var birthdayDateRender = [<option key="placeholder" disabled value="">-- Select date --</option>];
        for (var i = 0; i < birthdayDateOptions.length; i++) {
            let d = birthdayDateOptions[i];
            birthdayDateRender.push(<option key={d} value={d}>{d}</option>);
        }

        this.setState({
            birthdayDateRender: birthdayDateRender,
        });
    }

    render() {
        return (
            <React.Fragment>
                <label>Birthday</label>
                <select name="birthdayMonth" value={this.props.birthdayMonth} onChange={(e) => {this.props.onChange(e)}}>
                    {this.state.birthdayMonthRender}
                </select>
                <select name="birthdayDate" value={this.props.birthdayDate} onChange={(e) => {this.props.onChange(e)}}>
                    {this.state.birthdayDateRender}
                </select>
            </React.Fragment>
        );
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            comment: "",
            phoneNumber: "",
            birthdayMonth: "",
            birthdayDate: "",
        };
    }

    formClear() {
        this.setState({
            name: "",
            desc: "",
            comment: "",
            phoneNumber: "",
            birthdayMonth: "",
            birthdayDate: "",
        });
    }

    formAdd() {
        this.props.formAdd(this.state);
    }

    changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value,
        });
    }

    render() {
        const { name, desc, comment, phoneNumber, birthdayDate, birthdayMonth } = this.state;

        return (
            <div className="form-container">
                <div className="form-field" style={{gridColumn: "1"}}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={(e) => {this.changeHandler(e)}} value={name}></input>
                </div>
                <div className="form-field" style={{gridColumn: "2/5"}}>
                    <label>Description</label>
                    <input type="text" name="desc" onChange={(e) => {this.changeHandler(e)}} value={desc}></input>
                </div>
                <div className="form-field" style={{gridColumn: "1/5"}}>
                    <label>Comment</label>
                    <input type="text" name="comment" onChange={(e) => {this.changeHandler(e)}} value={comment}></input>
                </div>
                <div className="form-field phone" style={{gridColumn: "1/5"}}>
                    <Phone
                        phoneNumber={phoneNumber}
                        onChange={(e) => {this.changeHandler(e)}}
                    />
                </div>
                <div className="form-field birthday" style={{gridColumn: "1/5"}}>
                    <Birthday
                        birthdayDate={birthdayDate}
                        birthdayMonth={birthdayMonth}
                        onChange={(e) => {this.changeHandler(e)}}
                    />
                </div>
                <div className="form-buttons">
                    <div className="clear" onClick={() => {this.formClear()}}>Clear</div>
                    <div className="add" onClick={() => {this.formAdd()}}>Add</div>
                </div>
            </div>
        );
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: 0,
            showPopup: false,
        };
    }

    componentDidMount() {
        // First demo item
        localStorage.setItem("forms",
            JSON.stringify([{
                name: "Quyen Duong",
                desc: "This small webapp is developed for Jubic Oy's React challenge. However I added a small twist, which is inspired by an article a while ago, showcasing infuriating (but hilarious) UX designs. Made by (you guess it) React.",
                comment: "'If Satan is a web-developer'",
                phoneNumber: "0417276866",
                birthdayMonth: "September",
                birthdayDate: "Seventh",
            }])
        );
    }

    formAdd(formData) {
        // var { forms } = this.state;
        // console.log(formData);
        // forms.push(formData);
        //
        // this.setState({
        //     forms: forms,
        // });

        var forms = JSON.parse(localStorage.getItem("forms"));
        forms.push(formData);
        localStorage.setItem("forms", JSON.stringify(forms));

        this.setState(this.state);
    }

    formDetails(id) {
        this.setState({
            currentId: id,
            showPopup: true,
        });
    }

    formDelete(id) {
        // console.log(id);
        // var { forms } = this.state;
        // forms.splice(id, 1);
        // this.setState({
        //     forms: forms,
        // });

        var forms = JSON.parse(localStorage.getItem("forms"));
        forms.splice(id, 1);
        localStorage.setItem("forms", JSON.stringify(forms));

        this.setState(this.state);
    }

    closePopup(e) {
        let id = e.target.id;
        console.log(id);
        if (id == "popup-overlay" || id == "popup-close-button") {
            this.setState({
                showPopup: false,
            });
        }
    }

    render() {
        const { showPopup, currentId } = this.state;
        var forms = JSON.parse(localStorage.getItem("forms"));
        console.log(forms);

        var formsRender = [];
        for (var i = 0; i < forms.length; i++) {
            let form = forms[i];
            let f = i;
            formsRender.push(
                <tr key={"table-row-"+i}><td>{form.name}</td><td>{form.desc}</td><td>
                    <div className="table-buttons delete" onClick={() => {this.formDelete(f)}}>Delete</div>
                    <div className="table-buttons details" onClick={() => {this.formDetails(f)}}>Details</div>
                </td></tr>
            );
        }

        return (
            <div>
                <div className="center-container">
                    <Form
                        formAdd={(state) => {this.formAdd(state)}}
                        />
                    <div className="table-container">
                        <table>
                            <tbody>
                                <tr id="name-row"><th id="name-col">Name</th><th>Description</th><th id="buttons-col"></th></tr>
                                {formsRender}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showPopup &&
                    <div id="popup-overlay" className="popup-overlay" onClick={(e) => {this.closePopup(e)}}>
                        <div className="popup-container">
                            <div className="popup-header">
                                Details
                                <div className="popup-close-button" ><i id="popup-close-button" onClick={(e) => {this.closePopup(e)}} className="material-icons">&#xe14c;</i></div>
                            </div>
                            <div className="popup-content">
                                <label>Name</label>
                                <div className="data">{forms[currentId].name == "" ? <i>This field is blank</i> : forms[currentId].name}</div>
                                <label>Description</label>
                                <div className="data">{forms[currentId].desc == "" ? <i>This field is blank</i> : forms[currentId].desc}</div>
                                <label>Comment</label>
                                <div className="data">{forms[currentId].comment == "" ? <i>This field is blank</i> : forms[currentId].comment}</div>
                                <label>Phone number</label>
                                <div className="data">{forms[currentId].phoneNumber == "" ? <i>This field is blank</i> : forms[currentId].phoneNumber}</div>
                                <label>Birthday</label>
                                <div className="data">{forms[currentId].birthdayMonth+forms[currentId].birthdayDate == "" ? <i>This field is blank</i> : forms[currentId].birthdayMonth + " " + forms[currentId].birthdayDate}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default Home;
