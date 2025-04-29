import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import SignupScreen from 'screens/signup';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <>
      <SafeAreaView>
      <SignupScreen />
      </SafeAreaView>
    </>
  );
}
