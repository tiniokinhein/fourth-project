import React from 'react'
import Layout from '../../components/layout/Layout'
import { withRouter } from 'react-router-dom'
import { db, storage } from '../../config/firebase'

const AddPost = (props) => {

    const [title,setTitle] = React.useState('')
    const [text,setText] = React.useState('')
    const [image,setImage] = React.useState('')
    const [imagePreview,setImagePreview] = React.useState(null)
    const [categories,setCategories] = React.useState([])
    const [items,setItems] = React.useState([])


    React.useEffect(() => {
        db 
        .ref('categories')
        .on('value', (snapshot) => {
            const lists = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const values = snap.val()
                lists.push({
                    id,
                    ...values
                })
            })

            setItems(lists)
        })
    }, [])

    const createPost = e => {
        e.preventDefault()

        const catLists = JSON.parse('[' + categories + ']')

        const inputData = {
            title,
            text,
            date: Date(new Date()),
            image: image.name,
            categories: catLists
        }

        storage
        .ref('posts')
        .child(image.name)
        .put(image, { contentType: 'image/jpeg' })

        db 
        .ref('posts')
        .push()
        .set(inputData, () => {
            props.history.push('/posts')
        })
    }

    let fPreview
    if(imagePreview) {
        fPreview = (
          <div 
            onClick={() => {
                setImage('')
                setImagePreview(null)
            }}
        >
              <img 
                src={imagePreview}
                alt=""
                width="150"
              />
          </div>  
        )
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
                    htmlFor="image"
                    className="form-label"
                >Image</label>
                {
                    imagePreview === null ? (
                        <input 
                            type="file"
                            name="image"  
                            id="image"
                            onChange={e => {
                                setImage(e.target.files[0])
                                setImagePreview(URL.createObjectURL(e.target.files[0]))
                            }}
                            className="form-control"
                        />
                    ) : fPreview
                }
            </div>
            <div className="mb-3">
                <label
                    htmlFor="categories"
                    className="form-label"
                >Categories</label>
                <select
                    name="categories"
                    id="categories"
                    value={categories}
                    onChange={e => setCategories(Array.from(e.target.selectedOptions,(item) => item.value ))}
                    className="form-select"
                    multiple
                >
                    {
                        items.map((s) => (
                            <option key={s.id} value={JSON.stringify(s)}>{s.title}</option>
                        ))
                    }
                </select>
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
                    onClick={() => props.history.push('/posts')}
                >
                    Back
                </button>
                {formList}
            </div>
        </Layout>
    )
}

export default withRouter(AddPost)
