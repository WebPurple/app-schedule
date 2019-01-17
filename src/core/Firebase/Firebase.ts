import firebase, { RNFirebase } from 'react-native-firebase';

export class Firebase {
    public auth: RNFirebase.auth.Auth;
    public db: RNFirebase.database.Database;

    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.database();
    }

    // TODO add strict mode for TS
    getRefValueOnce = <T>(ref: RNFirebase.database.Reference): Promise<T | null> =>
        ref
            .once('value')
            .then(snapshot => snapshot.val())
            .catch(error => {
                console.error(error);
                return null;
            });

    getPathValueOnce = <T>(path: string): Promise<T | null> => this.getRefValueOnce(this.db.ref(path));
}

export type FirebaseUser = RNFirebase.User;
