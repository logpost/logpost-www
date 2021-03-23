import React, { useEffect } from 'react';
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

	hocComponent.getInitialProps = async ({ res }) => {
		const userAuth = checkUserAuthentication();
		
		if (!userAuth?.auth || (strict && userAuth.role !== strict) ) {
			if (res) {
				res.writeHead(302, {
					Location: login,
				});
				res.end();
			} else {
				Router.replace(login);
			}
		} 

		return { userAuth };
	};

	return hocComponent;
}

export default withPrivateRoute