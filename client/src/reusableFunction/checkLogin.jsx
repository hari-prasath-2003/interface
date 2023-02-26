function checkLogin() {
    const authCookie = document.cookie.split(";")[0]
    console.log(authCookie);
    if (authCookie) return true
    return false
}

export default checkLogin;