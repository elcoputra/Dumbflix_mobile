/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';

import {
  getDataMovie,
  getDataTv,
  getDetailMovie,
  searchMoviesAction,
} from '../redux/actions/movie_action';
import {getDataEpisodes} from '../redux/actions/episode_action';

import Navbar from '../components/navbar';

import {connect} from 'react-redux';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const numColumns = 3;
const {width: screenWidth} = Dimensions.get('window');
function Search(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState();
  const [searchData, setSearchData] = React.useState();
  useEffect(() => {
    setSearchData('');
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSearch('');
    props.searchMoviesAction(search);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getEpisodes = async (id) => {
    try {
      await props.getDetailMovie(id);
      await props.getDataEpisodes(id);
      props.navigation.navigate('Episodes');
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeText = async (searchInput) => {
    setSearch(searchInput);
    await props.searchMoviesAction(searchInput);
    setSearchData(dataSearch);
  };

  const formatData = (data, maxColumn) => {
    if (data) {
      const numOfFullRows = Math.floor(data.length / maxColumn);

      let numberOfElementLastRow = data.length - numOfFullRows * maxColumn;
      while (
        numberOfElementLastRow !== maxColumn &&
        numberOfElementLastRow !== 0
      ) {
        data.push({id: `blank-${numberOfElementLastRow}`, empty: true});
        numberOfElementLastRow = numberOfElementLastRow + 1;
      }

      return data;
    }
    return data;
  };
  const {dataMovies} = props.movieReducer;
  const {dataTvSeries} = props.tvReducer;
  const {dataSearch} = props.getSearchMoviesReducer;
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {/* <ScrollView
          style={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              colors={['#FFFFFF', '#FF7A7A', 'red']}
              progressBackgroundColor="#161616"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }> */}
        <FlatList
          // style={styles.flatList}
          // contentContainerStyle={styles.flatList}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={formatData(searchData, numColumns)}
          horizontal={false}
          refreshControl={
            <RefreshControl
              colors={['#FFFFFF', '#FF7A7A', 'red']}
              progressBackgroundColor="#161616"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={({item, index}) => {
            return (
              <View style={styles.containerImage}>
                <TouchableOpacity
                  disabled={item.empty === true ? true : false}
                  style={styles.containerImageCard}
                  onPress={() => getEpisodes(item.id)}>
                  <Image
                    style={styles.containerImageCard}
                    source={{uri: item.thumbnail}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          numColumns={numColumns}
          keyExtractor={(item) => `key-${item.id}`}
        />
        {/* </ScrollView> */}
      </View>
      <TextInput
        onChangeText={(searchInput) => {
          onChangeText(searchInput);
        }}
        value={search}
        style={styles.inputStyle}
        placeholderTextColor="#B9B9B9"
        placeholder="Input Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#161616',
  },
  container2: {
    flexGrow: 1,
  },
  scrollViewContent: {flex: 1},
  flatList: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerImage: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  containerImageCard: {
    borderRadius: 10,
    marginBottom: 10,
    height: screenWidth - 210,
    width: screenWidth - 280,
  },
  inputStyle: {
    color: 'white',
    backgroundColor: '#4C4C4C',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#C5C5C5',
    paddingLeft: 10,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

const mapStateToProps = (state) => {
  return {
    movieReducer: state.movieReducer,
    tvReducer: state.tvReducer,
    getSearchMoviesReducer: state.getSearchMoviesReducer,
  };
};

export default connect(mapStateToProps, {
  getDataMovie,
  getDetailMovie,
  getDataTv,
  getDataEpisodes,
  searchMoviesAction,
})(Search);
