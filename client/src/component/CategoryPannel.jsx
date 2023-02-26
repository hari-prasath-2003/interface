import "./component.css"
const CategoryPannel = ({ setCategory }) => {
    return (
        <div className="pe-0 pe-sm-5">
            <div className="d-flex  align-items-center gap-3 gap-md-5 justify-content-center  justify-content-md-start no-wrap">

                <p className="lead c-link" onClick={() => { setCategory("/") }} style={{ "fontSize": "1.2em", "color": "black" }}>For you</p>
                <p className="lead" style={{ "fontSize": "1.2em", "color": "black" }}>Educational</p>

                <p className="lead" style={{ "fontSize": "1.2em", "color": "black" }}>Science</p>

                <p className="lead" style={{ "fontSize": "1.2em", "color": "black" }}>Technology</p>

            </div>
            <hr />
        </div>

    );
}

export default CategoryPannel;