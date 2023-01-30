const BlogCardSide = ({ author, title }) => {
    return (<div className="w-100  pt-4">
        <div className="d-flex align-items-center gap-2">
            <img src="/assert/user.png" alt="" className="profile" style={{ "backgroundColor": "violet" }} />
            <p>{author}</p>
            <p>5 hours ago</p>
        </div>
        <div className="d-flex ">
            <div className="w-100">
                <h4 className="text-capitalize no-wrap fw-bold lh-base" style={{ "fontSize": "1.2em" }} >{title}</h4>
            </div>
        </div>
    </div>);
}

export default BlogCardSide;