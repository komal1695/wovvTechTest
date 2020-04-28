/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SafeAreaView from "react-native-safe-area-view";
import { Spinner } from 'native-base';


export default class RandomId extends React.Component {

    state = {
        Id: '',
        url: '',
        name: '',
        is_potentially_hazardous_asteroid: '',
        isloading: true
    }
    componentDidMount() {
        this.state.Id = this.props.navigation.getParam('ID')
        console.log('ID', this.state.Id);

        const url = `https://api.nasa.gov/neo/rest/v1/neo/${this.state.Id}?api_key=3YRMVSNxG29yex2LhUbfxq5DaIcDenP0qDOYGICw`

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    url: res.nasa_jpl_url,
                    name: res.name,
                    is_potentially_hazardous_asteroid: res.is_potentially_hazardous_asteroid,
                    isloading: false

                })

            })
            .catch(error => {

                this.setState({
                    isloading: false,
                })
            })

    }


    render() {

        let { isloading } = this.state;

        if (isloading) {
            return <Spinner />
        } else {
            return (
                <View style={{ padding: moderateScale(20) }}>
                    <Text>Name :{this.state.name}</Text>
                    <Text>nasa jpl url :{this.state.url}</Text>
                    <Text>is potentially hazardous asteroid :{this.state.is_potentially_hazardous_asteroid}</Text>
                </View>
            )
        }
    }

}
