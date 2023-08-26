import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Success from "./Success";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Login />} />
                <Route index path='/success' element={<Success />} />
            </Routes>
        </BrowserRouter>
    )

}