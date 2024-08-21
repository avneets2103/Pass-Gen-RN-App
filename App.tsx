import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Image, Share } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
const deviceWidth = Dimensions.get('window').width;

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [lc, setLc] = useState(true);
  const [uc, setUc] = useState(false);
  const [num, setNum] = useState(false);
  const [spcl, setSpcl] = useState(false);

  const genPassString = (passwordLength: number) => {
    let allowedChars = '';
    if (lc) allowedChars += 'abcdefghijklmnopqrstuvwxyz';
    if (uc) allowedChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (num) allowedChars += '0123456789';
    if (spcl) allowedChars += '!@#$%^&*()_+-=[]{}|;:,.<>/?';
    let pass = '';
    for(let i=0; i<passwordLength; i++){
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      pass += allowedChars.charAt(randomIndex);
    }
    return pass;
  };
  const generatePassword = (len: number) => {
    const pass = genPassString(len);
    setPassword(pass);
  };
  const resetPassword = () => {
    setPassword('');
    setPasswordLength(8);
    setLc(true);
    setUc(false);
    setNum(false);
    setSpcl(false);
  };
  const handlePasswordLength = (text: string) => {
    if(!(parseInt(text))){setPasswordLength(0); return;}
    setPasswordLength(parseInt(text==''?'0':text));
  };
  const sharePassword = async () => {
    try {
      await Share.share({
        message: `Here's your generated password: ${password}`,
      });
    } catch (error) {
      console.error('Error sharing password:', error);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Text style={styles.appTitle}>Password Generator</Text>
          <View style={{margin: 10, flex: 1, gap: 5}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text>Enter Password Length: </Text>
              <TextInput
                style={{backgroundColor: 'white', borderColor: 'black', borderWidth: 1, borderRadius: 5, padding: 5, width: 100, color: 'black'}}
                value = {passwordLength.toString()}
                onChangeText={(text) => handlePasswordLength(text)}
                keyboardType='numeric'
              />
            </View>
            <View style={{flex: 1, gap: 10}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <BouncyCheckbox
                  style={{width: deviceWidth/2}}
                  isChecked={lc}
                  size={25}
                  fillColor="green"
                  unFillColor="#FFFFFF"
                  text="Lowercase include"
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  iconStyle={{ borderColor: "black" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked: boolean) => {setLc(isChecked)}}
                />
                <BouncyCheckbox
                  isChecked={uc}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  size={25}
                  fillColor="blue"
                  unFillColor="#FFFFFF"
                  text="Uppercase include"
                  iconStyle={{ borderColor: "black" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked: boolean) => {setUc(isChecked)}}
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <BouncyCheckbox
                  style={{width: deviceWidth/2}}
                  isChecked={num}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  size={25}
                  fillColor="purple"
                  unFillColor="#FFFFFF"
                  text="Numbers include"
                  iconStyle={{ borderColor: "black" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked: boolean) => {setNum(isChecked)}}
                />
                <BouncyCheckbox
                  isChecked={spcl}
                  textStyle={{
                    textDecorationLine: "none",
                  }}
                  size={25}
                  fillColor="red"
                  unFillColor="#FFFFFF"
                  text="Special Characters"
                  iconStyle={{ borderColor: "black" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={(isChecked: boolean) => {setSpcl(isChecked)}}
                />
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>generatePassword(passwordLength)} style={[styles.buttonStyle, {backgroundColor: 'cyan'}]}>
                <Text style={{color: 'black'}}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetPassword} style={[styles.buttonStyle, {backgroundColor: '#EA3C53'}]}>
                <Text>Reset Password</Text>
              </TouchableOpacity>
            </View>
            {password.length>0?
              <View>
                <View style={[styles.passwordContainer, {flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}]}>
                  <Text style={{color: 'black', fontSize: 24, maxWidth: 0.8*deviceWidth}} selectable>{password}</Text>
                  <TouchableOpacity onPress={sharePassword}>
                    <Image source={require('./public/share.png')} style={{ width: 25, height: 25, margin: 10 }} />
                  </TouchableOpacity>
                </View>
              </View>
              :
              <>
              </>
            }
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  buttonStyle: {
    width: deviceWidth/2-10,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  passwordContainer:{
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ADD899',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  }
});
