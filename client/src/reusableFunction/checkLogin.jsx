function checkLogin() {
    const authCookie = document.cookie
    console.log(authCookie);
    if (authCookie) return true
    return false
}

export default checkLogin;