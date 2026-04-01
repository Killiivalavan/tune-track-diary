import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/HomePage";
import AlbumPage from "@/pages/AlbumPage";
import ArtistPage from "@/pages/ArtistPage";
import TrackPage from "@/pages/TrackPage";
import ProfilePage from "@/pages/ProfilePage";
import ActivityPage from "@/pages/ActivityPage";
import ExplorePage from "@/pages/ExplorePage";
import AlbumsPage from "@/pages/AlbumsPage";
import ListsPage from "@/pages/ListsPage";
import MembersPage from "@/pages/MembersPage";
import JournalPage from "@/pages/JournalPage";
import ReviewsPage from "@/pages/ReviewsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/track/:id" element={<TrackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
