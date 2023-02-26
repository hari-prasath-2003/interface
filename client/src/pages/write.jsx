import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useRef } from 'react';
const Write = () => {

    const [blogContent, setBlogContent] = useState("");
    const [next, setNext] = useState(false)
    const title = useRef("")
    const category = useRef("")
    const keyword = useRef("")
    const [thumbnail, setThumbnail] = useState(false)
    const quillObj = useRef("")
    const ip = "192.168.190.213"
    const modules = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
                ["link", "image", "video"],
                ["clean"],
            ],
            handlers: {
                image: uploadImg
            }
        }

    };

    function uploadImg() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            let file = input.files[0];
            var currentdate = new Date();
            var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();
            const fileName = fileNamePredecessor + file.name;
            file = new Uint8Array(await file.arrayBuffer())
            fetchUpload(file, fileName)


        };
    }
    async function fetchUpload(file, fileName) {
        const authToken = document.cookie.replace("Authorisation =", "")
        const validTime = new Date().getTime()
        const URLPolicy = "upload"
        for (let i = 0; i < (file.length / 30000); i++) {
            const data = file.slice(i * 30000, i * 30000 + 30000)
            await fetch("http://" + ip + ":3000/uploadImg", { method: "POST", body: data, headers: { "Authorization": authToken, "URLPolicy": URLPolicy, "validTime": validTime, "fileName": fileName } })
        }
        insertImg(fileName)


    }
    function insertImg(fileName) {
        const range = quillObj.current.getEditor().getSelection()
        var res = "http://" + ip + ":3000/image/" + fileName

        quillObj.current.getEditor().insertEmbed(range.index, 'image', res);
        const length = quillObj.current.getEditor().getLength()
        quillObj.current.getEditor().insertText(length + 1, "\n")
        quillObj.current.getEditor().setSelection(length, 0)
    }

    function uploadThumbnail(setThumbnail) {
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "image/*")
        input.click()
        input.onchange = async () => {

            let file = input.files[0]
            var currentdate = new Date();
            var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();
            const fileName = fileNamePredecessor + file.name;
            file = new Uint8Array(await file.arrayBuffer())
            const authToken = document.cookie.replace("Authorisation =", "")
            const validTime = new Date().getTime()
            const URLPolicy = "upload"
            for (let i = 0; i < (file.length / 30000); i++) {
                const data = file.slice(i * 30000, i * 30000 + 30000)
                await fetch("http://" + ip + ":3000/uploadImg", { method: "POST", body: data, headers: { "Authorization": authToken, "URLPolicy": URLPolicy, "validTime": validTime, "fileName": fileName } })
            }
            setThumbnail("http://" + ip + ":3000/image/" + fileName)


        }



    }
    function publishBlog() {
        const authToken = document.cookie.replace("Authorisation =", "")
        fetch("http://" + ip + ":3000/createBlog", { method: "POST", body: JSON.stringify({ content: blogContent, title: title.current.value, thumbnail: thumbnail, category: category.current.value, keyword: keyword.current.value, }), headers: { "Authorization": authToken, "Content-Type": "application/json" } })
    }
    return (
        <div>

            <div className={`container-fluid w-100 p-sm-5 p-2 py-4 d-flex flex-column align-items-end gap-3 d-${!next ? "block" : "none"}`} style={{ "height": "80vh" }}>
                <button type='button' onClick={() => { setBlogContent(quillObj.current.value); setNext(true) }} className='btn btn-primary' style={{ "width": "100px", "backgroundColor": "rgba(55, 74, 247, 0.808)", "fontWeight": "bold" }}>NEXT</button>
                <ReactQuill className='w-100 h-100' modules={modules} ref={quillObj} theme="snow" placeholder="Content goes here..." />


            </div>
            <div className={`container-sm px-sm-5 p-3 d-flex flex-column gap-2 d-${next ? "block" : "none"}`}>
                <textarea ref={title} type="text" placeholder='Title : minimum 100 letter' maxLength={150} className='form-controll p-2 px-3 wrap max-w-100' style={{ "height": "70px" }} />
                <input ref={category} type="text" placeholder='Category of the blog' maxLength={20} className='form-controll p-2 px-3 wrap max-w-100' />
                <input ref={keyword} type="text" placeholder='Keyword for the blog' maxLength={20} className='form-controll p-2 px-3 wrap max-w-100' />

                <div className="d-flex align-items-center justify-content-center" style={{ "border": "2px dashed grey", "minHeight": "400px", "maxHeight": "400px" }}><p className={`d-${thumbnail ? "none" : "block"}`}>Thumbnail</p><img className={`d-${thumbnail ? "block" : "none"}`} src={thumbnail} alt="" style={{ "minHeight": "200px", "maxHeight": "200px" }} /></div>
                <button type='button' onClick={() => { uploadThumbnail(setThumbnail) }} className='btn btn-primary' style={{ "backgroundColor": "rgba(55, 74, 247, 0.808)", "fontWeight": "bold" }}>UPLOAD THUMBNAIL</button>
                <button type='button' onClick={() => { publishBlog() }} className='btn btn-primary' style={{ "backgroundColor": "rgba(55, 74, 247, 0.808)", "fontWeight": "bold" }}>PUBLISH</button>

            </div>

        </div>
    )
}


export default Write;