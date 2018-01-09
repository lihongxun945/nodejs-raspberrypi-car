/* eslint-disable import/no-named-as-default */
import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Bundle from './bundle.js'
import loadHome from 'bundle-loader?lazy!./home-page'
import NotFoundPage from './NotFoundPage'
import 'weui'
import 'react-weui/build/packages/react-weui.css'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const Home = () => {
  return (
    <Bundle load={loadHome}>
      {(Home) => <Home />}
    </Bundle>
  )
}

class App extends React.Component {
	componentDidMount() {
    // preloads the rest
    loadHome(() => {})
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
