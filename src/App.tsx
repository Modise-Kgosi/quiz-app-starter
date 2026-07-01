import Layout from "./components/Layout/Layout";
import questions from "./data/questions";
import QuizScreen from "./screens/QuizScreen/QuizScreen";
import ResultsScreen from "./screens/ResultsScreen/ResultsScreen";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import "./App.css";

const categories = [
  "git-basics",
  "react-hooks",
  "typescript-adv",
  "web-tooling",
  "css-layout",
  "deployment-ops",
];

const sidebarItems = [
  { label: "~/quiz/react", icon: "▣", active: true },
  { label: "~/quiz/git", icon: "□" },
  { label: "~/quiz/ts", icon: "<>" },
  { label: "~/quiz/css", icon: "◩" },
  { label: "~/results", icon: "⚙" },
];

const footerItems = [
  { label: "~/settings", icon: "⚙" },
  { label: "shutdown", icon: "⏻" },
];

const resultRows = [
  { label: "git", score: 4, total: 5 },
  { label: "react", score: 5, total: 5 },
  { label: "typescript", score: 4, total: 5 },
  { label: "tooling", score: 5, total: 5 },
];

function App() {
  return (
    <div className="app">
      <div className="showcase">
        <section aria-label="Welcome screen">
          <div className="screenLabel">welcome_screen</div>
          <Layout
            bottomPrompt="user@archlinux:~$"
            footerItems={footerItems}
            prompt="▣ user@archlinux:~"
            progress="[ 00/00 ]"
            sidebarItems={sidebarItems.map((item) => ({
              ...item,
              active: item.label === "~/quiz/react",
            }))}
            statusItems={["system: ready", "session: initialized"]}
          >
            <WelcomeScreen categories={categories} />
          </Layout>
        </section>

        <section aria-label="Quiz screen">
          <div className="screenLabel">quiz_screen</div>
          <Layout
            bottomPrompt="user@archlinux: ~/quiz $"
            footerItems={footerItems}
            activeCategory="react"
            progress="[ 03/20 ]"
            prompt="▣ user@archlinux:~"
            sidebarItems={sidebarItems}
            statusItems={["question: 03 / 20", "00:45", "15%"]}
          >
            <QuizScreen
              question={questions[0]}
              questionNumber={3}
              totalQuestions={20}
            />
          </Layout>
        </section>

        <section aria-label="Results screen">
          <div className="screenLabel">results_screen</div>
          <Layout
            bottomPrompt="user@archlinux:~/results $"
            footerItems={footerItems}
            progress="[ 03/20 ]"
            prompt="user@archlinux:~"
            sidebarItems={sidebarItems.map((item) => ({
              ...item,
              active: item.label === "~/results",
            }))}
            statusItems={["git", "react", "typescript", "tooling"]}
          >
            <ResultsScreen results={resultRows} score={18} total={20} />
          </Layout>
        </section>
      </div>
    </div>
  );
}

export default App;
