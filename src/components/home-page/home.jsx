import React from 'react'
import styles from './home.scss'
import { Page, Button, Footer, FooterText, Flex, FlexItem, Form, FormCell, CellBody, CellFooter, Switch, CellsTitle, Slider } from 'react-weui'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 1
    }
    this.init()
  }

  init() {
    fetch(`/api/get/speed/`)
      .then(res => res.json())
      .then(data => this.setState({speed: data.speed}))
  }
  render () {
    return (
      <Page className={styles.homePage}>
        <h1>Raspberrypi Car</h1>
        <CellsTitle>Settings</CellsTitle>
        <Form>
          <FormCell switch>
            <CellBody>Auto Drive</CellBody>
            <CellFooter>
              <Switch onChange={ (e) => this.setAutoDrive(e) }/>
            </CellFooter>
          </FormCell>
        </Form>
        <CellsTitle>Speed</CellsTitle>
        <Slider
          min={1}
          max={10}
          defaultValue={this.state.speed}
          step={1}
          onChange={ value => this.setSpeed(value) }
        />
        <CellsTitle>Manual Control</CellsTitle>
        <Flex>
          <FlexItem></FlexItem>
          <FlexItem>
            <Button type="primary" onTouchStart={ (e) => this.startForward(e) } onTouchEnd={ (e) => this.stop(e) }>Forward</Button>
          </FlexItem>
          <FlexItem></FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(3) }>Left</Button>
          </FlexItem>
          <FlexItem>
            <Button type="warn" onClick={ () => this.go(-1) }>Stop</Button>
          </FlexItem>
          <FlexItem>
            <Button type="primary" onClick={ () => this.go(1) }>Right</Button>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem></FlexItem>
          <FlexItem>
            <Button type="primary" onTouchStart={ (e) => this.startBackward(e) } onTouchEnd={ (e) => this.stop(e) }>Backward</Button>
          </FlexItem>
          <FlexItem></FlexItem>
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

  startForward (e) {
    e.preventDefault()
    this.go(0)
  }

  startBackward (e) {
    e.preventDefault()
    this.go(2)
  }

  stop (e) {
    e.preventDefault()
    this.go(-1)
  }

  setAutoDrive (e) {
    if (e.target.checked) {
      fetch('/api/auto/start')
    } else {
      fetch('/api/auto/stop')
    }
  }

  setSpeed (s) {
    fetch(`/api/set/speed/${s}`)
  }
}

export default HomePage
