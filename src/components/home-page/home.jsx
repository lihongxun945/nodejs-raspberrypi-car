import React from 'react'
import styles from './home.scss'
import { Page, Button, Footer, FooterText, Flex, FlexItem } from 'react-weui'

class HomePage extends React.Component {
  render () {
    return (
      <Page className={styles.homePage}>
        <h1>Raspberrypi Car</h1>
        <Flex>
          <FlexItem></FlexItem>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(0) }>前进</Button>
          </FlexItem>
          <FlexItem></FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(3) }>左转</Button>
          </FlexItem>
          <FlexItem>
            <Button type="warn" onClick={ () => this.go(-1) }>Stop</Button>
          </FlexItem>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(1) }>右转</Button>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem></FlexItem>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(2) }>后退</Button>
          </FlexItem>
          <FlexItem></FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <Button type="primary" onClick={ () => this.startAuto() }>打开自动</Button>
          </FlexItem>
          <FlexItem>
          </FlexItem>
          <FlexItem>
            <Button type="primary" onClick={ () => this.stopAuto() }>关闭自动</Button>
          </FlexItem>
        </Flex>
        <Footer className={styles.footer}>
          <FooterText>Copyright &copy; 言川 2018</FooterText>
        </Footer>
      </Page>
    )
  }

  go(dir) {
    fetch(`/api/go/${dir}`)
  }

  startAuto () {
    fetch('/api/auto/start')
  }
  stopAuto() {
    fetch('/api/auto/stop')
  }
}

export default HomePage
