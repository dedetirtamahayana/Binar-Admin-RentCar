import {Navigate} from "react-router";

import Dashboard from "../pages/Dashboard/Dashboard";
import AddCar from "../pages/AddCar/AddCar";
import ViewCar from "../components/ViewCar/ViewCar";
import EditCar from "../pages/EditCar/EditCar";
import LoginAdmin from "../pages/LoginAdmin/LoginAdmin";
import {useSelector} from "react-redux";
const Routes = () => {
    const {isAuthAdmin} = useSelector((state) => state.authAdminStore);
    return [
        {
            path: "/login-admin",
            element: <LoginAdmin/>
        }, {
            path: "/",
            element: <LoginAdmin/>
        }, {
            path: "/dashboard",
            element: isAuthAdmin ? <Dashboard /> : <Navigate to="/login-admin" />
        }, {
            path: "/view-car",
            element: isAuthAdmin ? <ViewCar /> : <Navigate to="/login-admin" />
        }, {
            path: "/add-car",
            element: isAuthAdmin ? <AddCar /> : <Navigate to="/login-admin" />
        }, {
            path: "/edit-car/:id",
            element: <EditCar/>
        }
    ];
};

export default Routes;
