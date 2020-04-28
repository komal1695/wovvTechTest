/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SafeAreaView from "react-native-safe-area-view";
import { Container, Item, Input, Label, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Home extends React.Component {

    state = {
        Asteroid: '',
        isShowList: false,
        errMsg: '',
        doesIdExits: false,
        randomAsteroidArr: [],
        data: []
    }

    componentDidMount() {

        setTimeout(() => {
            this.fetchData();
        }, 50);

    }

    fetchData() {

        const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY'

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.near_earth_objects,
                    randomAsteroidArr: res.near_earth_objects.map(x => x.id),
                })
                console.log('res', res);

            })
            .catch(error => {
                console.log('error');

            })
    }


    randomAsteroidClicked() {

        if (this.state.isShowList) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList nestedScrollEnabled={true}
                        contentContainerStyle={{ paddingBottom: moderateScale(20) }}
                        style={{ marginTop: moderateScale(40), padding: moderateScale(40) }}
                        data={this.state.data}
                        renderItem={({ item }) => {
                            <TouchableOpacity style={{ justifyContent: "center", marginBottom: moderateScale(10) }}
                                onPress={() => this.randomAsteroidSelected(item.id)}
                            >
                                <Text style={{ backgroundColor: '#A9A9A9', color: '#000000', padding: moderateScale(10) }}>
                                    {item.id}
                                </Text>
                            </TouchableOpacity>
                        }}
                    >

                    </FlatList>
                </View >

            )
        } else {
            return null

        }
    }

    randomAsteroidSelected(ID) {
        this.props.navigation.navigate('EnteredId', { Id: ID })
    }

    navigateTo(ID) {
        let doesIdExits = this.state.randomAsteroidArr.includes(ID)

        if (doesIdExits) {
            this.props.navigation.navigate('EnteredId', { Id: ID })
            this.setState({
                doesIdExits: true
            })
        } else {
            this.setState({
                errMsg: 'No Match Found'
            })
        }
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Container>
                        <View style={styles.commonView}>
                            <View style={{ marginBottom: moderateScale(30) }}>
                                <Item floatingLabel>
                                    <Label>Enter Asteroid ID</Label>
                                    <Input
                                        value={this.state.Asteroid}
                                        onChangeText={Asteroid => this.setState({ Asteroid, errMsg: '' })}
                                    />
                                </Item>
                            </View>
                            <View style={styles.CommonBtnView}>
                                <View style={{ flex: 0.4 }}>
                                    <Button rounded
                                        disabled={(this.state.Asteroid == '') ? true : false}
                                        onPress={() => { this.navigateTo(this.state.Asteroid) }}
                                    >
                                        <Text style={{ textAlign: "center" }}>Submit</Text>
                                    </Button>
                                </View>
                                <View style={{ flex: 0.4 }}>
                                    <Button rounded
                                        onPress={() => this.setState({ isShowList: true })}
                                    >
                                        <Text style={{ textAlign: "center" }}>Random Asteroid</Text>
                                    </Button>
                                </View>
                            </View>

                        </View>
                        <View><Text style={{ textAlign: "center" }}>{this.state.errMsg}</Text></View>
                        {this.randomAsteroidClicked()}
                    </Container>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    commonView: {
        padding: moderateScale(20),
        justifyContent: 'center'
    },
    CommonBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})
