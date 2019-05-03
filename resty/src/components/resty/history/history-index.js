import React from 'react';
import { connect } from 'react-redux';
import * actions from './history-actions.js';


class History extends React.Component {
  constructor(props) {
    super(props)
    this.props.children;
  }

  render() {
    return (
      <>
        <aside>
          <h2>History</h2>
          <ul id="history">
            {this.state.history &&
              Object.keys(this.state.history).map(key => (
                <li key={key} id={key} onClick={this.props.resetFormFromHistory}>
                  <span>
                    <strong>{this.state.history[key].method}</strong>
                  </span>
                  <span>{this.state.history[key].host}</span>
                  <span>{this.state.history[key].path}</span>
                </li>
              ))}
          </ul>
        </aside>
      </>
    );
  }
  resetFormFromHistory = event => {
    event.preventDefault();
    let newState = this.state.history[event.currentTarget.id];
    this.setState({ ...newState });
  };
}

const mapStateToProps = state => ({history: state.history});

const mapDispatchToProps = (dispatch, getState) => ({
resetFormFromHistory: () => dispatch(actions.resetHistory())
})

export default connect (mapStateToProps, mapDispatchToProps)(History);