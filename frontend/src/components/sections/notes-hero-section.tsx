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
            <div className="hero-kicker">Smart Notes</div>
            <h1 className="hero-title">
              Write clearly, stay organized, and keep every note in one calm place.
            </h1>
            <p className="hero-copy">
              Create your account once, then come back anytime to continue writing
              right where you left off.
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
                <span className="hero-metric__label">Your notes stay in your account</span>
              </div>
              <div className="hero-metric">
                <span className="hero-metric__value">Focused</span>
                <span className="hero-metric__label">Simple tools for quick writing and reading</span>
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
                  <span className="hero-preview__row-label">Start here</span>
                  <span className="hero-preview__row-value">Create account or sign in</span>
                </div>
                <div className="hero-preview__row">
                  <span className="hero-preview__row-label">Daily flow</span>
                  <span className="hero-preview__row-value">Create, update, and manage notes</span>
                </div>
                <div className="hero-preview__row">
                  <span className="hero-preview__row-label">Long notes</span>
                  <span className="hero-preview__row-value">Open in a full reading view</span>
                </div>
              </div>

              <div className="hero-feature-list">
                <div className="hero-feature">
                  <strong>Private by account</strong>
                  <p>Only you can see and manage the notes linked to your sign-in.</p>
                </div>
                <div className="hero-feature">
                  <strong>Secure sign-in</strong>
                  <p>Register once and come back to the same notes any time.</p>
                </div>
                <div className="hero-feature">
                  <strong>Clean workflow</strong>
                  <p>Everything you need to write, search, read, and edit is in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-band">
          <div className="hero-band__item">
            <span className="hero-band__label">For everyday capture</span>
            <p className="hero-band__copy">
              Save reminders, class notes, plans, and drafts in a single personal workspace.
            </p>
          </div>
          <div className="hero-band__item">
            <span className="hero-band__label">Designed for reading</span>
            <p className="hero-band__copy">
              Open any note in a larger reader when you want a distraction-free view.
            </p>
          </div>
          <div className="hero-band__item">
            <span className="hero-band__label">Built for continuity</span>
            <p className="hero-band__copy">
              Sign in and continue from your latest notes without losing your flow.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
