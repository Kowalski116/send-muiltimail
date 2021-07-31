import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorMail = ({ text, setText }) => {

    return (<div>
        <
            CKEditor editor={ClassicEditor}
            data={text}
            onChange={
                (event, editor) => {
                    const data = editor.getData()
                    setText(data)
                }
            }
        />
    </div>
    )
}

export default EditorMail