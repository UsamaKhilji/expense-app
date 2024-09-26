import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import ExpenseManager from "./components/ExpenseManager"; // Import the ExpenseManager

const queryClient = new QueryClient(); // Create a QueryClient instance

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      {/* Wrap your app with QueryClientProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/expenses" element={<ExpenseManager />} />{" "}
          {/* Add the Expense Manager route */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
