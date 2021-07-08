import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

const buttons = [
  { label: 'AC', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '±', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '%', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '÷', backgroundColor: '#ff9500' },
  { label: 7, backgroundColor: '#333333' },
  { label: 8, backgroundColor: '#333333' },
  { label: 9, backgroundColor: '#333333' },
  { label: '×', backgroundColor: '#ff9500' },
  { label: 4, backgroundColor: '#333333' },
  { label: 5, backgroundColor: '#333333' },
  { label: 6, backgroundColor: '#333333' },
  { label: '-', backgroundColor: '#ff9500' },
  { label: 1, backgroundColor: '#333333' },
  { label: 2, backgroundColor: '#333333' },
  { label: 3, backgroundColor: '#333333' },
  { label: '+', backgroundColor: '#ff9500' },
  { label: 0, backgroundColor: '#333333', flexBasis: "50%" },
  { label: '.', backgroundColor: '#333333' },
  { label: '=', backgroundColor: '#ff9500' }
];

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: '#fff', opacity: 0.5, fontSize: 30, fontWeight: 'bold', textAlign: 'right', letterSpacing: 5 }}>5+3=</Text>
        <Text style={{ color: '#fff', fontSize: 100, fontWeight: 'bold', textAlign: 'right' }}>8</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {buttons.map(b =>
          <View style={{ flexBasis: b.flexBasis || "25%", alignItems: (b.flexBasis ? 'stretch' : 'center'), justifyContent: 'center', paddingVertical: 10 }}>
            <TouchableOpacity activeOpacity={0.75}>
              <View style={{ backgroundColor: b.backgroundColor, width: (b.flexBasis ? undefined : 80), height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, color: b.textColor || "#fff", fontWeight: 'bold' }}>{b.label}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});
