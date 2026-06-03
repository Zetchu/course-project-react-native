import React from "react";
import { View, ViewStyle } from "react-native";
import { colors, shadows, shapes, spacing } from "../../foundations";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: shapes.borderRadius,
          padding: spacing.inside,
          marginBottom: spacing.between,
          ...shadows.main,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
