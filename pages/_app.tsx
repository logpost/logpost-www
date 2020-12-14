import { useEffect } from 'react'
import '../styles/globals.css'
import appStore from '../store/AppStore'
import { view } from '@risingstack/react-easy-state'

function MyApp({ Component, pageProps }) {
	const { onLoadPage } = appStore
	// useEffect( () =>  {
	//      onLoadPage()
	//   }, [])
	return <Component {...pageProps} />
}

export default view(MyApp)
