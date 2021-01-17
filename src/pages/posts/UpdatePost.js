import React from 'react'
import Layout from '../../components/layout/Layout'
import { withRouter } from 'react-router-dom'
import { db, MEDIA, POST_IMG_URL, storage } from '../../config/firebase'

const UpdatePost = (props) => {
    
    const [title,setTitle] = React.useState('')
    const [text,setText] = React.useState('')
    const [image,setImage] = React.useState('')
    const [categories,setCategories] = React.useState([])
    const [items,setItems] = React.useState([])
    const [item,setItem] = React.useState(null)
    const [imagePreview,setImagePreview] = React.useState(null)
    const { id } = props.match.params

    const updatePost = e => {
        e.preventDefault()

        const itemCat = item ? item.categories : null

        if(image) {
            const inputData = {
                title,
                text
            }
    
            db 
            .ref(`posts/${id}`)
            .update(inputData, () => {
                props.history.push('/posts')
            })
        }

        if(image.name) {
            const inputData = {
                image: image.name
            }
    
            storage 
            .ref('posts')
            .child(image.name)
            .put(image, { contentType: 'image/jpeg' })
    
            db 
            .ref(`posts/${id}`)
            .update(inputData, () => {
                props.history.push('/posts')
            })
        }

        if(categories !== itemCat) {
            const categoryList = JSON.parse('[' + categories + ']')

            const inputData = {
                categories: categoryList
            }
    
            db 
            .ref(`posts/${id}`)
            .update(inputData, () => {
                props.history.push('/posts')
            })
        }
    }

    const deletePost = e => {
        e.preventDefault()

        storage 
        .ref('posts')
        .child(`/${image}`)
        .delete()
        .then(() => {})
        .catch(() => {})

        db 
        .ref(`posts/${id}`)
        .remove(() => {
            props.history.push('/posts')
        })
    }

    React.useEffect(() => {
        db 
        .ref(`posts/${id}`)
        .on('value', (snap) => {
            const lists = snap.val()
            
            setItem(lists)
            setTitle(lists ? lists.title : '')
            setText(lists ? lists.text : '')
            setImage(lists ? lists.image : '')
            setCategories(lists ? lists.categories : '')
        })

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

    }, [id])

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
                        image ? (
                            <div 
                                onClick={() => {
                                    setImage('')
                                    setImagePreview(null)
                                }}
                            >
                                <img 
                                    src={POST_IMG_URL + image + MEDIA}
                                    alt=""
                                    width="150"
                                />
                            </div>  
                        ) : (
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
                        )
                    ) : fPreview
                }
            </div>
            <div className="mb-3">
                <label
                    htmlFor="categories"
                    className="form-label"
                >
                    Categories 
                </label>
                <p>
                    {
                        item ? item.categories.map(s => (
                            <small key={s.id}>{s.title} ,</small>
                        )) : null
                    }
                </p>
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
                    onClick={updatePost}
                >
                    Update
                </button>
                <button 
                    className="btn rounded-0 border-0 shadow-none bg-danger text-light px-5 py-2 ms-2"
                    onClick={deletePost}
                >
                    Delete
                </button>
            </div>
        </div>
    )

    return (
        <Layout>
            <div>
                <h4>Edit</h4>
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

export default withRouter(UpdatePost)
