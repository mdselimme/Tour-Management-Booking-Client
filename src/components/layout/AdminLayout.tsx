
import { Outlet } from 'react-router';

const AdminLayout = () => {
    return (
        <div>
            Admin
            <Outlet />
        </div>
    );
};

export default AdminLayout;