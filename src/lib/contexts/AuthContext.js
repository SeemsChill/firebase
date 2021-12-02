import { useState, useContext, createContext } from 'react';
import app from './init';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const useAuthContext = createContext();

export function AuthProvider({ children }) {
	return <useAuthContext.Provider value={useAuthProvider()}>{children}</useAuthContext.Provider>
}

export function useAuth() {
	return useContext(useAuthContext);
}

function useAuthProvider() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleRawData(rawUser) {
		if(!rawUser) {
			setLoading(false);
			setUser(false);

			return false;
		}
		const user = await formatUser(rawUser)

		setLoading(false);
		setUser(user);

		return user;
	}

	function signUpWithEmailAndPassword(email, password) {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) =>	handleRawData(userCredential.user));
	}

	return {
		loading,
		setLoading,
		signUpWithEmailAndPassword,
		user,
	}
}

async function formatUser(user) {
	const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
}
