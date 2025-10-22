import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="app">
				<Navbar />
				<main className="main-content">
					<Routes>
						<Route path="/" element={<PostList />} />
						<Route path="/create" element={<PostForm />} />
						<Route path="/posts/:id" element={<PostDetail />} />
						<Route
							path="/posts/edit/:id"
							element={<PostForm isEdit={true} />}
						/>
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
