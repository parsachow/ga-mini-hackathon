export function logOut() {
    localStorage.removeItem('jwt');
}

export function getToken() {
    // getItem will return null if the key does not exists
    const token = localStorage.getItem('jwt');
    if (!token) return null;
    const payload = parseJwt(token);
    // A JWT's exp is expressed in seconds, not miliseconds
    if (payload.exp * 1000 < Date.now()) {
        // Token has expired
        localStorage.removeItem('jwt');
        return null;
    }
    return token;
}

export function setToken(token) {
    localStorage.setItem('jwt', token);
}

export function getUser(){
    const token = getToken();
    if(token){
        return parseJwt(token).user;
    }
    return null;
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}