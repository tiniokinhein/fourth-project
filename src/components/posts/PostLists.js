import React from 'react'
import { withRouter } from 'react-router-dom'
import { MEDIA, POST_IMG_URL } from '../../config/firebase'

const PostLists = (props) => {

    const { posts } = props

    return (
        <tr>
            <td>
                <img 
                    src={POST_IMG_URL + posts.image + MEDIA}
                    alt=""
                    width="50"
                /><br />
                {posts.title}
            </td>
            <td>{posts.text}</td>
            <td>
                <button
                    className="btn rounded-0 border-0 text-dark"
                    onClick={() => props.history.push(`/edit-post/${posts.id}`)}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default withRouter(PostLists)
