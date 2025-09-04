import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import toast from "react-hot-toast"

function App() {
    return (
        <div className="App">
            <button class="btn btn-primary">Button</button>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/create" element={<CreatePage/>} />
                <Route path="/note/:id" element={<NoteDetailPage/>} />
            </Routes>
        </div>
    )
}

export default App
