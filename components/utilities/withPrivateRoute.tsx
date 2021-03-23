import React from 'react';
import Router from 'next/router';
import { getUserInfo } from './tokenHelper';

const login = "/login";

const checkUserAuthentication = () => {
	const userInfo = getUserInfo()
	return { 
		auth: Boolean(userInfo),
		role: userInfo?.role
	};
};

const withPrivateRoute = (WrappedComponent, strict?: string) => {
	const hocComponent = ({ ...props }) => { 
		return <WrappedComponent {...props} />
	};

	hocComponent.getInitialProps = async (context) => {
		const userAuth = checkUserAuthentication();
		
		if (!userAuth?.auth || (strict && userAuth.role !== strict) ) {
			if (context.res) {
				context.res?.writeHead(302, {
					Location: login,
				});
				context.res?.end();
			} else {
				Router.replace(login);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth });
			return { ...wrappedProps, userAuth };
		}

		return { userAuth };
	};

	return hocComponent;
}

export default withPrivateRoute