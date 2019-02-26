import './env'
import MERNApplication from './application'

const booststrap = async (): Promise<any> => {
  const app: MERNApplication = MERNApplication.create()
  await app.listen(+process.env.PORT)
}

booststrap()
