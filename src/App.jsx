import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Students from './pages/Students.jsx';
import StudentDetails from './pages/StudentDetails.jsx';
import Interventions from './pages/Interventions.jsx';
import Volunteers from './pages/Volunteers.jsx';
import Resources from './pages/Resources.jsx';
import Villages from './pages/Villages.jsx';
import Impact from './pages/Impact.jsx';
import Attendance from './pages/Attendance.jsx';
import Learning from './pages/Learning.jsx';
import RiskAlerts from './pages/RiskAlerts.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/:id" element={<StudentDetails />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="learning" element={<Learning />} />
          <Route path="interventions" element={<Interventions />} />
          <Route path="risk-alerts" element={<RiskAlerts />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="resources" element={<Resources />} />
          <Route path="villages" element={<Villages />} />
          <Route path="impact" element={<Impact />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
