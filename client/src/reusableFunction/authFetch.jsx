async function authFetch(body, url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort, 10000)
    const result = await fetch("http://192.168.190.213:3000/" + url,
        { body: JSON.stringify(body), method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal },)
        .then((res) => {
            if (res.status === 200) {
                return res.json()
            }
            throw Error(res.statusText)
        })
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err.message
        })
    clearTimeout(timeout)
    document.cookie = "Authorisation = Bearer " + result.token
    return result
}

export default authFetch