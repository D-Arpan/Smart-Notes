import { NotesHeroSection } from "@/components/sections/notes-hero-section";
import { NotesWorkspaceSection } from "@/components/sections/notes-workspace-section";

export default function HomePage() {
  return (
    <main className="page-shell">
      <NotesHeroSection />
      <NotesWorkspaceSection />
    </main>
  );
}
