import React from 'react';
import { User } from '../../types/scheme';

export const AuthContext = React.createContext<User>(null);
