import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense, useState, useCallback } from "react";
import { useStore } from "./lib/store";
import LoadingScreen from "./components/LoadingScreen";
import SplashScreen from "./components/SplashScreen";

// Lazy-loaded pages for code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const About = lazy(() => import("./pages/About"));
const OnboardWelcome = lazy(() => import("./pages/onboard/Welcome"));
const OnboardChild = lazy(() => import("./pages/onboard/AddChild"));
const OnboardPreferences = lazy(() => import("./pages/onboard/Preferences"));
const OnboardChannels = lazy(() => import("./pages/onboard/Channels"));
const OnboardDone = lazy(() => import("./pages/onboard/Done"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const DashboardChild = lazy(() => import("./pages/dashboard/ChildDetail"));
const DashboardPaths = lazy(() => import("./pages/dashboard/PathManagement"));
const DashboardChannels = lazy(() => import("./pages/dashboard/ChannelManagement"));
const DashboardProgress = lazy(() => import("./pages/dashboard/Progress"));
const DashboardCompliance = lazy(() => import("./pages/dashboard/Compliance"));
const DashboardAlerts = lazy(() => import("./pages/dashboard/Alerts"));
const DashboardSettings = lazy(() => import("./pages/dashboard/Settings"));
const Upgrade = lazy(() => import("./pages/Upgrade"));
const LearnHome = lazy(() => import("./pages/learn/LearnHome"));
const LessonPlayer = lazy(() => import("./pages/learn/LessonPlayer"));
const QuizView = lazy(() => import("./pages/learn/QuizView"));
const FlashcardSession = lazy(() => import("./pages/learn/FlashcardSession"));
const ChannelHub = lazy(() => import("./pages/learn/ChannelHub"));
const ChannelPlayer = lazy(() => import("./pages/learn/ChannelPlayer"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <Component />;
}

function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {/* Public */}
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/about" component={About} />
        <Route path="/upgrade">{() => <ProtectedRoute component={Upgrade} />}</Route>
        <Route path="/success" component={PaymentSuccess} />
        <Route path="/cancel" component={PaymentCancel} />

        {/* Onboarding */}
        <Route path="/onboard/welcome">{() => <ProtectedRoute component={OnboardWelcome} />}</Route>
        <Route path="/onboard/child">{() => <ProtectedRoute component={OnboardChild} />}</Route>
        <Route path="/onboard/preferences">{() => <ProtectedRoute component={OnboardPreferences} />}</Route>
        <Route path="/onboard/channels">{() => <ProtectedRoute component={OnboardChannels} />}</Route>
        <Route path="/onboard/done">{() => <ProtectedRoute component={OnboardDone} />}</Route>

        {/* Parent Dashboard */}
        <Route path="/dashboard">{() => <ProtectedRoute component={Dashboard} />}</Route>
        <Route path="/dashboard/child/:id">{() => <ProtectedRoute component={DashboardChild} />}</Route>
        <Route path="/dashboard/paths/:childId">{() => <ProtectedRoute component={DashboardPaths} />}</Route>
        <Route path="/dashboard/channels">{() => <ProtectedRoute component={DashboardChannels} />}</Route>
        <Route path="/dashboard/progress/:id">{() => <ProtectedRoute component={DashboardProgress} />}</Route>
        <Route path="/dashboard/compliance">{() => <ProtectedRoute component={DashboardCompliance} />}</Route>
        <Route path="/dashboard/alerts">{() => <ProtectedRoute component={DashboardAlerts} />}</Route>
        <Route path="/dashboard/settings">{() => <ProtectedRoute component={DashboardSettings} />}</Route>
        <Route path="/dashboard/upgrade">{() => <ProtectedRoute component={Upgrade} />}</Route>

        {/* Child Learning View */}
        <Route path="/learn/:childId">{() => <ProtectedRoute component={LearnHome} />}</Route>
        <Route path="/learn/:childId/lesson/:lessonId">{() => <ProtectedRoute component={LessonPlayer} />}</Route>
        <Route path="/learn/:childId/quiz/:lessonId">{() => <ProtectedRoute component={QuizView} />}</Route>
        <Route path="/learn/:childId/flashcards">{() => <ProtectedRoute component={FlashcardSession} />}</Route>
        <Route path="/learn/:childId/flashcards/:domain">{() => <ProtectedRoute component={FlashcardSession} />}</Route>
        <Route path="/learn/:childId/channels">{() => <ProtectedRoute component={ChannelHub} />}</Route>
        <Route path="/learn/:childId/channels/:channelId">{() => <ProtectedRoute component={ChannelPlayer} />}</Route>

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash once per browser session
    const shown = sessionStorage.getItem("gigi-splash-shown");
    return !shown;
  });

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("gigi-splash-shown", "true");
    setShowSplash(false);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
