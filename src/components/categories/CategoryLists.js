import React from 'react'
import { withRouter } from 'react-router-dom'

const CategoryLists = (props) => {

    const { cats } = props

    return (
        <tr>
            <td>
                {cats.title}
            </td>
            <td>{cats.text}</td>
            <td>
                <button
                    className="btn rounded-0 border-0 text-dark"
                    onClick={() => props.history.push(`/edit-category/${cats.id}`)}
                >
                    Edit
                </button>
            </td>
        </tr>
    )
}

export default withRouter(CategoryLists)
