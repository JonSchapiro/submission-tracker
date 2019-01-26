
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getSubmissions } from '../reducer';

class Submissions extends Component {
  componentDidMount() {
    this.props.getSubmissions();
  }

  render() {
    const { submissions } = this.props;
    return (
      <View>
          <Text class="item">Hello World</Text>
        {submissions.map(sub => {
            return <Text>hi there</Text>
        })}
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
    error: state.error,
    submissions: state.submissions
  };
};

const mapDispatchToProps = {
    getSubmissions
};

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);