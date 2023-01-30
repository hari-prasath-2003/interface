import Navbar from "../component/Navbar";
import CategoryPannel from "../component/CategoryPannel";
import BlogCard from "../component/BlogCard";
import "./initialpage.css"
import { useHistory } from 'react-router-dom';
import BlogCardSide from "../component/BlogCardSide";
import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader"
import searchFetch from "../reusableFunction/searchFetch";
import checkLogin from "../reusableFunction/checkLogin";
import { useMemo } from "react";
const Content = () => {
    const [search, setSearch] = useState("")
    const [blog, setBlog] = useState({ latest: [], recomended: [], saved: { saved: [] } })
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")
    const history = useHistory()
    useEffect(() => {
        const authCookie = checkLogin()
        if (!authCookie) {
            history.push("/login")
        }
        console.log("working");
        async function fetchBlog() {
            setBlog({ ...blog, recomended: [] })
            setLoading(true)
            const data = await searchFetch("/home" + category)
            setBlog(data.content)
            setLoading(false)
        } if (category != "search") fetchBlog()



    }, [category])


    async function searchBlog(query) {
        setBlog({ ...blog, recomended: [] })
        setLoading(true)
        setCategory("search")
        const data = await searchFetch(`/search?${query}`)
        if (!data.err) {
            setBlog({ ...blog, recomended: data.content })
            setLoading(false)

        } else {
            history.push("/login")
        }

    }
    return (
        <div>
            <Navbar searchBlog={searchBlog} setSearch={setSearch}></Navbar>
            <div className="content-container d-flex">
                <div className="w-100 w-md-75 ">
                    {<CategoryPannel setCategory={setCategory}></CategoryPannel>}
                    {search && <p className="py-3 px-sm-0 px-3 fs-4 text-capitalize">Search Result For {search}</p>}
                    {blog && blog.recomended.map(({ author, title, content, category, thumbnail }) => {
                        return <BlogCard author={author} title={title} content={content} category={category} thumbnail={thumbnail}></BlogCard>
                    })}
                    <div className="d-flex align-items-center w-100 p-5 justify-content-center">
                        {loading}
                        <ScaleLoader loading={loading} color="rgba(88, 104, 254, 1)"></ScaleLoader>

                    </div>


                </div>
                <div className="w-md-25 pt-5 d-sm-block d-none border border-start-2 border-end-0 border-top-0 border-bottom-0 ps-3 pe-2" style={{ "fontSize": "14px" }}>

                    <div>
                        <p className="lead fw-bold" style={{ "color": "gray" }}>Latest topic on Interface</p>
                        {blog && blog.latest.map(({ author, title }) => {
                            return <BlogCardSide author={author} title={title}></BlogCardSide>

                        })}

                    </div>
                    <hr />
                    <div style={{ "position": "sticky", "top": "50px" }}>
                        <p className="lead fw-bold mt-4" style={{ "color": "gray" }}> Recently saved</p>
                        {blog && blog.saved.saved.map(({ author, title }) => {
                            return <BlogCardSide author={author} title={title}></BlogCardSide>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Content;