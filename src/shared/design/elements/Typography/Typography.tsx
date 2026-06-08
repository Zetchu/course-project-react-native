import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { Link } from "expo-router";
import { typography } from "../../foundations";

type TypographyVariant = keyof Omit<typeof typography, "baseSize">;

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: ReactNode;
  href?: string;
  push?: boolean;
  replace?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "normal",
  children,
  href,
  push,
  replace,
  style,
  ...props
}) => {
  const textStyle =
    typography[variant as TypographyVariant] || typography.normal;

  if (href) {
    return (
      <Link href={href as any} push={push} replace={replace} asChild>
        <Text style={[textStyle, style]} {...props}>
          {children}
        </Text>
      </Link>
    );
  }

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};
