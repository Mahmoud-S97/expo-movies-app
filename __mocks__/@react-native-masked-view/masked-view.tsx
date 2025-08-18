// __mocks__/@react-native-masked-view/masked-view.tsx
import React from 'react';
import { View } from 'react-native';

type MaskedViewProps = {
    children?:  React.ReactNode,
    maskElement?: React.ReactNode,
    [key: string]: any
}

const MockedMaskedView = ({children, maskElement, ...props}: MaskedViewProps) => {
    return (
        <View testID={props.testID || "masked-view-mock"} {...props}>
            {maskElement && (
                <View testID="masked-view-maskElement">{maskElement}</View>
            )}
            <View testID="masked-view-children">{children}</View>
        </View>
    )
}

MockedMaskedView.displayName = "MaskedView";

export default MockedMaskedView;