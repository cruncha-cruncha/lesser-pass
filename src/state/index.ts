export * from './atoms';
export * from './selectors';
export * from './Login.enum';

/*
GOAL: a generic global state interface
- typing a getter might be ok, like get<string>(ENUM)
- typing a setter might be harder, like set(ENUM, val) ???
*/