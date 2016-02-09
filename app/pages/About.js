var React = require('react-native');
var HTMLView = require('react-native-htmlview');

var {
    View,
    ScrollView,
    Text,
    StyleSheet
} = React


var styles = StyleSheet.create({
    scrollView : {
        backgroundColor: '#F7F7F7'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#e5e5e5'
    },
    text : {
        color: '#777777',
        textAlign: 'center'
    }
})

var htmlContent = '<h2><b>VISION</b></h2>' +
                  '<br><br>'+
                  '「世界のクリエーターに発表の場を提供し、' +
                  '人々に今までにない感動を与える」' +
                  '<br><br>'+
                  '<h2><b>MISSION</b></h2>' +
                  '<br><br>'+
                  '”クリエーション”を追求した作品が、' +
                  '服としての役割を果たせる市場を創造する。' +
                  '<br><br>'+
                  'ファッション業界では、' +
                  '”ビジネス”と”クリエーション”の' +
                  'バランスを問われる局面があります。' +
                  'これはビジネスを前提としているからであり、' +
                  'Sofはビジネスを前提としていない、' +
                  '純粋にクリエーションに基づいた作品が、' +
                  '作品本来の役割を果たせるような市場を' +
                  '創造します。' +
                  '<br><br>' +
                  'クリエーションプラットフォームを創出し、' +
                  'ファッション教育に変革を起こす。' +
                  '<br><br>' +
                  'クリエーションプラットフォームとは、' +
                  'FASHIONやPHOTOGRAPHY、HAIR＆MAKEなど' +
                  'それぞれ補完関係にある業界に対し、' +
                  'その垣根を超え自身の世界観を表現できるよう' +
                  'それぞれの業界の人を結ぶ場を創造します。' +
                  'この場の創造により、' +
                  '今まで以上に自身のクリエーションを' +
                  '表現しやすくし、' +
                  '教育現場に変革をもたらします。' +
                  '<br><br>' +
                  '<b>クリエーティブな市場を創造すると共に、' +
                  '既存のファッション産業を拡大させる</b>' +
                  '<br><br>' +
                  'クリエーションに基づく作品が' +
                  '街に出ていく架け橋を創ると共に、' +
                  'それらの作品を身につける人たちの存在により' +
                  '人々のファッションの楽しむ気持ちを感化し、' +
                  '既存のファッション市場の拡大に努めます。' +
                  '<br><br>' +
                  'SPRING OF FASHIONで出来る事' +
                  '<br><br>' +
                  '・作品の投稿（発表）' +
                  '・作品の販売・レンタル' +
                  '・作品の投稿による' +
                  'フォトグラファーやヘアメイク、' +
                  'モデルとの繋がり' +
                  '<br><br>' +
                  'Why SPRING OF FASHION' +
                  '<br><br>' +
                  'Sof　利用方法について';

var About = React.createClass({
    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.text}>  
                        <HTMLView
                            value={htmlContent}
                        />
                    </Text>
                </View>
            </ScrollView>
        )
    }
})

module.exports= About