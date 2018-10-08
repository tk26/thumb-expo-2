import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';

import { NavigationIcon } from '../components/common';
import images from '../../assets/images';

import LaunchScreen from '../components/LaunchScreen';
import LoginScreen from '../components/auth/LoginForm';

import SignupStep1 from '../components/signup/SignupStep1';
import SignupStep2 from '../components/signup/SignupStep2';
import SignupStep3 from '../components/signup/SignupStep3';
import SignupStep4 from '../components/signup/SignupStep4';
import SignupSuccess from '../components/signup/SignupSuccess';

import Home from '../components/home/Home';
import Thumb from '../components/thumb/Thumb';
import Travel from '../components/travel/Travel';
import Notifications from '../components/notifications/Notifications';

import RideStep1 from '../components/ride/RideStep1';
import RideStep2 from '../components/ride/RideStep2';
import RideStep3 from '../components/ride/RideStep3';
import RideStep4 from '../components/ride/RideStep4';
import RideResults from '../components/ride/RideResults';
import InviteDriver from '../components/ride/InviteDriver';

import DriveStep1 from '../components/drive/DriveStep1';
import DriveStep2 from '../components/drive/DriveStep2';
import DriveStep3 from '../components/drive/DriveStep3';
import DriveStep4 from '../components/drive/DriveStep4';
import DriveResults from '../components/drive/DriveResults';
import InviteRider from '../components/drive/InviteRider';

import Profile from '../components/profile/Profile';
import EditProfile from '../components/profile/EditProfile';
import PublicProfile from '../components/profile/PublicProfile';

import Feedback from '../components/feedback/Feedback';
import ReportBug from '../components/feedback/ReportBug';
import AskQuestion from '../components/feedback/AskQuestion';
import RequestFeature from '../components/feedback/RequestFeature';
import OtherFeedback from '../components/feedback/OtherFeedback';


const SignedOutStack = createStackNavigator({
    LaunchScreen: {
        screen: LaunchScreen,
        navigationOptions: {
          header: null
        }
    },
    SignupStep1: {
        screen: SignupStep1,
        navigationOptions: {
          header: null
        }
    },
    SignupStep2: {
        screen: SignupStep2,
        navigationOptions: {
          header: null
        }
    },
    SignupStep3: {
        screen: SignupStep3,
        navigationOptions: {
          header: null
        }
    },
    SignupStep4: {
        screen: SignupStep4,
        navigationOptions: {
          header: null
        }
    },
    SignupSuccess: {
        screen: SignupSuccess,
        navigationOptions: {
          header: null
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
    }
});

const ProfileStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: 'Profile',
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Edit Profile',
        }
    },
    Feedback: {
        screen: Feedback,
        navigationOptions: {
            title: 'Feedback',
        }
    },
    ReportBug: {
        screen: ReportBug,
        navigationOptions: {
            title: 'Report a bug',
        }
    },
    AskQuestion: {
        screen: AskQuestion,
        navigationOptions: {
            title: 'Ask a question',
        }
    },
    RequestFeature: {
        screen: RequestFeature,
        navigationOptions: {
            title: 'Request a feature',
        }
    },
    OtherFeedback: {
        screen: OtherFeedback,
        navigationOptions: {
            title: 'Give some other feedback',
        }
    },
});

const TravelStack = createStackNavigator({
    Travel: {
        screen: Travel,
        navigationOptions: {
            title: 'Travel',
        }
    },
    RideStep1: {
        screen: RideStep1,
        navigationOptions: {
            title: 'Ride: Step 1',
        }
    },
    RideStep2: {
        screen: RideStep2,
        navigationOptions: {
            title: 'Ride: Step 2',
        }
    },
    RideStep3: {
        screen: RideStep3,
        navigationOptions: {
            title: 'Ride: Step 3',
        }
    },
    RideStep4: {
        screen: RideStep4,
        navigationOptions: {
            title: 'Ride: Zero Results',
        }
    },
    RideResults: {
        screen: RideResults,
        navigationOptions: {
            title: 'Ride: Found Results',
        }
    },
    InviteDriver: {
        screen: InviteDriver,
        navigationOptions: {
            title: 'Request Driver',
        }
    },
    DriveStep1: {
        screen: DriveStep1,
        navigationOptions: {
            title: 'Drive: Step 1',
        }
    },
    DriveStep2: {
        screen: DriveStep2,
        navigationOptions: {
            title: 'Drive: Step 2',
        }
    },
    DriveStep3: {
        screen: DriveStep3,
        navigationOptions: {
            title: 'Drive: Step 3',
        }
    },
    DriveStep4: {
        screen: DriveStep4,
        navigationOptions: {
            title: 'Drive: Zero Results',
        }
    },
    DriveResults: {
        screen: DriveResults,
        navigationOptions: {
            title: 'Drive: Found Results',
        }
    },
    InviteRider: {
        screen: InviteRider,
        navigationOptions: {
            title: 'Invite Rider',
        }
    },
});

const bottomTabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#FFFFFF',
      height: 50,
      borderTopWidth: 0.5,
      borderTopColor: '#E0E0E0'
    }
  }
};

// connect is used to connect react components to the redux store
const LoggedInTabs = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
          tabBarIcon: ({ focused }) =>  {
            const imageSource = focused ? images.icons.home_icon_focused : images.icons.home_icon;
            return (
              <NavigationIcon label="home" icon={imageSource} />
            )
          }
        }
    },
    Thumb: {
        screen: Thumb,
        navigationOptions: {
          tabBarIcon: ({ focused }) =>  {
            const imageSource = focused ? images.icons.thumbs_icon_focused : images.icons.thumbs_icon;
            return (
              <NavigationIcon label="thumbs" icon={imageSource} />
            )
          }
        }
    },
    Travel: {
        screen: TravelStack,
        navigationOptions: {
          tabBarIcon: ({ focused }) =>  {
            const imageSource = focused ? images.icons.travel_icon_focused : images.icons.travel_icon;
            return (
              <NavigationIcon label="travel" icon={imageSource} />
            )
          }
        }
    },
    Notification: {
        screen: Notifications,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  {
              const imageSource = focused ? images.icons.notifications_icon_focused : images.icons.notifications_icon;
              return (
                <NavigationIcon label="notifications" icon={imageSource} />
              )
            }
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ focused }) =>  {
            const imageSource = focused ? images.icons.profile_icon_focused : images.icons.profile_icon;
            return (
              <NavigationIcon label="profile" icon={imageSource} />
            )
          }
        }
    }
}, bottomTabNavigatorConfig);

export default createRootNavigator = (loggedIn = false) => {
    const navigator = createStackNavigator({
        SignedOutStack: {
            screen: SignedOutStack,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        LoggedInTabs: {
            screen: LoggedInTabs,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        PublicProfile: {
            screen: PublicProfile,
        }
    },
    {
        headerMode: 'none',
        mode: 'modal',
        initialRouteName: loggedIn ? 'LoggedInTabs' : 'SignedOutStack'
    });
    return navigator;
};
