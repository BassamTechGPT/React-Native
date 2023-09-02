import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Platform } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import SortCategories from "../components/sortCategories";
import Destinations from "../components/destinations";

export default function HomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === "android" ? "5%" : 0 }}>
            <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6"}>

                {/* Avatar */}
                <View className="mx-5 flex-row justify-between items-center mb-10">
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">Let's Discover</Text>
                    <TouchableOpacity>
                        <Image source={require("../../assets/images/avatar.png")} style={{ height: wp(12), width: wp(12) }} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="mx-5 mb-4">
                    <View className="flex-row item-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
                        <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
                        <TextInput
                            placeholder="Search Destination"
                            placeholderTextColor="gray"
                            className="flex-1 text-base mb-1 pl-1 tracking-wider"
                        />
                    </View>
                </View>

                {/* Categories */}
                <View className="mb-4">
                    <Categories />
                </View>

                {/* Sort Categories */}
                <View className="mb-4">
                    <SortCategories />
                </View>

                {/* Destinations */}
                <View>
                    <Destinations />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
