import firebase, { RNFirebase } from 'react-native-firebase';

export class Firebase {
    public auth: RNFirebase.auth.Auth;
    public db: RNFirebase.database.Database;

    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    getRefValueOnce = <T>(ref: RNFirebase.database.Reference): Promise<T | null> =>
        ref.once('value').then(snapshot => snapshot.val());
}

export type FirebaseUser = RNFirebase.User;
