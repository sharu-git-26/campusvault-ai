import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ReviewSection from "../components/ReviewSection";
import "../styles.css";

const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const fetchResource = async () => {
    try {
      const res = await api.get(`/resources/${id}`);
      setResource(res.data);
    } catch (error) {
      console.error("Error fetching resource:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloadLoading(true);
      const response = await api.get(
        `/resources/download/${id}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", resource.title);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert("Download failed");
    } finally {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    fetchResource();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading Resource Details...</div>;
  }

  if (!resource) {
    return <div className="error-box">Resource not found</div>;
  }

  return (
    <div className="resource-detail-container">
      <div className="resource-header">
        <h1>📚 {resource.title}</h1>
        <span className="badge">{resource.resource_type}</span>
      </div>

      <div className="resource-meta">
        <p><strong>Subject:</strong> {resource.subject}</p>
        <p><strong>Uploaded By:</strong> {resource.uploader_name}</p>
        <p><strong>Branch:</strong> {resource.branch}</p>
        <p><strong>Semester:</strong> {resource.semester}</p>
        <p><strong>Downloads:</strong> {resource.downloads}</p>
        <p><strong>Average Rating:</strong> ⭐ {resource.avg_rating || 0}</p>
      </div>

      <div className="resource-description">
        <h3>Description</h3>
        <p>{resource.description}</p>
      </div>

      <div className="resource-actions">
        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={downloadLoading}
        >
          {downloadLoading ? "Downloading..." : "⬇ Download Resource"}
        </button>
      </div>

      <div className="review-section">
        <h2>⭐ Reviews & Ratings</h2>
        <ReviewSection resourceId={id} />
      </div>
    </div>
  );
};

export default ResourceDetail;
