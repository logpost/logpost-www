import React from 'react';
import Router from 'next/router';
import { getUserInfo } from './tokenHelper';

const login = "/login";

const checkUserAuthentication = () => {
	const userInfo = getUserInfo()
	if (typeof window !== 'undefined') {
		return { 
			auth: Boolean(userInfo),
			role: userInfo.role
		};
	}
	return { 
		auth: false,
		role: undefined
	}
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