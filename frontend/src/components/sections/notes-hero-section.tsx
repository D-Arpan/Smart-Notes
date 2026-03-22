import { Card } from "@/components/ui/card";

export function NotesHeroSection() {
  return (
    <section className="hero-section">
      <Card className="hero-card">
        <div className="hero-kicker">Smart notes</div>
        <h1 className="hero-title">
          Keep ideas, tasks, and important notes organized in one place.
        </h1>
        <p className="hero-copy">
          Capture important details quickly, review them anytime, and manage longer
          notes through a clean reading experience designed for daily use.
        </p>

        <div className="hero-feature-list">
          <div className="hero-feature">
            <strong>Quick capture</strong>
            <p>Create notes in seconds with a simple title and description flow.</p>
          </div>
          <div className="hero-feature">
            <strong>Easy updates</strong>
            <p>Edit note details in focused popups without leaving the workspace.</p>
          </div>
          <div className="hero-feature">
            <strong>Comfortable reading</strong>
            <p>Open full notes in a larger view for clearer reading and better control.</p>
          </div>
        </div>
      </Card>
    </section>
  );
}
