import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useRef } from 'react';
const Write = () => {
    const [value, setValue] = useState("");
    const quillObj = useRef("")
    console.log(value);
    const modules = {
        toolbar: {
            container: [
                [{ font: ["Roboto"] }],
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
            let formData = new FormData();

            formData.append('image', file);

            var currentdate = new Date();
            var fileNamePredecessor = currentdate.getDate().toString() + currentdate.getMonth().toString() + currentdate.getFullYear().toString() + currentdate.getTime().toString();

            const fileName = fileNamePredecessor + file.name;
            file = new Uint8Array(await file.arrayBuffer())
            fetchUpload(file, fileName)


        };
    }
    async function fetchUpload(file, fileName) {
        console.log(fileName);
        const authToken = document.cookie.replace("Authorisation =", "")
        const validTime = new Date().getTime()
        const URLPolicy = "upload"
        console.log("hi");
        for (let i = 0; i < (file.length / 30000); i++) {
            const data = file.slice(i * 30000, i * 30000 + 30000)
            await fetch("http://localhost:3000/uploadImg", { method: "POST", body: data, headers: { "Authorization": authToken, "URLPolicy": URLPolicy, "validTime": validTime, "fileName": fileName } })
        }


        const range = quillObj.current.getEditor().getSelection()
        var res = "http://localhost:3000/image/" + fileName

        quillObj.current.getEditor().insertEmbed(range.index, 'image', res);
        const length = quillObj.current.getEditor().getLength()
        quillObj.current.getEditor().insertText(length + 1, "\n")
        quillObj.current.getEditor().setSelection(length, 0)

    }

    return <div className='container-fluid w-100 p-sm-5 p-2 d-flex flex-column align-items-end gap-3' style={{ "height": "80vh" }}>
        <button type='button' className='btn btn-primary' style={{ "width": "100px" }}>UPLOAD</button>
        <ReactQuill className='w-100 h-100' modules={modules} ref={quillObj} theme="snow" placeholder="Content goes here..." />
    </div>
}


export default Write;