import React, {useRef, useState} from 'react';
import Orientation from 'react-native-orientation';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableHighlight,
  Text,
} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

import Video from 'react-native-video';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {connect} from 'react-redux';

const statusBarHeight = StatusBar.currentHeight;
const noop = () => {};
function VideoPlayer(props) {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [orit, setOrit] = useState();

  const initial = Orientation.getInitialOrientation();
  if (initial === 'PORTRAIT') {
    // do something
    if (orit !== initial) {
      Orientation.lockToLandscapeLeft();
      setOrit('PORTRAIT');
    }
  } else {
    // do something else
  }

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
  };

  const backPress = () => {
    Orientation.lockToPortrait();
    props.navigation.pop();
  };

  const searchPress = () => {
    Orientation.lockToPortrait();
    props.navigation.navigate('Search');
  };

  const onSeeking = (currentTime) => setCurrentTime(currentTime);
  const {url} = props.route.params;
  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true}
        barStyle="light-content"
        backgroundColor="#161616"
        translucent={false}
      />
      <Video
        ignoreSilentSwitch="ignore"
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        fullscreenAutorotate="landscape"
        fullscreen={true}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode="cover"
        source={{
          uri: url,
        }}
        style={styles.mediaPlayer}
        volume={1}
      />
      <MediaControls
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="red"
        onFullScreen={noop}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}>
        <MediaControls.Toolbar>
          <View style={styles.menuContainer}>
            <TouchableHighlight style={styles.btnMenu} onPress={backPress}>
              <AntDesign name="arrowleft" color="white" size={25} />
            </TouchableHighlight>
          </View>
          <View style={styles.searchContainer}>
            {/* <TouchableHighlight
              style={styles.btnSearch}
              onPress={Orientation.lockToLandscapeLeft}>
              <AntDesign name="search1" color="white" size={25} />
            </TouchableHighlight> */}
            <TouchableHighlight style={styles.btnSearch} onPress={searchPress}>
              <AntDesign name="search1" color="white" size={25} />
            </TouchableHighlight>
          </View>
        </MediaControls.Toolbar>
      </MediaControls>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Navbar
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(VideoPlayer);
