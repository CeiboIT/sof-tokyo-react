var React = require('react-native'),
    apiBanners = require('../../utils/api/BannersApi'),
    BannerElement = require('./BannerElement'),
    BannersStream = require("../../services/Streams").getStream("Banners"),
    Carousel = require('react-native-carousel'),
    GiftedSpinner = require('react-native-gifted-spinner'),
    Dimensions = require('Dimensions'),
    screen = Dimensions.get('window');

var {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView
} = React;

var sectionHeight = (screen.width <= 360) ? screen.height*0.25 : screen.height*0.4;

var styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: sectionHeight,
    },
    carouselSize : {
        width: screen.width,
        height: sectionHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});

var NewsCarousel  = React.createClass({
    getInitialState() {
        return {
            banners: [],
            isLoading: true
        };
    },

    componentDidMount() {
        apiBanners.LoadBanners()
        BannersStream.subscribe((response) => {     
            this.setState({
                banners: response['banners']
            });
        });
    },
    render(){

        var _grid = (
            <ScrollView>
                <View>
                    <Carousel width={screen.width} delay={5000}>
                        {
                            this.state.banners.map((banner) => {
                                return <View style={styles.carouselSize} key={banner.ID}>
                                                <BannerElement bannerData={banner} bannerId={banner.ID}/>
                                        </View>
                                })
                        }  
                    </Carousel>
                </View>
            </ScrollView>
            )

        var _loading = (
            <View style={styles.loading}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.banners && this.state.banners.length) ? _grid : _loading
        return _render
    }
})

module.exports = NewsCarousel;