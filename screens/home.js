/* eslint-disable react-hooks/exhaustive-deps */
// Data music yang sedang di play saya kirim lewat props ke music player props, biar simple,
// music player track tidak usah pake redux, callbacknya sudah mewakili data object music yang sedang di mainkan
import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ScrollView,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import {connect} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

import Joker from '../img/header/joker_mobile_slide.jpg';

const ENTRIES1 = [
  {
    title: 'Joker',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/0Debo6z.jpg',
  },
  {
    title: 'La Casa De Papel',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/VA0UDs7.jpg',
  },
  {
    title: 'The Witcher',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/TSzk0ns.jpg',
  },
];
const {width: screenWidth} = Dimensions.get('window');

function Home({navigation}) {
  const [entries, setEntries] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
    console.log(entries);
  };

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const openSideMenu = () => {
    navigation.openDrawer();
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
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

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
            onPress={() => navigation.navigate('Search')}>
            <AntDesign name="search1" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Content */}
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
          onSnapToItem={(index) => setActiveSlide(index)}
          lockScrollWhileSnapping={true}
          autoplay={true}
          hasParallaxImages={true}
          showSpinner={true}
          loop={true}
          enableSnap={true}
        />
        <CompPagination />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
  },
  // CAROUSEL
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
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Home);

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
