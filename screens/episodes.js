import React from 'react';
import {
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
} from 'react-native';

import Navbar from '../components/navbar';

import {connect} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const statusBarHeight = StatusBar.currentHeight;
function Episodes(props) {
  const {dataDetailMovie} = props.detailMovieReducer;
  const {dataEpisode} = props.episodeReducer;
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {/* HEADER */}
      <ImageBackground
        blurRadius={1}
        source={{uri: dataDetailMovie.thumbnail}}
        style={styles.backgroundImage}>
        <View style={styles.navbar}>
          <View style={styles.menuContainer}>
            <TouchableHighlight
              style={styles.btnMenu}
              onPress={() => props.navigation.pop()}>
              <AntDesign name="arrowleft" color="white" size={25} />
            </TouchableHighlight>
          </View>
          <View style={styles.searchContainer}>
            <TouchableHighlight
              style={styles.btnSearch}
              onPress={() => props.navigation.navigate('Search')}>
              <AntDesign name="search1" color="white" size={25} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.infoFilm}>
          <Image
            resizeMode="cover"
            source={{uri: dataDetailMovie.thumbnail}}
            style={styles.imgFilmInfo}
          />
          <View style={styles.columnInfo}>
            <View style={styles.titleInfo}>
              <Text style={styles.titleText}>{dataDetailMovie.title}</Text>
              <View style={styles.anotherInfoContainer}>
                <View style={styles.borderAnotherInfo}>
                  <Text style={styles.textAnotherInfo}>
                    {' '}
                    {dataDetailMovie.year}{' '}
                  </Text>
                </View>
                <View style={styles.borderAnotherInfo}>
                  <Text style={styles.textAnotherInfo}>
                    {' '}
                    {dataDetailMovie &&
                    dataDetailMovie.category &&
                    dataDetailMovie.category.name
                      ? dataDetailMovie.category.name
                      : null}{' '}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.descriptionInfo}>
              <ScrollView>
                <Text style={styles.descriptionText}>
                  {dataDetailMovie.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
        <LinearGradient
          colors={['transparent', '#161616']}
          style={styles.gradient}
        />
      </ImageBackground>
      {/* EPISODE LIST */}
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={dataEpisode}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={null}>
                <View style={styles.rootCardRow}>
                  <View style={styles.imageCardContainer}>
                    <Image
                      style={styles.imageCard}
                      resizeMode="cover"
                      source={{uri: item.thumbnailEpisode}}
                    />
                  </View>
                  <View style={styles.rootCardDetailColumn}>
                    <Text style={styles.titleCard}>{item.title}</Text>
                    <ScrollView>
                      <Text style={styles.descCard}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                      </Text>
                    </ScrollView>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => `key-${item.id}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  backgroundImage: {
    flex: 0.4,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
  },
  infoFilm: {
    padding: 10,
    zIndex: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imgFilmInfo: {
    height: '75%',
    width: '30%',
    borderRadius: 10,
  },
  columnInfo: {
    flex: 1,
    height: '75%',
    paddingLeft: 15,
    paddingVertical: 5,
  },
  titleInfo: {flex: 4, width: '100%'},
  titleText: {color: 'white', fontSize: 24, fontWeight: 'bold'},
  anotherInfoContainer: {flexDirection: 'row'},
  descriptionInfo: {
    flex: 6,
    paddingTop: 5,
    overflow: 'hidden',
  },
  borderAnotherInfo: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    marginRight: 5,
  },
  textAnotherInfo: {
    color: 'white',
    fontSize: 14,

    margin: 2,
  },
  descriptionText: {color: 'white'},
  gradient: {
    zIndex: 1,
    width: '100%',
    height: '70%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  // Navbar
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: statusBarHeight,
    padding: 10,
    backgroundColor: 'transparent',
    height: 45,
  },
  menuContainer: {flex: 1},
  btnMenu: {width: '100%'},
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageHome: {flex: 1, height: '100%'},

  searchContainer: {
    flex: 1,
  },
  btnSearch: {
    width: '100%',
    alignItems: 'flex-end',
  },
  // Card item

  flatListContainer: {
    flex: 0.6,

    paddingLeft: 10,
    paddingRight: 10,
  },
  rootCardRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 20,

    backgroundColor: '#000000',
  },
  imageCardContainer: {
    flex: 0.4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageCard: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rootCardDetailColumn: {
    flex: 0.6,
    width: '100%',
    padding: 5,
    paddingLeft: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#000000',
  },
  titleCard: {color: 'white', fontSize: 18},
  descCard: {color: 'white'},
});

const mapStateToProps = (state) => {
  return {
    detailMovieReducer: state.detailMovieReducer,
    episodeReducer: state.episodeReducer,
  };
};

export default connect(mapStateToProps, {})(Episodes);
