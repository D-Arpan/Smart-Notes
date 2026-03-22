"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotesHeroSectionProps {
  onRegister: () => void;
  onLogin: () => void;
}

export function NotesHeroSection({
  onRegister,
  onLogin
}: NotesHeroSectionProps) {
  return (
    <section className="hero-section">
      <Card className="hero-card">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-kicker">Smart notes</div>
            <h1 className="hero-title">
              A calmer notes space for your ideas, plans, and daily writing.
            </h1>
            <p className="hero-copy">
              Create an account or sign back in to continue with a private notes
              workspace designed to feel clear, focused, and easy to use.
            </p>

            <div className="hero-actions">
              <Button onClick={onRegister} type="button">
                Create account
              </Button>
              <Button onClick={onLogin} type="button" variant="ghost">
                Sign in
              </Button>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <span className="hero-metric__value">Private</span>
                <span className="hero-metric__label">Notes stay tied to your account</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric__value">Focused</span>
                <span className="hero-metric__label">Read, search, and edit without clutter</span>
              </div>
            </div>
          </div>

          <div className="hero-aside">
            <div className="hero-preview">
              <div className="hero-preview__header">
                <span className="hero-preview__badge">Welcome</span>
                <strong className="hero-preview__title">Your workspace is ready when you are</strong>
              </div>

              <div className="hero-preview__panel">
                <div className="hero-preview__row">
                  <span className="hero-preview__row-label">Account access</span>
                  <span className="hero-preview__row-value">Register or login</span>
                </div>
                <div className="hero-preview__row">
                  <span className="hero-preview__row-label">Notes experience</span>
                  <span className="hero-preview__row-value">Create, view, edit, delete</span>
                </div>
                <div className="hero-preview__row">
                  <span className="hero-preview__row-label">Reading flow</span>
                  <span className="hero-preview__row-value">Large modal for longer notes</span>
                </div>
              </div>

              <div className="hero-feature-list">
                <div className="hero-feature">
                  <strong>Private by account</strong>
                  <p>Each user sees only the notes created under their own account.</p>
                </div>
                <div className="hero-feature">
                  <strong>Secure access</strong>
                  <p>Registration, login, and token-based access protect your workspace.</p>
                </div>
                <div className="hero-feature">
                  <strong>Focused workflow</strong>
                  <p>Create, search, read, edit, and delete notes from one clean interface.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
