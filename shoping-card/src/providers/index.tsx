import {
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import { ReactNode } from 'react'
  
const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnMount:false,
            refetchOnWindowFocus:false,
            retry:false,
            retryOnMount:false,
            refetchOnReconnect:false,
        }
    }
})
  
interface Props{
    children:ReactNode
}

  export const ProvidersQuery=({children}:Props)=> {
    return (
      <QueryClientProvider client={queryClient}>
       {children}
      </QueryClientProvider>
    )
  }

