# Quiz Engine Architecture

Decision:
Use useReducer to manage quiz state.

Reason:
The quiz has several pieces of state that change together.
Using useReducer keeps all updates in one place, making the
logic easier to understand, maintain and test.

Structure:

src/types
Shared TypeScript types.

src/state
Reducer and actions.

src/hooks
Public hook used by UI components.

src/utils
Pure scoring functions.