import { ToastContainer } from 'react-toastify';
export function Alert() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={2000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="light"
        />
    );
}
