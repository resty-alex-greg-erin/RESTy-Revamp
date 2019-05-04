import "./resty.css";

import React from "react";
import superagent from "superagent";
import ReactJson from "react-json-view";
import md5 from "md5";
// import History from './history/history-index.js';
import { connect } from "react-redux";
import * as actions from "../../store/actions.js";

class RESTy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      method: "get",
      requestBody: "",
      username: "",
      password: "",
      token: "",
      header: {},
      body: {},
      // history: {},
      headersVisible: false
    };
  }

  componentDidMount() {
    try {
      let history = JSON.parse(localStorage.getItem("history"));
      this.setState({ history });
    } catch (e) {
      console.error(e);
    }
  }

  saveHistory = () => {
    localStorage.setItem("history", JSON.stringify(this.state.history));
  };

  updateHistory = () => {
    let url = new URL(this.state.url);

    let lastRun = {
      host: url.hostname,
      path: url.pathname,
      url: this.state.url,
      method: this.state.method,
      requestBody: this.state.requestBody,
      username: this.state.username,
      password: this.state.password,
      token: this.state.token,
      body: {},
      header: {}
    };

    let key = md5(JSON.stringify(lastRun));
    let entry = { [key]: lastRun };
    let history = { ...this.state.history, ...entry };
    this.setState({ history });
    this.saveHistory();
  };

  resetFormHistory = event => {
    event.preventDefault();
    console.log(this.props.records, "records");
    let newState = {
      ...this.props.records,
      url: "http://please-hannah-or-caity.fullcredit/please/you/are/the/best"
    };
    console.log(newState, "newState");
    this.props.resetFormFromHistory(newState);
  };

  handleChange = event => {
    console.log("I see dead people");
    // let prop = event.target.name;
    // let value = event.target.value;
    // this.setState({ [prop]: value });

    // // If basic/bearer, clear the other
    // if (prop === 'token') {
    //   let username = '';
    //   let password = '';
    //   this.setState({ username, password });
    // }

    // if (prop.match(/username|password/)) {
    //   let token = '';
    //   this.setState({ token });
    // }
  };

  toggleHeaders = () => {
    let headersVisible = !this.state.headersVisible;
    this.setState({ headersVisible });
  };

  callAPI = event => {
    event.preventDefault();

    let contentType = { "Content-Type": "application/json" };
    let bearer = this.state.token
      ? { Authorization: `Bearer ${this.state.token}` }
      : {};
    let basic =
      this.state.username && this.state.password
        ? {
            Authorization:
              "Basic " + btoa(`${this.state.username}:${this.state.password}`)
          }
        : {};

    superagent(this.state.method, this.state.url)
      .set("Content-Type", "application/json")
      .set(Object.assign(contentType, bearer, basic))
      .send(this.state.requestBody)
      .then(response => {
        let header = response.header;
        let body = response.body;
        this.setState({ header, body });
        this.updateHistory();
      })
      .catch(e => {
        let body = { error: e.message };
        let header = {};
        this.setState({ header, body });
      });
  };

  render() {
    return (
      <main>
        <aside>
          <h2>History</h2>
          <ul id="history">
            {this.props.records.history &&
              Object.keys(this.props.records.history).map(key => (
                <li key={key} id={key} onClick={this.resetFormHistory}>
                  <span>
                    <strong>{this.props.records.history[key].method}</strong>
                  </span>
                  <span>{this.props.records.history[key].host}</span>
                  <span>{this.props.records.history[key].path}</span>
                </li>
              ))}
          </ul>
        </aside>
        {/* <History /> */}
        <section className="deck">
          <form onSubmit={this.callAPI}>
            <section>
              <input
                type="text"
                className="wide"
                name="url"
                placeholder="URL"
                value={this.props.records.url}
                onChange={this.handleChange}
              />

              <div id="methods">
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === "get" ? true : false}
                    value="get"
                    onChange={this.handleChange}
                  />
                  <span>GET</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === "post" ? true : false}
                    value="post"
                    onChange={this.handleChange}
                  />
                  <span>POST</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === "put" ? true : false}
                    value="put"
                    onChange={this.handleChange}
                  />
                  <span>PUT</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === "patch" ? true : false}
                    value="patch"
                    onChange={this.handleChange}
                  />
                  <span>PATCH</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === "delete" ? true : false}
                    value="delete"
                    onChange={this.handleChange}
                  />
                  <span>DELETE</span>
                </label>
                <label>
                  <button type="submit">Go!</button>
                </label>
              </div>
            </section>

            <section className="deck col-2">
              <div id="body">
                <textarea
                  placeholder="Raw JSON Body"
                  name="requestBody"
                  onChange={this.handleChange}
                  value={this.state.requestBody}
                  disabled={
                    this.state.method.match(/get|delete/) ? true : false
                  }
                />
              </div>

              <div id="headers">
                <a href="#" onClick={this.toggleHeaders}>
                  Headers
                </a>
                <div className={"visible-" + this.state.headersVisible}>
                  <h2>Basic Authorization</h2>
                  <input
                    onChange={this.handleChange}
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                  />
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                  />
                </div>
                <div className={"visible-" + this.state.headersVisible}>
                  <h2>Bearer Token</h2>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    className="wide"
                    name="token"
                    placeholder="Token"
                    value={this.state.token}
                  />
                </div>
              </div>
            </section>
          </form>
          <div id="json">
            <ReactJson
              name="Headers"
              enableClipboard={false}
              collapsed={true}
              src={this.state.header}
            />
            <ReactJson
              name="Response"
              enableClipboard={false}
              collapsed={false}
              src={this.state.body}
            />
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = state => ({ records: state.records });

const mapDispatchToProps = (dispatch, getState) => ({
  resetFormFromHistory: payload => dispatch(actions.resetForm(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RESTy);
