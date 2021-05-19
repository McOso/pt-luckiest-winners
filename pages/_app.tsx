import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/globals.css'

// set staleTime to 12 hours
// 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 43200000,
      cacheTime: 43200000
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export default MyApp
