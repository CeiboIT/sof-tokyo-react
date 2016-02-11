/* global , */
/**
 * Created by mmasuyama on 1/7/2016.
 */
var React = require('react-native');
var apiPosts = require('../../utils/api/PostsApi');
var apiBanners = require('../../utils/api/BannersApi');

var PostElement = require('./PostElement');
var BannerElement = require('../banners/BannerElement');
var GridView = require('react-native-grid-view');
var PostsStream = require("../../services/Streams").getStream("Posts");
var BannersStream = require("../../services/Streams").getStream("Banners");
var Carousel = require('react-native-carousel');
var GiftedSpinner = require('react-native-gifted-spinner');
var Dimensions = require('Dimensions');
var screen = Dimensions.get('window');

var {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7'        
    },

    title: {
        fontSize: 25
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },

    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    },
    carouselContainer: {
        width: screen.width,
        height: screen.height*0.25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

var PostsList  = React.createClass({
    getInitialState() {
        return {
            dataSource: [],
            banners: [],
            note: '',
            error: '',
            page: 1,
            isLoading: true
        };
    },

    componentDidMount() {
        apiPosts.LoadPosts(this.page)
        PostsStream.subscribe((response) => {
            this.setState({
                dataSource: response['posts']
            });
        });
        apiBanners.LoadBanners(this.page)
        BannersStream.subscribe((response) => {
            this.setState({
                banners: response['banners']
            });
        });
    },
    carouselSize () {
        var style = {
            width: screen.width,
            height: null,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
        }
        if(screen.width <= 360){
            style.height = screen.height*0.25;
        }else{
            style.height = screen.height*0.4;
        }   

        return style  
    },
    render(){

        var _grid = (
            <ScrollView>
                <View>
                    <Carousel width={screen.width} delay={5000}>
                        {
                            this.state.banners.map((banner) => {
                                return <View style={[this.carouselSize()]} key={banner.ID}>
                                                <BannerElement bannerData={banner} bannerId={banner.ID}/>
                                        </View>
                                })
                        }  
                    </Carousel>
                    <GridView
                        items={this.state.dataSource}
                        itemsPerRow={2}
                        renderItem={(rowData) => <PostElement key={rowData.id} postData={ rowData } />}
                        style={{
                            backgroundColor: '#F7F7F7'
                        }}
                    />
                </View>
            </ScrollView>
            )

        var _loading = (
            <View style={styles.loading}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.dataSource && this.state.dataSource.length && this.state.banners && this.state.banners.length) ? _grid : _loading
        return _render
    }
})

module.exports = PostsList;