const BlogCard = ({ author, title, content, category, thumbnail }) => {
    return (<div className="w-100  p-sm-0 px-3 pt-1 pe-3 pe-sm-5">
        <div className="d-flex align-items-center gap-2">
            <img src="/assert/user.png" alt="" className="profile" style={{ "backgroundColor": "violet" }} />
            <p style={{ "fontWeight": "600", "textTransform": "capitalize" }}>{author}</p>
            <p style={{ "fontWeight": "300" }}>5 hours ago</p>
        </div>
        <div className="d-flex ">
            <div className="w-75 pe-5">
                <h4 className="text-capitalize no-wrap fw-bold" style={{ "fontSize": "1.3em" }} >{title}</h4>
                <p className="d-none d-sm-block" style={{ "maxHeight": "100px", "overflow": "hidden" }}><bold>{content}
                </bold></p>
            </div>
            <div className="w-25">
                <img src="/assert/img.png" alt="" style={{ "minHeight": "50px", "width": "100%" }} />
            </div>
        </div>
        <div className="d-flex">
            <div className="d-flex gap-4">
                <p className="px-2" style={{ "fontSize": "15px", "fontWeight": "400", "backgroundColor": "lightgray", "borderRadius": "20px" }}>{category}</p>
                <p >{Math.round(content.length / 100)} min read</p>
            </div>
            <div></div>
        </div>
        <hr />
    </div>);
}

export default BlogCard;