import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Linking, SafeAreaView } from 'react-native'
import axios from 'axios'
import {Card, Title, Paragraph} from 'react-native-paper'

export default class HomeScreen extends Component {
    state = {
        articles: [],
        isLoading: true,
        errors: null
    };

    getArticles() {
        axios
        .get(
            "https://newsapi.org/v2/top-headlines?country=us&apiKey=3350efa037674134ad76925898922ebc"
        )
        .then(response =>
            response.data.articles.map(article => ({
            date: `${article.publishedAt}`,
            title: `${article.title}`,
            url: `${article.url}`,
            description: `${article.description}`,
            urlToImage: `${article.urlToImage}`,
            author: `${article.author}`,
            }))
        )
        .then(articles => {
            this.setState({
            articles,
            isLoading: false
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
    componentDidMount() {
        this.getArticles();
    }

    render(){
        const{ isLoading, articles } = this.state;
        return (
            <SafeAreaView>
                <ScrollView>
                    {/*  header */}
                    <View style={{borderColor: 'lightgrey', borderBottomWidth: 1}}>
                        <Text style={{fontSize: 32, marginLeft: 30, marginTop: 25, marginBottom: 25}}>EXPLORE</Text>
                    </View>
                    {!isLoading ? (
                        articles.map(article => {
                        const {date, title, url, description, urlToImage, author} = article;
                        return(
                            <Card key={url} style={{borderColor:'lightgrey', borderTopWidth:0 , borderBottomWidth:1, marginRight: 30, marginLeft: 30, shadowColor: 'rgba(0,0,0, .2)',
                            shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0, shadowRadius: 0 }}
                            onPress={()=>{Linking.openURL(`${url}`)}}
                            >
                                <View style={{flexDirection:'column', marginBottom:10}}>
                                    {/*  Image */}
                                    <View style={{marginTop: 25}}>
                                        <Image style={{width:300, height:200}} source={{uri: urlToImage}} />
                                    </View>  
                                    {/*  Title */}
                                    <View style={{marginTop: 15}}>
                                        <Title>{title}</Title>
                                    </View>
                                    
                                </View>
                                {/*  Description */}
                                <View style={{marginBottom: 15}}>
                                    <Paragraph>{description}</Paragraph>
                                </View>
                                {/*  author and date */}
                                <View style={{marginBottom: 25}}>
                                        <Text style={{fontWeight: 'bold'}}>{author}</Text>
                                        <Text>{date}</Text>
                                </View>
                            </Card>
                        );
                    })
                    ) : (
                    <Text style={{justifyContent:'center', alignItems:'center'}}>Loading...</Text>
                    )}
                </ScrollView>
            </SafeAreaView>
        )
    }

}