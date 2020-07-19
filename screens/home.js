/* eslint-disable react-hooks/exhaustive-deps */
// Data music yang sedang di play saya kirim lewat props ke music player props, biar simple,
// music player track tidak usah pake redux, callbacknya sudah mewakili data object music yang sedang di mainkan
import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {
  StyleSheet,
  View,
  RefreshControl,
  Image,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import {connect} from 'react-redux';

import {getDataMovie, getDataTv} from '../redux/actions/movie_action';

import AntDesign from 'react-native-vector-icons/AntDesign';

// Data couresel
const ENTRIES1 = [
  {
    id: 81,
    title: 'Joker',
    illustration: 'https://i.imgur.com/0Debo6z.jpg',
  },
  {
    id: 41,
    title: 'La Casa De Papel',
    illustration: 'https://i.imgur.com/VA0UDs7.jpg',
  },
  {
    id: 2,
    title: 'The Witcher',
    illustration: 'https://i.imgur.com/TSzk0ns.jpg',
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const {width: screenWidth} = Dimensions.get('window');

function Home(props) {
  const [entries, setEntries] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.getDataMovie();
    props.getDataTv();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const goForward = () => {
    carouselRef.current.snapToNext();
    console.log(entries);
  };

  useEffect(() => {
    setEntries(ENTRIES1);
    props.getDataMovie();
    props.getDataTv();
  }, []);

  const openSideMenu = () => {
    props.navigation.openDrawer();
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.touchSlide}
          onPress={() => console.log(item.title)}>
          <ParallaxImage
            source={{uri: item.illustration}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text> */}
      </View>
    );
  };

  function CompPagination() {
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        // containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={styles.dotStyle}
        // inactiveDotStyle={
        //   {
        //   }
        // }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  const {dataMovies} = props.movieReducer;
  const {dataTvSeries} = props.tvReducer;
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.btnMenu} onPress={openSideMenu}>
            <AntDesign name="menu-fold" color="white" size={25} />
          </TouchableOpacity>
        </View>
        <Image
          resizeMode={'contain'}
          style={styles.imageHome}
          source={require('../img/dumbsound.png')}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => props.navigation.navigate('Search')}>
            <AntDesign name="search1" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Content */}
      <ScrollView
        style={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.carouselContainer}>
          {/* <TouchableOpacity onPress={goForward}>
          <Text>go to next slide</Text>
        </TouchableOpacity> */}
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 20}
            data={entries}
            renderItem={renderItem}
            loopClonesPerSide={3}
            onBeforeSnapToItem={(index) => setActiveSlide(index)}
            lockScrollWhileSnapping={true}
            autoplay={true}
            hasParallaxImages={true}
            showSpinner={true}
            loop={true}
            enableSnap={true}
          />
          <CompPagination />
        </View>
        <View style={styles.containerCardRoot}>
          <Text style={styles.titleList}>NEW MOVIES</Text>
        </View>
        <View style={styles.containerCardRoot}>
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={dataMovies}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.containerCard}>
                    <View style={styles.containerImageCard}>
                      <Image
                        style={styles.containerImageCard}
                        source={{uri: item.thumbnail}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => `key-${item.id}`}
          />
        </View>
        <View style={styles.containerCardRoot}>
          <Text style={styles.titleList}>NEW SERIES</Text>
        </View>
        <View style={styles.containerCardRoot}>
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={dataTvSeries}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity>
                  <View style={styles.containerCard}>
                    <View style={styles.containerImageCard}>
                      <Image
                        style={styles.containerImageCard}
                        source={{uri: item.thumbnail}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => `key-${item.id}`}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#161616',
    height: 45,
  },
  menuContainer: {flex: 0.3},
  btnMenu: {width: '100%'},
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageHome: {flex: 1, height: '100%'},

  searchContainer: {
    flex: 0.3,
  },
  btnSearch: {
    width: '100%',
    alignItems: 'flex-end',
  },
  scrollViewContent: {flex: 1},
  // CAROUSEL
  carouselContainer: {flex: 1},
  item: {
    width: screenWidth - 20,
    height: screenWidth - 200,
  },
  touchSlide: {position: 'relative', width: '100%', height: '100%'},
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 5,

    width: '100%',
    height: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: undefined,
    height: undefined,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.56)',
    borderRadius: 5,
    padding: 5,
    fontSize: 28,
    color: 'white',
  },

  dotStyle: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    marginHorizontal: 8,
    backgroundColor: '#DB202C',
  },
  // CAROUSEL END
  // Bagian Card
  containerCardRoot: {
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  titleList: {textAlign: 'left', color: '#b7b7b7', fontSize: 14},
  containerCard: {
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  containerImageCard: {
    borderRadius: 10,
    height: screenWidth - 215,
    width: screenWidth - 280,
    backgroundColor: '#7c7f81',
  },
  containerTitleText: {
    marginTop: 5,
    color: '#ababab',
  },
});

const mapStateToProps = (state) => {
  return {movieReducer: state.movieReducer, tvReducer: state.tvReducer};
};

export default connect(mapStateToProps, {getDataMovie, getDataTv})(Home);

// // BACKUP
// /* eslint-disable react-hooks/exhaustive-deps */
// // Data music yang sedang di play saya kirim lewat props ke music player props, biar simple,
// // music player track tidak usah pake redux, callbacknya sudah mewakili data object music yang sedang di mainkan
// import React, {Component, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   StatusBar,
//   Image,
//   ScrollView,
//   Text,
//   FlatList,
//   ImageBackground,
//   TouchableOpacity,
// } from 'react-native';

// import {connect} from 'react-redux';

// import AntDesign from 'react-native-vector-icons/AntDesign';

// function Home({navigation}) {
//   useEffect(() => {}, []);

//   const openSideMenu = () => {
//     navigation.openDrawer();
//   };

//   return (
//     <View style={styles.container}>
//       {/* Navbar */}
//       <View style={styles.navbar}>
//         <View style={styles.menuContainer}>
//           <TouchableOpacity style={styles.btnMenu} onPress={openSideMenu}>
//             <AntDesign name="menu-fold" color="white" size={25} />
//           </TouchableOpacity>
//         </View>
//         <Image
//           resizeMode={'contain'}
//           style={styles.imageHome}
//           source={require('../img/dumbsound.png')}
//         />
//         <View style={styles.searchContainer}>
//           <TouchableOpacity
//             style={styles.btnSearch}
//             onPress={() => navigation.navigate('Search')}>
//             <AntDesign name="search1" color="white" size={25} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* Content */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#161616',
//   },
//   navbar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: '#161616',
//     height: 45,
//   },
//   menuContainer: {flex: 0.3},
//   btnMenu: {width: '100%'},
//   imgContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   imageHome: {flex: 1, height: '100%'},

//   searchContainer: {
//     flex: 0.3,
//   },
//   btnSearch: {
//     width: '100%',
//     alignItems: 'flex-end',
//   },
// });

// const mapStateToProps = (state) => {
//   return {};
// };

// export default connect(mapStateToProps, {})(Home);
