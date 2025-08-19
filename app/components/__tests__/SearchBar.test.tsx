import { icons } from "@/constants/icons";
import "@testing-library/jest-native/extend-expect";
import { fireEvent, render } from "@testing-library/react-native";
import SearchBar from "../SearchBar";


describe('<SearchBar />', () => {

    it('Renders SearchBar Correctly', () => {
        const { getByTestId } = render(
            <SearchBar
                placeholder='Search for a movie'
                placeholderTextColor="#a8b5db"
                editable={false}
                autoFocus={true} />);

        expect(getByTestId('SearchBar:Container').props.children.length).toEqual(2);
        expect(getByTestId('SearchBar:SearchIcon').props.source).toBe(icons.search);
        const input = getByTestId('SearchBar:TextInput');
        expect(input.props.placeholder).toBe('Search for a movie');
        expect(input.props.placeholderTextColor).toBe("#a8b5db");
        expect(input.props.editable).toBe(false);
        expect(input.props.autoFocus).toBe(true);
    });

    it('Updates SearchBar Value When Typing', () => {
        const mockedChangeText = jest.fn();
        const { getByTestId } = render(<SearchBar value='' onChangeText={mockedChangeText} />);

        const input = getByTestId('SearchBar:TextInput');

        fireEvent.changeText(input, 'Batman');
        expect(mockedChangeText).toHaveBeenCalledWith('Batman');
    });

    it('Calls onPress When SearchBar is Pressed', () => {
        const mockedOnPress = jest.fn();
        const { getByTestId } = render(<SearchBar onPress={mockedOnPress} />);
        const input = getByTestId('SearchBar:TextInput');
        fireEvent.press(input);
        expect(mockedOnPress).toHaveBeenCalledTimes(1);
    });

});