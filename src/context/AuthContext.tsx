import React, { createContext, useReducer, Dispatch } from 'react';

// Define the shape of the authentication state
interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

// Define the shape of the actions that can be dispatched
interface AuthAction {
  type: 'LOGIN' | 'LOGOUT';
  payload?: any;
}

// Create the initial state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null
};

// Create the reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

// Create the provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
