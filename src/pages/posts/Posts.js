import React from 'react'
import Layout from '../../components/layout/Layout'
import { withRouter } from 'react-router-dom'
import { db } from '../../config/firebase'
import PostLists from '../../components/posts/PostLists'

const Posts = (props) => {

    const [items,setItems] = React.useState([])
    const _isMounted = React.useRef(false)

    React.useEffect(() => {
        db 
        .ref('posts')
        .orderByChild('date')
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

            const data = lists.reverse()

            if(!_isMounted.current) {
                setItems(data)
            }
        })


        return () => { _isMounted.current = true }

    }, [])

    const listData = (
        <div className="mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Text</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((s) => (
                            <PostLists key={s.id} posts={s} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

    return (
        <Layout>
            <div>
                <h4>Posts</h4>
                <button 
                    className="btn rounded-0 border-0 shadow-none p-0"
                    onClick={() => props.history.push('/add-post')}
                >
                    Add new
                </button>
                {listData}
            </div>
        </Layout>
    )
}

export default withRouter(Posts)
