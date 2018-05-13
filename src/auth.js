import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = "auth_token";

export const onLogIn = (token) => AsyncStorage.setItem(AUTH_TOKEN, token);

export const onLogOut = () => AsyncStorage.removeItem(AUTH_TOKEN);

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(AUTH_TOKEN)
            .then(token => {
                if (token !== null) {
                    global.auth_token = JSON.parse(token);
                    AsyncStorage.getItem("user")
                        .then(user => {
                            if (user !== null) {
                                user = JSON.parse(user);
                                global.firstName = user.firstName;
                                global.username = user.username;
                                global.profilePicture = user.profilePicture;
                                resolve(true);
                            }
                            else {
                                resolve(false);                                
                            }
                        });
                    // resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(error => reject(error));
    });
};