import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import WorkerRegister from "./pages/WorkerRegister";
import EmployerRegister from "./pages/EmployerRegister";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployeeDashboard";
import PostJob from "./pages/PostJob";
import AvailableJobs from "./pages/AvailableJobs";
import Applicants from "./pages/Applicants";
import MyApplications from "./pages/MyApplications";
import MyJobs from "./pages/MyJobs";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import BrowseWorkers from "./pages/BrowseWorkers";
import WorkerDetails from "./pages/WorkerDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/worker-register" element={<WorkerRegister />} />
        <Route path="/employer-register" element={<EmployerRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-jobs"
          element={
            <ProtectedRoute role="worker">
              <AvailableJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants"
          element={
            <ProtectedRoute role="employer">
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute role="worker">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute role="employer">
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/browse-workers"
          element={<BrowseWorkers />}
        />

        <Route
          path="/worker/:id"
          element={<WorkerDetails />}
        />
      </Routes>
    </>
  );
}

export default App;