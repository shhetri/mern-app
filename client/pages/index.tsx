import { NextFunctionComponent } from 'next'
import axios from 'axios'

const Hello: NextFunctionComponent = () => {
  return <div>Works and updated. As seen. ok finally</div>
}

Hello.getInitialProps = async () => {
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

export default Hello
