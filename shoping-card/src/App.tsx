
import { AppRoute } from './routers/router'
import { Providers } from './providers'



export default function App() {
  return (
    <>
      <Providers>
        <AppRoute />
      </Providers>
    </>
  )
}
