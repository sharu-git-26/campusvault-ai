import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalReviews: 0,
    publicResources: 0,
    privateResources: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  const fetchAdminData = async () => {
    try {
      const [usersRes, resourcesRes, reviewsRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/resources"),
        api.get("/admin/reviews"),
      ]);

      setUsers(usersRes.data);
      setResources(resourcesRes.data);
      setReviews(reviewsRes.data);

      const publicCount = resourcesRes.data.filter(
        (r) => r.privacy === "public"
      ).length;

      const privateCount = resourcesRes.data.filter(
        (r) => r.privacy === "private"
      ).length;

      setStats({
        totalUsers: usersRes.data.length,
        totalResources: resourcesRes.data.length,
        totalReviews: reviewsRes.data.length,
        publicResources: publicCount,
        privateResources: privateCount,
      });

      setLoading(false);
    } catch (error) {
      console.error("Admin Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const deleteResource = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return;
    try {
      await api.delete(`/admin/resources/${id}`);
      fetchAdminData();
      alert("Resource deleted successfully");
    } catch (error) {
      alert("Error deleting resource");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      fetchAdminData();
      alert("User removed successfully");
    } catch (error) {
      alert("Error deleting user");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/admin/reviews/${id}`);
      fetchAdminData();
      alert("Review deleted");
    } catch (error) {
      alert("Error deleting review");
    }
  };

  if (loading) {
    return <div className="loading">Loading Admin Panel...</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">🛠 CampusVault AI - Admin Panel</h1>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button onClick={() => setActiveTab("dashboard")}>
          📊 Dashboard
        </button>
        <button onClick={() => setActiveTab("users")}>
          👥 Users
        </button>
        <button onClick={() => setActiveTab("resources")}>
          📚 Resources
        </button>
        <button onClick={() => setActiveTab("reviews")}>
          ⭐ Reviews
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" && (
        <div className="stats-grid">
          <div className="stat-card">
            <h2>{stats.totalUsers}</h2>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalResources}</h2>
            <p>Total Resources</p>
          </div>
          <div className="stat-card">
            <h2>{stats.totalReviews}</h2>
            <p>Total Reviews</p>
          </div>
          <div className="stat-card">
            <h2>{stats.publicResources}</h2>
            <p>Public Resources</p>
          </div>
          <div className="stat-card">
            <h2>{stats.privateResources}</h2>
            <p>Private Resources</p>
          </div>
        </div>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="table-container">
          <h2>👥 User Management</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.college}</td>
                  <td>{user.branch}</td>
                  <td>{user.semester}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* RESOURCES TAB */}
      {activeTab === "resources" && (
        <div className="table-container">
          <h2>📚 Resource Moderation</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Privacy</th>
                <th>Uploader</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((res) => (
                <tr key={res.id}>
                  <td>{res.title}</td>
                  <td>{res.subject}</td>
                  <td>{res.resource_type}</td>
                  <td>
                    <span
                      className={
                        res.privacy === "public"
                          ? "badge-public"
                          : "badge-private"
                      }
                    >
                      {res.privacy}
                    </span>
                  </td>
                  <td>{res.uploader_name}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteResource(res.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === "reviews" && (
        <div className="table-container">
          <h2>⭐ Review Monitoring</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Resource</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td>{rev.user_name}</td>
                  <td>{rev.resource_title}</td>
                  <td>⭐ {rev.rating}</td>
                  <td>{rev.comment}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteReview(rev.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
