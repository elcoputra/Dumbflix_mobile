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
} from 'react-native';

import {
  getDataMovie,
  getDataTv,
  getDetailMovie,
} from '../redux/actions/movie_action';
import {getDataEpisodes} from '../redux/actions/episode_action';

import Navbar from '../components/navbar';

import {connect} from 'react-redux';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const {width: screenWidth} = Dimensions.get('window');
function Moives(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    props.getDataMovie();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.getDataMovie();
    props.getDataTv();
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
  const {dataMovies} = props.movieReducer;
  const {dataTvSeries} = props.tvReducer;
  return (
    <View style={styles.container}>
      <Navbar navigation={props.navigation} titleScreen="Movies" />
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
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={dataMovies}
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
                <TouchableOpacity onPress={() => getEpisodes(item.id)}>
                  <Image
                    style={styles.containerImageCard}
                    source={{uri: item.thumbnail}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          numColumns={3}
          keyExtractor={(item) => `key-${item.id}`}
        />
        {/* </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  container2: {
    flex: 1,
  },
  scrollViewContent: {flex: 1},
  containerCard: {
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  flatList: {},
  containerImage: {flex: 1, flexDirection: 'column', margin: 5},
  containerImageCard: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth - 200,
    width: screenWidth - 270,
  },
});

const mapStateToProps = (state) => {
  return {movieReducer: state.movieReducer, tvReducer: state.tvReducer};
};

export default connect(mapStateToProps, {
  getDataMovie,
  getDetailMovie,
  getDataTv,
  getDataEpisodes,
})(Moives);
