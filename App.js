import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

const buttons = [
  { label: 'AC', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '±', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '%', backgroundColor: '#a6a6a6', textColor: '#000' },
  { label: '÷', backgroundColor: '#ff9500' },
  { label: '7', backgroundColor: '#333333' },
  { label: '8', backgroundColor: '#333333' },
  { label: '9', backgroundColor: '#333333' },
  { label: '×', backgroundColor: '#ff9500' },
  { label: '4', backgroundColor: '#333333' },
  { label: '5', backgroundColor: '#333333' },
  { label: '6', backgroundColor: '#333333' },
  { label: '-', backgroundColor: '#ff9500' },
  { label: '1', backgroundColor: '#333333' },
  { label: '2', backgroundColor: '#333333' },
  { label: '3', backgroundColor: '#333333' },
  { label: '+', backgroundColor: '#ff9500' },
  { label: '0', backgroundColor: '#333333', flexBasis: "50%" },
  { label: '.', backgroundColor: '#333333' },
  { label: '=', backgroundColor: '#ff9500' }
];

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export default function App() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [isResultTemporary, setIsResultTemporary] = useState(false);

  function handleClick(button) {
    switch (button.label) {
      case 'AC':
        setExpression("");
        setResult("0");
        break;

      case '±':
        if (result !== "0") {
          if (result.startsWith("-"))
            setResult(result.substring(1));
          else
            setResult("-" + result);
        }
        break;

      case '+':
      case '-':
      case '×':
      case '÷':
        appendOperation(button.label);
        break;

      case '=':
        setResult(String(calcResult()));
        setExpression("");
        setIsResultTemporary(true);
        break;

      case '%':
        if (result !== "0") {
          const value = calcResult() / 100;
          setResult(String(Math.round((value + Number.EPSILON) * 1000) / 1000));
          setExpression("");
          setIsResultTemporary(true);
        }
        break;

      case '.':
        if (!result.includes('.')) {
          setResult(result + '.');
          setIsResultTemporary(false);
        }
        break;

      default:
        if (isResultTemporary || result === "0") {
          setResult(button.label);
          setIsResultTemporary(false);
        }
        else if (result.length < 5) {
          setResult(result + button.label);
        }
        break;
    }

  }

  function appendOperation(operation) {
    let currentValue = result;
    if (currentValue.endsWith('.'))
      currentValue = currentValue.substring(0, currentValue.length - 1);

    if (expression.length == 0) {
      setExpression(`${currentValue} ${operation}`);
      setResult("0");
    }
    else {
      if (result === "0")
        setExpression(expression.substring(0, expression.length - 1) + operation);
      else {
        setExpression(`${expression} ${currentValue} ${operation}`);
        setResult("0");
      }
    }
  }

  function calcResult() {
    const fullExpression = (expression + result).replaceAll('×', '*').replaceAll('÷', '/');
    const resultValue = eval(fullExpression);
    return Math.round((resultValue + Number.EPSILON) * 1000) / 1000;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1 }} />
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ color: '#fff', opacity: 0.5, fontSize: 30, fontWeight: 'bold', textAlign: 'right' }}>{expression}</Text>
        <Text style={{ color: '#fff', fontSize: 100, fontWeight: 'bold', textAlign: 'right' }}>{result}</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {buttons.map(b =>
          <View key={b.label} style={{ flexBasis: b.flexBasis || "25%", alignItems: (b.flexBasis ? 'stretch' : 'center'), justifyContent: 'center', paddingVertical: 10 }}>
            <TouchableOpacity activeOpacity={0.75} onPress={() => handleClick(b)}>
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
