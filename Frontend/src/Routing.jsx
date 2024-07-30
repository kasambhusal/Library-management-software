import { createBrowserRouter } from 'react-router-dom'
import Home from './public/Home';
import Root from './public/Root';
import Contact from './public/Contact'
import About from './public/About';
import Login from './public/Login';
import Dashboard from './private/Dashboard';
import ModifyBooks from './private/ModifyBooks';
import AddAdmin from './private/AddAdmin';
import AddStudents from './private/AddStudents';
import SeeRecords from './private/SeeRecords';
import Admin from './private/Admin';
import Student from './private/Student';
import Abook from './private/Abook';
import Astudent from './private/Astudent';
import Aadmin from './private/Aadmin';
import Sguide from './private/Sguide';
import Sbook from './private/Sbook';
import Srecords from './private/Srecords';
import Aguide from './private/Aguide';
import Lbook from './private/Lbook';
import ChangePassword from './private/ChangePassword';
import ForgotPassword from './public/ForgotPassword';
import Notification from './private/Notification';
const Routing = ({ isAuthenticated, handleLogout, setIsAuthenticated }) => {

    return createBrowserRouter([
        {
            element: <Root isAuthenticated={isAuthenticated} handleLogout={handleLogout} />,
            path: "/",
            children: [
                {
                    element: <Home setIsAuthenticated={setIsAuthenticated} />,
                    path: "/",
                    index: true
                },
                {
                    element: <About setIsAuthenticated={setIsAuthenticated} />,
                    path: "/about"
                },
                {
                    element: <Contact setIsAuthenticated={setIsAuthenticated} />,
                    path: "/contact"
                },
                {
                    element: <Login setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />,
                    path: "/login"
                }
                ,
                {
                    element: <ChangePassword />,
                    path: "/changepassword"
                }
                ,
                {
                    element: <ForgotPassword setIsAuthenticated={setIsAuthenticated} />,
                    path: "/forgotpassword"
                },
                {
                    element: <Dashboard setIsAuthenticated={setIsAuthenticated} />,
                    path: "/dashboard",
                    children: [
                        {
                            element: <Admin />,
                            path: "/dashboard/1/",
                            children: [

                                {
                                    element: < Aguide />,
                                    path: "/dashboard/1/",
                                    index: true
                                },
                                {
                                    element: <ModifyBooks />,
                                    path: "/dashboard/1/modifybooks"
                                },
                                {
                                    element: <AddAdmin />,
                                    path: "/dashboard/1/addadmin"
                                },
                                {
                                    element: <AddStudents />,
                                    path: "/dashboard/1/addstudents"
                                },
                                {
                                    element: <SeeRecords />,
                                    path: "/dashboard/1/seerecords"
                                },
                                {
                                    element: < Notification />,
                                    path: "/dashboard/1/notification"
                                }
                            ]
                        },
                        {
                            element: <Student />,
                            path: "/dashboard/2",
                            children: [
                                {
                                    element: <Sguide />,
                                    path: "/dashboard/2",
                                    index: true
                                },
                                {
                                    element: <Sbook />,
                                    path: "/dashboard/2/sbook"
                                },
                                {
                                    element: <Srecords />,
                                    path: "/dashboard/2/srecords"
                                },
                                {
                                    element: < Notification />,
                                    path: "/dashboard/2/notification"
                                }

                            ]
                        },

                        {
                            element: <Abook />,
                            path: "/dashboard/abook"
                        }
                        ,
                        {
                            element: <Astudent />,
                            path: "/dashboard/astudent"
                        }
                        ,
                        {
                            element: <Aadmin />,
                            path: "/dashboard/aadmin"
                        }
                        ,
                        {
                            element: <Lbook />,
                            path: "/dashboard/lbook/:id"
                        }


                    ]

                }
            ]
        }

    ])
}
export default Routing;