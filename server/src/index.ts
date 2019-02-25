import MERNApplication from './application'

const booststrap = async (): Promise<any> => {
  const app: MERNApplication = MERNApplication.create()
  await app.listen(3000)
}

booststrap()
