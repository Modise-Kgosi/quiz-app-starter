import { useMemo, useState } from "react";
import Layout from "./components/Layout/Layout";
import questions from "./data/questions";
import { useQuizEngine } from "./hooks/useQuizEngine";
import QuizScreen from "./screens/QuizScreen/QuizScreen";
import ResultsScreen, {
  type CategoryResult,
} from "./screens/ResultsScreen/ResultsScreen";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import "./App.css";

type AppScreen = "welcome" | "quiz";

const footerItems = [
  { label: "~/settings", icon: "⚙" },
  { label: "shutdown", icon: "⏻" },
];

function App() {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const quiz = useQuizEngine(questions);

  const categories = useMemo(
    () => Array.from(new Set(questions.map((question) => question.category))),
    [],
  );

  const selectedAnswer = quiz.currentQuestion
    ? quiz.answers.find(
        (answer) => answer.questionId === quiz.currentQuestion?.id,
      )
    : undefined;

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

  const isResultsScreen = screen === "quiz" && quiz.isComplete;
  const activeCategory = isResultsScreen
    ? undefined
    : screen === "quiz"
      ? quiz.currentQuestion?.category
      : undefined;

  const sidebarItems = [
    ...categories.map((category) => ({
      label: `~/quiz/${category}`,
      icon: category === activeCategory ? "▣" : "□",
      active: category === activeCategory,
    })),
    { label: "~/results", icon: "⚙", active: isResultsScreen },
  ];

  function handleStart() {
    quiz.reset();
    setScreen("quiz");
  }

  function handleRestart() {
    quiz.reset();
    setScreen("welcome");
  }

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
        >
          <WelcomeScreen categories={categories} onStart={handleStart} />
        </Layout>
      </div>
    );
  }

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
        >
          <ResultsScreen
            results={resultRows}
            score={quiz.score.correct}
            total={quiz.score.total}
            onRestart={handleRestart}
          />
        </Layout>
      </div>
    );
  }

  if (!quiz.currentQuestion) {
    return null;
  }

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
          `${progressPercent}%`,
        ]}
      >
        <QuizScreen
          isFirstQuestion={quiz.isFirstQuestion}
          onNext={quiz.goNext}
          onPrevious={quiz.goPrevious}
          onSelectAnswer={quiz.selectAnswer}
          question={quiz.currentQuestion}
          questionNumber={questionNumber}
          selectedIndex={selectedAnswer?.selectedIndex}
          totalQuestions={quiz.totalQuestions}
        />
      </Layout>
    </div>
  );
}

export default App;
