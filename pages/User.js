import { Button, Pressable, Text, View, Image } from "react-native"
import { userStyles } from "../styles/UserScreen"
import { auth, signOut } from "../src/firebase/config"
import { useState, useEffect } from "react"
import { onAuthStateChanged, db, doc, getDoc } from "../src/firebase/config"

export default function User({navigation}){
    const src = require("../assets/default.png")
    const emptyShop = {
        "Image":"",
        "LikedBy":[],
        "NumberOfLikes":0,
        "Posts":[]
    }
    const emptyUser = {
        "NumberOfLikes":0,
        "bio":"",
        "email":"",
        "friends":[],
        "likedShops":[],
        "name":""
    }
    const [shopAr, setShopAr] = useState([emptyShop, emptyShop, emptyShop]);

    function handleLogout() {
        signOut(auth).then(()=>{
            console.log("Sign out successful");
            navigation.navigate('Registration')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }


    const [user, setUser] = useState(emptyUser)
    useEffect(()=>{
        onAuthStateChanged(auth, (curUser)=>{
        if(curUser){
            getDoc(doc(db, "users", curUser.uid))
            .then((ss) => {
                if(ss){
                    setUser(ss.data())
                }
            }).catch((error) =>{
                console.log(error.message)
            })
        }
        })
    },[])

    useEffect(()=>{
        console.log("shopAr")
        console.log(shopAr)
    }, [shopAr])

    return ( 
    <View style={userStyles.container}>
        <View style={userStyles.profile}>
            <View style={userStyles.profileUpperBar}>
                <Image style={userStyles.profilePic} source={src} />
                <View style={userStyles.likedShops}>
                    <Text style={userStyles.numberOfShops}>{user.likedShops.length}</Text>
                    <Text style={userStyles.likedShopsText}>{user.likedShops.length == 1 ? ("liked shop") : "liked shops"}</Text>
                </View>
                <View style={userStyles.likedShops}>
                    <Text style={userStyles.numberOfShops}>{user.friends.length}</Text>
                    <Text style={userStyles.likedShopsText}>{user.friends.length == 1 ? ("friend") : "friends"}</Text>
                </View>
            </View>
            <Text style={userStyles.profileName}>{user.name}</Text>
            {user.bio ? (
                <Text style={userStyles.profileBio}>
                    {user.bio}
                </Text>
            ) : (
                <Pressable>
                    <Text>Click to fill out a bio!</Text>
                </Pressable>
            )}
            <Pressable style={userStyles.logoutButton} onPress={handleLogout}>
                <Text style={userStyles.logoutText}>Logout</Text>    
            </Pressable>
        </View>
        <View style={userStyles.shopList}>
        </View>
    </View>
    )
}

