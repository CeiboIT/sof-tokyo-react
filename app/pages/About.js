/**
 * Created by epotignano on 24/01/16.
 */

var React = require('react-native');

var {
    View,
    Text,
    StyleSheet
    } = React


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: '#FFFFFF'
    },
})

var About = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    VISION

                    「世界のクリエーターに発表の場を提供し、
                    人々に今までにない感動を与える」

                    MISSION

                    ”クリエーション”を追求した作品が、
                    服としての役割を果たせる市場を創造する。

                    ファッション業界では、
                    ”ビジネス”と”クリエーション”の
                    バランスを問われる局面があります。
                    これはビジネスを前提としているからであり、
                    Sofはビジネスを前提としていない、
                    純粋にクリエーションに基づいた作品が、
                    作品本来の役割を果たせるような市場を
                    創造します。

                    クリエーションプラットフォームを創出し、
                    ファッション教育に変革を起こす。

                    クリエーションプラットフォームとは、
                    FASHIONやPHOTOGRAPHY、HAIR＆MAKEなど
                    それぞれ補完関係にある業界に対し、
                    その垣根を超え自身の世界観を表現できるよう
                    それぞれの業界の人を結ぶ場を創造します。
                    この場の創造により、
                    今まで以上に自身のクリエーションを
                    表現しやすくし、
                    教育現場に変革をもたらします。


                    クリエーティブな市場を創造すると共に、
                    既存のファッション産業を拡大させる。

                    クリエーションに基づく作品が
                    街に出ていく架け橋を創ると共に、
                    それらの作品を身につける人たちの存在により
                    人々のファッションの楽しむ気持ちを感化し、
                    既存のファッション市場の拡大に努めます。


                    SPRING OF FASHIONで出来る事
                    ・作品の投稿（発表）
                    ・作品の販売・レンタル
                    ・作品の投稿による
                    フォトグラファーやヘアメイク、
                    モデルとの繋がり


                </Text>
            </View>
        )
    }
})

module.exports= About

