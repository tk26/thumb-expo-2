import React from 'react';
import DatePicker from 'react-native-datepicker';
import { fontColors } from './BaseStyles';

// Make a component
const DateSelector = (props) => {
  const { minDate, maxDate, placeholder, onDateChange, date} = props;
  return (
    <DatePicker
      date={date}
      mode="date"
      androidMode="spinner"
      placeholder={placeholder}
      format="MMM Do, YYYY"
      showIcon={false}
      minDate={minDate}
      maxDate={maxDate}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={onDateChange}
      customStyles={styles}
    />
  );
};

const styles = {
  dateInput: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#979797'
  },
  dateText: {
    color: fontColors.lightBlack,
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    lineHeight: 23,
    flex: 1
  },
  placeholderText: {
    color: fontColors.grey,
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    letterSpacing: 0,
    lineHeight: 23,
    flex: 1
  },
  btnTextText: {
    color: fontColors.lightBlack,
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600'
  },
  btnTextCancel: {
    color: fontColors.lightBlack,
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    fontWeight: '600'
  }
}

export { DateSelector };
