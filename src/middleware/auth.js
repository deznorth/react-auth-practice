
const auth = {};

auth.isLoggedIn = () => {
    const token = localStorage.getItem('auth_token');
    return !!token;
}

auth.logout = () => {
    try{
        localStorage.removeItem('auth_token');
    } catch(e){
        return false;
    }
    return true;    
}

export default auth;