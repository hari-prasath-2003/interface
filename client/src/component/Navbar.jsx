import "./component.css"
import { useRef, useState } from "react";
const Navbar = (props) => {
    const [showSearchBar, setShowSearchBar] = useState("hide")
    const searchBar = useRef()
    const searchBarMobile = useRef()
    function handleSearch(e) {
        if (e.key === "Enter") {
            const query = showSearchBar === "show" ? searchBarMobile.current.value : searchBar.current.value
            props.searchBlog(`q=${query}`)
            e.target.blur()
            props.setSearch(query)
        }
    }
    console.log(showSearchBar);
    function displaySearchBar() {
        showSearchBar === "hide" ? setShowSearchBar("show") : setShowSearchBar("hide")
    }
    return (
        <>
            <div className="d-flex justify-content-evenly p-3" style={{ "backgroundColor": "rgba(88, 104, 254, 1)", "height": "48px", "position": "sticky", "top": "0px", "zIndex": "2" }}>
                <div className="d-flex w-50 h-100 align-items-center">
                    <img src="/assert/logo.png" alt="" style={{ "width": "25px", "height": "25px" }} />
                    <p className="fs-4 ps-2 " style={{ "color": "white" }}><strong>Interface</strong></p>
                    <input type="text" ref={searchBar} className="form-control d-none d-md-block mx-3" onKeyDown={handleSearch} placeholder="Search" style={{ "width": "250px", "height": "30px" }} />
                </div>
                <div className="d-flex justify-content-end w-50 gap-md-5 gap-4 align-items-center h-100">
                    <div className="search">

                        <img src="/assert/search.png" onClick={displaySearchBar} className="d-sm-none icon" alt="" />
                    </div>
                    <div className="d-flex align-items-end">

                        <img src="/assert/edit.png" alt="" className="icon" />
                        <p className="fs-6 ps-2 " style={{ "color": "white" }}>Write</p>
                    </div>
                    <img src="/assert/user.png" className="icon" alt="" />
                </div>
            </div>

            <div className={`px-3 ${showSearchBar} searchBox`}>
                <input type="text" ref={searchBarMobile} className="form-control my-4 mb-2 w-100 searchBox" onKeyDown={handleSearch} placeholder="Search" style={{ "width": "250px" }} />
            </div>
        </>

    );
}

export default Navbar;