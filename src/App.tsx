import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout/Layout";
import type { SidebarItem } from "./components/Sidebar/Sidebar";
import TerminalModal from "./components/TerminalModal/TerminalModal";
import { errorEntries } from "./data/errorEncyclopedia";
import questions from "./data/questions";
import { useQuizEngine } from "./hooks/useQuizEngine";
import QuizScreen from "./screens/QuizScreen/QuizScreen";
import ResultsScreen, {
  type CategoryResult,
} from "./screens/ResultsScreen/ResultsScreen";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import "./App.css";

type AppScreen = "welcome" | "quiz";
type ActiveModal = "errors" | "not-implemented" | null;

interface PersistedSessionState {
  screen: AppScreen;
  sessionStartedAt: number | null;
  elapsedTime: number;
}

const APP_SESSION_STORAGE_KEY = "quiz-app-session";

// Footer actions shown in the app layout.
const footerItems = [
  { label: "~/errors", icon: "!" },
  { label: "Do not press", icon: "⏻" },
];

function formatElapsedTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function App() {
  const loadPersistedSession = () => {
    try {
      const saved = window.localStorage.getItem(APP_SESSION_STORAGE_KEY);
      if (!saved) {
        return {
          screen: "welcome" as AppScreen,
          sessionStartedAt: null as number | null,
          elapsedTime: 0,
        };
      }

      const parsed = JSON.parse(saved) as Partial<PersistedSessionState>;
      return {
        screen:
          parsed.screen === "quiz" || parsed.screen === "welcome"
            ? parsed.screen
            : ("welcome" as AppScreen),
        sessionStartedAt:
          typeof parsed.sessionStartedAt === "number"
            ? parsed.sessionStartedAt
            : null,
        elapsedTime:
          typeof parsed.elapsedTime === "number" ? parsed.elapsedTime : 0,
      };
    } catch {
      return {
        screen: "welcome" as AppScreen,
        sessionStartedAt: null as number | null,
        elapsedTime: 0,
      };
    }
  };

  // Tracks whether the app is showing the welcome screen or the quiz screen.
  const [screen, setScreen] = useState<AppScreen>(
    () => loadPersistedSession().screen,
  );
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(
    () => loadPersistedSession().sessionStartedAt,
  );
  const [elapsedTime, setElapsedTime] = useState(
    () => loadPersistedSession().elapsedTime,
  );
  // Manages quiz state such as current question, answers, score, and navigation.
  const quiz = useQuizEngine(questions);

  // Collects all unique question categories for the sidebar and screens.
  useEffect(() => {
    // Restore quiz screen if there's saved progress
    if (quiz.answers.length > 0) {
      setScreen("quiz");
    }
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(questions.map((question) => question.category))),
    [],
  );

  // Uses the pending selection first, then falls back to a confirmed answer.
  const selectedIndex = quiz.currentQuestion
    ? (quiz.pendingSelection ??
      quiz.answers.find(
        (answer) => answer.questionId === quiz.currentQuestion?.id,
      )?.selectedIndex)
    : undefined;

  // Builds the results data for each category shown on the results screen.
  const resultRows = useMemo<CategoryResult[]>(() => {
    return categories.map((category) => {
      const categoryQuestions = questions.filter(
        (question) => question.category === category,
      );
      const categoryScore = categoryQuestions.filter((question) =>
        quiz.answers.some(
          (answer) => answer.questionId === question.id && answer.isCorrect,
        ),
      ).length;

      return {
        label: category,
        score: categoryScore,
        total: categoryQuestions.length,
      };
    });
  }, [categories, quiz.answers]);

  // Determines whether the app should show the results view.
  const isResultsScreen = screen === "quiz" && quiz.isComplete;
  // Highlights the current category in the sidebar while the quiz is active.
  const activeCategory = isResultsScreen
    ? undefined
    : screen === "quiz"
      ? quiz.currentQuestion?.category
      : undefined;
  const formattedUptime = formatElapsedTime(elapsedTime);

  // Creates the sidebar entries for categories and the results page.
  const sidebarItems = [
    ...categories
      .filter((category) => category === activeCategory)
      .map((category) => ({
        label: `~/quiz/${category}`,
        icon: "□",
        active: false,
      })),
    { label: "~/results", icon: "⚙", active: isResultsScreen },
  ];

  // Starts the quiz from the welcome screen.
  function handleStart() {
    quiz.reset();
    setElapsedTime(0);
    setSessionStartedAt(Date.now());
    setScreen("quiz");
  }

  // Starts a fresh quiz session from the beginning.
  function handleNewSession() {
    setActiveModal(null);
    quiz.reset();
    setElapsedTime(0);
    setSessionStartedAt(Date.now());
    setScreen("quiz");
  }

  function openUnavailableModal() {
    setActiveModal("not-implemented");
  }

  function handleFooterItemSelect(item: SidebarItem) {
    if (item.label === "~/errors") {
      setActiveModal("errors");
      return;
    }

    openUnavailableModal();
  }

  function renderModal() {
    if (activeModal === "errors") {
      return <ErrorEncyclopediaModal onClose={() => setActiveModal(null)} />;
    }

    if (activeModal === "not-implemented") {
      return <FeatureUnavailableModal onClose={() => setActiveModal(null)} />;
    }

    return null;
  }

  useEffect(() => {
    try {
      const payload: PersistedSessionState = {
        screen,
        sessionStartedAt,
        elapsedTime,
      };
      window.localStorage.setItem(
        APP_SESSION_STORAGE_KEY,
        JSON.stringify(payload),
      );
    } catch {
      // Ignore storage write errors and keep the app functional.
    }
  }, [elapsedTime, screen, sessionStartedAt]);

  useEffect(() => {
    if (screen !== "quiz" || sessionStartedAt === null) {
      return undefined;
    }

    const updateElapsedTime = () => {
      setElapsedTime(Date.now() - sessionStartedAt);
    };

    updateElapsedTime();

    if (quiz.isComplete) {
      return undefined;
    }

    const intervalId = window.setInterval(updateElapsedTime, 1000);
    return () => window.clearInterval(intervalId);
  }, [quiz.isComplete, screen, sessionStartedAt]);

  // Renders the welcome screen when the app first loads.
  if (screen === "welcome") {
    return (
      <div className="app">
        <Layout
          bottomPrompt="user@archlinux:~$"
          footerItems={footerItems}
          prompt="▣ user@archlinux:~"
          progress="[ 00/00 ]"
          sidebarItems={sidebarItems}
          statusItems={["system: ready", "session: initialized"]}
          onCommandAction={openUnavailableModal}
          onFooterItemSelect={handleFooterItemSelect}
          onNewSession={handleNewSession}
          onSidebarItemSelect={openUnavailableModal}
        >
          <WelcomeScreen categories={categories} onStart={handleStart} />
        </Layout>
        {renderModal()}
      </div>
    );
  }

  // Renders the results screen after the quiz is completed.
  if (isResultsScreen) {
    return (
      <div className="app">
        <Layout
          bottomPrompt="user@archlinux:~/results $"
          footerItems={footerItems}
          progress={`[ ${String(quiz.totalQuestions).padStart(2, "0")}/${String(
            quiz.totalQuestions,
          ).padStart(2, "0")} ]`}
          prompt="user@archlinux:~"
          sidebarItems={sidebarItems}
          statusItems={categories}
          onCommandAction={openUnavailableModal}
          onFooterItemSelect={handleFooterItemSelect}
          onNewSession={handleNewSession}
          onSidebarItemSelect={openUnavailableModal}
        >
          <ResultsScreen
            results={resultRows}
            score={quiz.score.correct}
            total={quiz.score.total}
            uptime={formattedUptime}
            onUnavailableAction={openUnavailableModal}
            onRestart={handleNewSession}
          />
        </Layout>
        {renderModal()}
      </div>
    );
  }

  // Avoids rendering anything before the quiz has a current question.
  if (!quiz.currentQuestion) {
    return null;
  }

  // Calculates the current question number and progress percentage.
  const questionNumber = quiz.currentIndex + 1;
  const progressPercent = Math.round(
    (questionNumber / quiz.totalQuestions) * 100,
  );

  return (
    <div className="app">
      <Layout
        bottomPrompt="user@archlinux: ~/quiz $"
        footerItems={footerItems}
        activeCategory={quiz.currentQuestion.category}
        progress={`[ ${String(questionNumber).padStart(2, "0")}/${String(
          quiz.totalQuestions,
        ).padStart(2, "0")} ]`}
        prompt="▣ user@archlinux:~"
        sidebarItems={sidebarItems}
        statusItems={[
          `question: ${String(questionNumber).padStart(2, "0")} / ${String(
            quiz.totalQuestions,
          ).padStart(2, "0")}`,
          `streak: ${quiz.streak}`,
          `uptime: ${formattedUptime}`,
          `${progressPercent}%`,
        ]}
        onCommandAction={openUnavailableModal}
        onFooterItemSelect={handleFooterItemSelect}
        onNewSession={handleNewSession}
        onSidebarItemSelect={openUnavailableModal}
      >
        <QuizScreen
          hasSelectedAnswer={quiz.pendingSelection !== null}
          onNext={quiz.goNext}
          onSelectAnswer={quiz.selectAnswer}
          question={quiz.currentQuestion}
          questionNumber={questionNumber}
          selectedIndex={selectedIndex}
          streak={quiz.streak}
          totalQuestions={quiz.totalQuestions}
          uptime={formattedUptime}
        />
      </Layout>
      {renderModal()}
    </div>
  );
}

export default App;

interface ModalOnlyProps {
  onClose: () => void;
}

function FeatureUnavailableModal({ onClose }: ModalOnlyProps) {
  return (
    <TerminalModal
      meta="404"
      path="~/errors/not-found.log"
      title="ERROR 404"
      onClose={onClose}
    >
      <div className="error-popup">
        <strong>Feature Not Implemented</strong>
        <p>This feature is currently unavailable.</p>
        <p>The requested resource or functionality could not be found.</p>
        <small>See ~/errors for more information.</small>
      </div>
    </TerminalModal>
  );
}

function ErrorEncyclopediaModal({ onClose }: ModalOnlyProps) {
  const groups = ["HTTP/Web Errors", "Development Errors"] as const;

  return (
    <TerminalModal
      meta={`${String(errorEntries.length).padStart(2, "0")} entries`}
      path="~/errors"
      title="Error Encyclopedia"
      onClose={onClose}
    >
      <div className="error-manual">
        <p className="manual-intro">
          Built-in reference manual for common web and development failures.
        </p>
        {groups.map((group) => (
          <section className="manual-section" key={group}>
            <h3>{group}</h3>
            <div className="manual-grid">
              {errorEntries
                .filter((entry) => entry.group === group)
                .map((entry) => (
                  <article className="manual-entry" key={entry.name}>
                    <header>
                      <code>{entry.code}</code>
                      <strong>{entry.name}</strong>
                    </header>
                    <p>{entry.description}</p>
                    <span>{entry.explanation}</span>
                    {entry.example ? <small>{entry.example}</small> : null}
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </TerminalModal>
  );
}
