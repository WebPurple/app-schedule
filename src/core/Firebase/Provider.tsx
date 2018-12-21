import React from 'react';
import { Firebase } from './Firebase';
import { FirebaseContext } from './context';

export const FirebaseProvider: React.SFC<{}> = ({ children }) => (
    <FirebaseContext.Provider value={new Firebase()}>{children}</FirebaseContext.Provider>
);
