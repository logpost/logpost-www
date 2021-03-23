import React, { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserInfo } from './tokenHelper';

const withPrivateRoute = (WrappedComponent: FunctionComponent, strict?: string) => {
	const hocComponent = ({ ...props }) => { 
		const router = useRouter()
		const userInfo = getUserInfo()

		useEffect(() => {
			if (!userInfo || (strict && strict !== userInfo.role ) ) {
				router.replace("/login")
			} 
		}, [])

		return <WrappedComponent {...props} />
	};

	return hocComponent;
}

export default withPrivateRoute