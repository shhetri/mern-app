import { NextFunctionComponent } from 'next'
import axios from 'axios'

const helloPage: NextFunctionComponent = () => {
  return <div>Hello from nextJs</div>
}

helloPage.getInitialProps = async () => {
  try {
    await axios.get('http://server:3000')
    // tslint:disable-next-line: no-console
    console.log('success')
  } catch (error) {
    // tslint:disable-next-line: no-console
    console.debug(error, 'error occurred')
  }
  return {}
}

export default helloPage
