# Dev Quiz

A modern developer quiz application built with **React**, **TypeScript**, and **Vite**. The application presents multiple-choice questions across different software development topics in a terminal-inspired interface.

---

## Features

- Terminal-inspired Linux UI
- 20 multiple-choice questions
- Categories include:
  - Git
  - React
  - TypeScript
  - Tooling
  - Deployment
  - HTML & CSS
- Previous and Next question navigation
- Automatic score calculation
- Category-by-category performance report
- Restart quiz functionality
- Responsive layout
- Unit tests with Vitest
- Type-safe code using TypeScript

---

## Tech Stack

- React 19
- TypeScript
- Vite
- Vitest
- ESLint
- Prettier

---

## Project Structure

```
src/
│
├── components/
│   ├── Button/
│   ├── Layout/
│   ├── ProgressBar/
│   ├── QuestionCard/
│   └── Sidebar/
│
├── data/
│   └── questions.ts
│
├── hooks/
│   ├── useLocalStorage.ts
│   └── useQuizEngine.ts
│
├── screens/
│   ├── WelcomeScreen/
│   ├── QuizScreen/
│   └── ResultsScreen/
│
├── state/
│   ├── quizReducer.ts
│   └── quizReducer.test.ts
│
├── types/
│   └── quiz.ts
│
├── utils/
│   ├── calculateScore.ts
│   ├── calculateScore.test.ts
│   ├── scoring.ts
│   ├── scoreSystem.ts
│   └── shuffleQuestions.ts
│
├── App.tsx
└── main.tsx
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project.

```bash
cd quiz-app-starter
```

Install dependencies.

```bash
npm install
```

---

## Running the Application

Start the development server.

```bash
npm run dev
```

Open your browser and navigate to

```
http://localhost:5173
```

---

## Available Scripts

Start the development server.

```bash
npm run dev
```

Run the test suite.

```bash
npm test
```

Build the project.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

Run ESLint.

```bash
npm run lint
```

---

## Testing

The project uses **Vitest** for unit testing.

Current test coverage includes:

- Score calculation
- Quiz reducer state management

Run the tests with:

```bash
npm test
```

---

## Quiz Flow

1. User starts the quiz.
2. Questions are displayed one at a time.
3. User selects an answer.
4. Navigation is available using Previous and Next buttons.
5. Answers are stored by the quiz engine.
6. Final score is calculated automatically.
7. Results screen displays:
   - Overall score
   - Percentage
   - Category breakdown
8. User can restart the quiz.

---

## Categories

- Git
- React
- TypeScript
- Tooling
- Deployment
- HTML & CSS

---

## Architecture

The application follows a component-based architecture.

- **Components** handle reusable UI.
- **Screens** represent application pages.
- **Hooks** manage quiz logic.
- **Reducer** manages application state.
- **Utilities** perform score calculations and helper functions.
- **Data** contains quiz questions.

---

## Contributors

[Thuto](https://github.com/mrmalope-404) ,
[Modise](https://github.com/Modise-Kgosi) ,
[Itumeleng](https://github.com/ITaolana) ,
[Barati](https://github.com/bida22-036)

Developed collaboratively as part of a team project.


Contributions include:

- UI implementation
- Quiz engine
- Navigation
- State management
- Score calculation
- Testing
- Deployment

---

## License

This project was created for educational purposes.
