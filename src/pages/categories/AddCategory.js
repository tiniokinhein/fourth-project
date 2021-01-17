import React from 'react'
import Layout from '../../components/layout/Layout'
import { withRouter } from 'react-router-dom'
import { db } from '../../config/firebase'

const AddCategory = (props) => {

    const [title,setTitle] = React.useState('')
    const [text,setText] = React.useState('')


    const createPost = e => {
        e.preventDefault()

        const inputData = {
            title,
            text
        }

        db 
        .ref('categories')
        .push()
        .set(inputData, () => {
            props.history.push('/categories')
        })
    }

    const formList = (
        <div className="mt-5">
            <div className="mb-3">
                <label
                    htmlFor="title"
                    className="form-label"
                >Title</label>
                <input 
                    type="text"
                    name="title"  
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label
                    htmlFor="text"
                    className="form-label"
                >Text</label>
                <textarea
                    rows="5" 
                    name="text"  
                    id="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="form-control"
                />
            </div>
            <div>
                <button 
                    className="btn rounded-0 border-0 shadow-none bg-dark text-light px-5 py-2"
                    onClick={createPost}
                >
                    Save
                </button>
            </div>
        </div>
    )

    return (
        <Layout>
            <div>
                <h4>Add new</h4>
                <button 
                    className="btn rounded-0 border-0 shadow-none p-0"
                    onClick={() => props.history.push('/categories')}
                >
                    Back
                </button>
                {formList}
            </div>
        </Layout>
    )
}

export default withRouter(AddCategory)
