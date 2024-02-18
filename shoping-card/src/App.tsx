
import { AppRoute } from './routers/router'
import { ProvidersQuery } from './providers'
import{Provider}from "react-redux"
import {store} from './redux/store'



export default function App() {
  return (
    <>
    <Provider store={store}>
      <ProvidersQuery>
        <AppRoute />
      </ProvidersQuery>
      </Provider>
    </>
  )
}
