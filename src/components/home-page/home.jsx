import React from 'react'
import styles from './home.scss'
import { Page, Button, Footer, FooterText } from 'react-weui'

class HomePage extends React.Component {
  render () {
    return (
      <Page className={styles.homePage}>
        <h1>Raspberrypi Car</h1>
        <p>
          <Button type="primary" onClick={ () => this.start() }>Start</Button>
        </p>
        <p>
          <Button type="warn" onClick={ () => this.stop() }>Stop</Button>
        </p>

        <Footer className={styles.footer}>
          <FooterText>Copyright &copy; 言川 2018</FooterText>
        </Footer>
      </Page>
    )
  }

  start() {
  }

  stop () {
  }
}

export default HomePage
