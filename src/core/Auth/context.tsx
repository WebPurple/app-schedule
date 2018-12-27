import React from 'react';
import { User } from '../../types/scheme';

export type AppUser = User;
export const AuthContext = React.createContext<AppUser>(null);