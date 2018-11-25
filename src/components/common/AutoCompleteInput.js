import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, ListView, TextInput } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { StandardText, Input, CardSection } from '../common';
import { fontColors } from './BaseStyles';

export class AutoCompleteInput extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    filterProperty: PropTypes.string,
    itemCollection: PropTypes.array,
    onSelectItem: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  findItem(query) {
    if (query === '') {
      return [];
    }
    const { itemCollection, filterProperty } = this.props;
    const regex = new RegExp(`${query.trim()}`, 'i');
    const filteredItems = itemCollection.filter(item => item[filterProperty].search(regex) >= 0);
    return filteredItems;
  }

  render() {
    const { query } = this.state;
    const { filterProperty, placeholder } = this.props;
    const items = this.findItem(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return(
        <View style={styles.container}>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            listContainerStyle={styles.listContainer}
            inputContainerStyle={styles.inputContainer}
            listStyle={styles.list}
            data={items.length === 1 && comp(query, items[0][filterProperty]) ? [] : items}
            renderTextInput={() => {
              return (
                <TextInput
                  placeholder={placeholder}
                  onChangeText={text => this.setState({ query: text })}
                  value={this.state.query}
                  underlineColorAndroid='transparent'
                  placeholderTextColor={fontColors.grey}
                  style={styles.searchInput}
                />
              )}
            }
            renderItem={(item) => (
              <CardSection>
                <TouchableOpacity onPress={() => {
                  this.props.onSelectItem(item[filterProperty])
                  this.setState({query: ''});
                }}>
                  <Text style={styles.listItem} >
                    {item[filterProperty]}
                  </Text>
                </TouchableOpacity>
              </CardSection>
            )}
          />
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    zIndex: 1
  },
  autocompleteContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    borderWidth: 0
  },
  searchInput: {
    color: fontColors.lightGrey,
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    lineHeight: 23,
    flex: 1
  },
  inputContainer: {
    paddingLeft: 5,
    borderWidth: 0.5,
    borderColor: fontColors.lightGrey,
    borderRadius: 2
  },
  listContainer: {
    borderWidth: 0
  },
  list: {
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: fontColors.lightGrey,
    margin: 0
  },
  listItem: {
    fontFamily: 'Helvetica Neue',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 18,
    color: fontColors.lightGrey
  }
};
