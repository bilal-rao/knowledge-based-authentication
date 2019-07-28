import React from "react";
import { ThemeProvider } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";

import Router from "./Router";
import store from "./stores";
import SplashPage from "./SplashPage";

class App extends React.Component {
  state = {
    loggedIn: false,
    loading: true,
    splashLoading: true,
    user: null,
    // fcmToken: 'TkQ0cW9BRzNnaWtvU3F0QkJtWEN5UT09',
    fcmToken: ""
  };

  constructor() {
    super();
    setTimeout(() => this.setState({ splashLoading: false }), 5000);
  }

  render() {
    if (this.state.splashLoading) {
      return <SplashPage />;
    }

    return (
      <ThemeProvider>
        <MenuProvider>
          <Provider store={store}>
            <Router
              style={styles.container}
              token={this.state.token}
              fcmToken={this.state.fcmToken}
            />
          </Provider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});
export default App;
