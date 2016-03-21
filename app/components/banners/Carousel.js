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

var styles = StyleSheet.create({
    
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
                </View>
            </ScrollView>
            )

        var _loading = (
            <View style={{flex:1}}>
                <GiftedSpinner/>
            </View>
        )

        var _render = (this.state.banners && this.state.banners.length) ? _grid : _loading
        return _render
    }
})

module.exports = NewsCarousel;