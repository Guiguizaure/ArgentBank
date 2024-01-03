import React from "react";
import "./featureItem.scss";

interface FeatureItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, children }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

export default FeatureItem;
