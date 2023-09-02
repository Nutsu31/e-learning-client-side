import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import VideoUpload from "./pages/VideoUpload";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route index element={<Root />} />
      <Route path='/new-post' element={<VideoUpload />} />
      <Route path='/post/:id' element={<VideoUpload />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
