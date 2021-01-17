import React from 'react'
import { BrowserRouter as Router , Switch , Route , Redirect } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Posts from './pages/posts/Posts'
import AddPost from './pages/posts/AddPost'
import UpdatePost from './pages/posts/UpdatePost'
import { auth } from './config/firebase'
import Login from './pages/Login'
import UpdateCategory from './pages/categories/UpdateCategory'
import Categories from './pages/categories/Categories'
import AddCategory from './pages/categories/AddCategory'


import './assets/css/style.css'

const App = () => {

  const [loading,setLoading] = React.useState(true)
  const [aUser,setAUser] = React.useState(false)
  const _isMounted = React.useRef(false)

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        if(!_isMounted.current) {
          setAUser(true)
          setLoading(false)
        }
      } else {
        if(!_isMounted.current) {
          setAUser(false)
          setLoading(false)
        }
      }
    })

    return () => { _isMounted.current = true }
  }, [])

  return loading ? <p>Loading ...</p> : (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route path="/edit-post/:id" render={() => aUser ? <UpdatePost /> : <Redirect to="/login" />} />
        <Route path="/edit-category/:id" render={() => aUser ? <UpdateCategory /> : <Redirect to="/login" />} />

        <Route path="/login" render={() => !aUser ? <Login /> : <Redirect to="/dashboard" />} />
        <Route path="/dashboard" render={() => aUser ? <Dashboard /> : <Redirect to="/login" />} />
        <Route path="/posts" render={() => aUser ? <Posts /> : <Redirect to="/login" />} />
        <Route path="/add-post" render={() => aUser ? <AddPost /> : <Redirect to="/login" />} />
        <Route path="/categories" render={() => aUser ? <Categories /> : <Redirect to="/login" />} />
        <Route path="/add-category" render={() => aUser ? <AddCategory /> : <Redirect to="/login" />} />
      </Switch>
    </Router>
  )
}

export default App
