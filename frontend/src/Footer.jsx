import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Brand & Mission Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <span className={styles.brandIcon}>🛍️</span>
            <span className={styles.brandName}>ShopSphere</span>
          </div>
          <p className={styles.brandDesc}>
            Enterprise cloud e-commerce platform built with React, Express, Supabase PostgreSQL, and MongoDB Atlas.
          </p>
          <div className={styles.statusRow}>
            <a 
              href="https://stats.uptimerobot.com/4foTT9R59k" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.statusPill}
            >
              <span className={styles.statusDot}></span>
              <span>All Cloud Systems Operational</span>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linkList}>
            <li><Link to="/" className={styles.footerLink}>Home</Link></li>
            <li><Link to="/products" className={styles.footerLink}>Products Catalog</Link></li>
            <li><Link to="/cart" className={styles.footerLink}>Shopping Cart</Link></li>
            <li><Link to="/profile" className={styles.footerLink}>My Account</Link></li>
          </ul>
        </div>

        {/* Cloud Architecture Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Cloud Architecture</h4>
          <ul className={styles.linkList}>
            <li><span className={styles.techTag}>Vercel Edge PaaS</span></li>
            <li><span className={styles.techTag}>Supabase PostgreSQL SaaS</span></li>
            <li><span className={styles.techTag}>MongoDB Atlas SaaS</span></li>
            <li><span className={styles.techTag}>Kubernetes Multi-Cloud</span></li>
          </ul>
        </div>

        {/* Project Info Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Project Information</h4>
          <p className={styles.infoText}><strong>Student ID:</strong> EYOUTH-31007200201119</p>
          <p className={styles.infoText}><strong>Student:</strong> Younes Aly</p>
          <p className={styles.infoText}><strong>Initiative:</strong> DECI Level 5 Final Project</p>
          <a 
            href="https://github.com/Younes-235/EYOUTH-31007200201119-ShopSphere-fullstack-ecommerce-cloud-younes-aly"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            GitHub Repository →
          </a>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <p>© 2026 ShopSphere Cloud Modernization. Developed by Younes Aly (EYOUTH-31007200201119).</p>
      </div>
    </footer>
  );
}
