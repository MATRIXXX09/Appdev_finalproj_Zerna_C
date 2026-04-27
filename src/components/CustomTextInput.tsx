import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CustomTextInputProps } from '../../types';

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  label,
  labelStyle,
  value,
  onChangeText,
  containerStyle,
  textStyle,
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#d9a6d4"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          textStyle,
          {
            height: 48,
            color: textStyle?.color || '#333333',
            backgroundColor: textStyle?.backgroundColor || 'transparent',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderBottomWidth: focused ? 2 : 0,
            borderBottomColor: focused ? '#ff1493' : 'transparent',
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
