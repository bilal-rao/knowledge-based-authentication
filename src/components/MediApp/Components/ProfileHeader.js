import React, {Component} from 'react';
import {Avatar} from 'react-native-elements';
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import {baseStyles, borderWidth, colors, margin} from "../../../styles/base";
import editImg from "../../../assests/profile/edit_btn.png";
import camerImg from "../../../assests/camera.png";
import AppAvatar from "../../utility/AppAvatar";

const ProfileHeader = ({speciality, fullName, backCover, profileImage, titleColor, isEdit, onEditProfilePic, onEditCoverPic}) => {
  return (
    <View style={[baseStyles.containerFull, {position: 'relative'}]}>
      <Image
        source={backCover}
        style={{height: 170, width: '100%', backgroundColor: titleColor}}
      />
      <View style={styles.profileContainer}>
        <AppAvatar
          size={135}
          rounded
          containerStyle={{borderWidth: borderWidth.lg, borderColor: titleColor, marginBottom: margin.md}}
          source={{uri: (profileImage ? profileImage : null), }}
          title={fullName ? fullName.slice(0, 2).toLocaleUpperCase() : ''}
          activeOpacity={0.1}
        />

        {isEdit ?
          <TouchableOpacity style={styles.imageList} onPress={onEditProfilePic}>
            <Image source={camerImg} style={[styles.btnStyle]}/>
          </TouchableOpacity>
          :
          null
        }

        <Text style={{color: colors.primaryText, fontSize: 23, marginBottom: 2}}>{fullName}</Text>
        <Text style={{color: titleColor, fontSize: 18, marginBottom: 5}}>{speciality}</Text>
      </View>
      {isEdit ?
        <TouchableOpacity style={[styles.imageList, {width: 20, right: 20, top: 130}]} onPress={onEditCoverPic}>
          <Image source={camerImg} style={[styles.btnStyle, {width: 20, height: 20}]}/>
        </TouchableOpacity>
        :
        null
      }
    </View>
  )
};
const styles = {
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -73,
    marginBottom: margin.sm,
    position: 'relative'
  },
  imageList: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: 135,
    paddingHorizontal: 2,
    flexDirection: 'column',
    position: 'absolute',
    top: 37
  },
  btnStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60
  },
};

export default ProfileHeader;
