import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function reset(){
  const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'SignedOutStack' })],
  });
  _navigator.dispatch(resetAction);
}

function goBack(){
  _navigator.dispatch(
    NavigationActions.back()
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  reset
};
