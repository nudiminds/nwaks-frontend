import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import ShaaleAbout from "./pages/ShaaleAbout"
import ShaaleTeam from "./pages/ShaaleTeam"
import ShaaleClasses from "./pages/ShaaleClasses"
import AboutNWAKS from "./pages/AboutNWAKS"
import BoardOfDirectors from "./pages/BoardOfDirectors"
import BoardOfExecutives from "./pages/BoardOfExecutives"
import CoreCommittee from "./pages/CoreCommittee"
import Membership from "./pages/Membership"
import Media from "./pages/Media"
import Contact from "./pages/Contact"
import CommunityAwards from "./pages/CommunityAwards"
import Rajyothsava from "./pages/Rajyothsava"
import CommunitySupport from "./pages/CommunitySupport"
import CommunityInitiatives from "./pages/CommunityInitiatives"
import UpcomingEvents from "./pages/UpcomingEvents"
import PastEvents from "./pages/PastEvents"
import Sponsors from "./pages/Sponsors"

import AdminLogin from "./admin/pages/AdminLogin"
import Dashboard from "./admin/pages/Dashboard"
import ProtectedRoute from "./admin/components/ProtectedRoute"
import EventsList from "./admin/pages/EventsList"
import CreateEvent from "./admin/pages/CreateEvent"
import EditEvent from "./admin/pages/EditEvent"
import AdminSponsors from "./admin/pages/Sponsors"
import CreateSponsor from "./admin/pages/CreateSponsor"
import EditSponsor from "./admin/pages/EditSponsor"
import CreateAdvertisement from "./admin/pages/CreateAdvertisement"
import AdminAdvertisements from "./admin/pages/Advertisements"
import EditAdvertisement from "./admin/pages/EditAdvertisements"
import AdminMedia from "./admin/pages/MediaManager"
import CreateMedia from "./admin/pages/CreateMedia"
import EditMedia from "./admin/pages/EditMedia"

function App() {
  return (
    <><Toaster position="top-right" reverseOrder={false} />
    <Routes>

      {/* PUBLIC WEBSITE */}
      <Route
        path="/"
        element={<MainLayout>
          <Home />
        </MainLayout>} />

      <Route path="/kannada-shaale/about" element={<MainLayout><ShaaleAbout /></MainLayout>} />
      <Route path="/kannada-shaale/team" element={<MainLayout><ShaaleTeam /></MainLayout>} />
      <Route path="/kannada-shaale/classes" element={<MainLayout><ShaaleClasses /></MainLayout>} />

      <Route path="/about" element={<MainLayout><AboutNWAKS /></MainLayout>} />
      <Route path="/board-of-directors" element={<MainLayout><BoardOfDirectors /></MainLayout>} />
      <Route path="/board-of-executives" element={<MainLayout><BoardOfExecutives /></MainLayout>} />
      <Route path="/core-committee" element={<MainLayout><CoreCommittee /></MainLayout>} />
      <Route path="/membership" element={<MainLayout><Membership /></MainLayout>} />
      <Route path="/media" element={<MainLayout><Media /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

      <Route path="/community-awards" element={<MainLayout><CommunityAwards /></MainLayout>} />
      <Route path="/rajyothsava" element={<MainLayout><Rajyothsava /></MainLayout>} />

      <Route path="/community-support" element={<MainLayout><CommunitySupport /></MainLayout>} />
      <Route path="/community-initiatives" element={<MainLayout><CommunityInitiatives /></MainLayout>} />

      <Route path="/upcoming-events" element={<MainLayout><UpcomingEvents /></MainLayout>} />
      <Route path="/past-events" element={<MainLayout><PastEvents /></MainLayout>} />

      <Route path="/sponsors" element={<MainLayout><Sponsors /></MainLayout>} />


      {/* ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
      <Route
        path="/admin/events"
        element={<ProtectedRoute>
          <EventsList />
        </ProtectedRoute>} />
      <Route
        path="/admin/events/create"
        element={<ProtectedRoute>
          <CreateEvent />
        </ProtectedRoute>} />
      <Route
        path="/admin/events/edit/:id"
        element={<ProtectedRoute>
          <EditEvent />
        </ProtectedRoute>} />
      <Route path="/admin/sponsors" element={<ProtectedRoute><AdminSponsors /></ProtectedRoute>} />
      <Route path="/admin/sponsors/create" element={<ProtectedRoute><CreateSponsor /></ProtectedRoute>} />
      <Route path="/admin/sponsors/edit/:id" element={<ProtectedRoute><EditSponsor /></ProtectedRoute>} />

      <Route path="/admin/advertisements" element={<ProtectedRoute><AdminAdvertisements /></ProtectedRoute>} />
      <Route path="/admin/advertisements/create" element={<ProtectedRoute><CreateAdvertisement /></ProtectedRoute>} />
      <Route
        path="/admin/advertisements/edit/:id"
        element={<ProtectedRoute>
          <EditAdvertisement />
        </ProtectedRoute>} />

      <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
      <Route path="/admin/media/create" element={<ProtectedRoute><CreateMedia /></ProtectedRoute>} />
      <Route
        path="/admin/media/edit/:id"
        element={<ProtectedRoute>
          <EditMedia />
        </ProtectedRoute>} />
    </Routes></>
    
  )
}

export default App