
async function searchFetch(url) {
    const authToken = document.cookie.replace("Authorisation =", "")
    const data = { err: null }
    const res = await fetch("http://192.168.190.213:3000" + url, { headers: { "Authorization": authToken } })
    if (res.status === 200) {
        data.content = await res.json()
    } else if (res.status === 400) {
        data.err = "not logedin"
    }
    return data
}

export default searchFetch;