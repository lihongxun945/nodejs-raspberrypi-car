import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n.js'

export default class Root extends Component {
  render() {
    return (
      <I18nextProvider i18n={ i18n() }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    )
  }
}
