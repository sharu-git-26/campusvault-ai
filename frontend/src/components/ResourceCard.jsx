import React from "react";
import { useNavigate } from "react-router-dom";

const ResourceCard = ({ resource, currentUser }) => {
  const navigate = useNavigate();

  // Access control logic (MANDATORY HACKATHON FEATURE)
  const hasAccess =
    resource.privacy === "public" ||
    (currentUser &&
      currentUser.college === resource.uploader_college);

  const handleView = () => {
    if (!hasAccess) {
      alert(
        `🔒 This resource is private and only available to ${resource.uploader_college} students`
      );
      return;
    }
    navigate(`/resource/${resource.id}`);
  };

  const handleDownload = () => {
    if (!hasAccess) {
      alert(
        `❌ Access Denied! This resource is private to ${resource.uploader_college}`
      );
      return;
    }
    window.open(resource.file_url, "_blank");
  };

  const getPrivacyColor = () => {
    return resource.privacy === "public"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rounded ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="resource-card">
      {/* Header */}
      <div className="card-header">
        <h3 className="resource-title">{resource.title}</h3>
        <span className={`privacy-badge ${getPrivacyColor()}`}>
          {resource.privacy === "public" ? "🌍 Public" : "🏫 Private"}
        </span>
      </div>

      {/* Subject & Type */}
      <div className="meta-section">
        <p>
          <strong>📚 Subject:</strong> {resource.subject}
        </p>
        <p>
          <strong>📄 Type:</strong> {resource.resource_type}
        </p>
        <p>
          <strong>🎓 Semester:</strong> Sem {resource.semester}
        </p>
        <p>
          <strong>🏫 College:</strong> {resource.uploader_college}
        </p>
      </div>

      {/* Tags */}
      <div className="tags-container">
        {resource.tags &&
          resource.tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
      </div>

      {/* Rating Section (Hackathon Mandatory Feature) */}
      <div className="rating-section">
        <div className="stars">{renderStars(resource.average_rating)}</div>
        <span className="rating-text">
          {resource.average_rating
            ? `${resource.average_rating.toFixed(1)} / 5`
            : "No Ratings Yet"}
        </span>
      </div>

      {/* Description */}
      <p className="description">
        {resource.description
          ? resource.description.substring(0, 100) + "..."
          : "No description provided."}
      </p>

      {/* Footer Buttons */}
      <div className="card-footer">
        <button className="view-btn" onClick={handleView}>
          👁 View Details
        </button>

        <button
          className={`download-btn ${
            !hasAccess ? "disabled-btn" : ""
          }`}
          onClick={handleDownload}
          disabled={!hasAccess}
        >
          ⬇ Download
        </button>
      </div>

      {/* Access Warning */}
      {!hasAccess && (
        <div className="access-warning">
          🔒 Private resource (College Restricted Access)
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
