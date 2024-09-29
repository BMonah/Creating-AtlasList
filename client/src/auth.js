import {createAuthProvider} from 'react-token-auth'

export const { useAuth, authFetch, login, logout } = createAuthProvider<Session>({
    getAccessToken: session => session.accessToken,
    storage: localStorage,
    onUpdateToken: token =>
        fetch('127.0.0.1:8080/auth/refresh', {
            method: 'POST',
            body: token.refreshToken,
        }).then(r => r.json()),
});