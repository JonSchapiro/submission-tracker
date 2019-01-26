
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native'; // 0.6.9
import SubmissionModel from '../models/submission';
import { addSubmission } from '../reducer';

const Form = t.form.Form;

class SubForm extends Component {
  componentDidMount() {
  }

  onPress = () => {
    const submission = this._form.getValue();
    if (submission) {
        console.log('Adding new submission: ', submission);
        submission.user = 'jschapir';
        this.props.addSubmission(submission);
    }
  }

  render() {
    return (
      <View>
          <Text>Error: {this.props.error}</Text>
          <Form ref={c => this._form = c} type={SubmissionModel}/>
          <Button
          title="Add Submission!"
          onPress={this.onPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = {
    addSubmission
};

export default connect(mapStateToProps, mapDispatchToProps)(SubForm);