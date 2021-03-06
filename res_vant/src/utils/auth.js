
import Lockr from 'lockr'


const TokenKey = 'User-Token'
const UserNameKey = 'User-Name'
const AvatarKey = 'User-Avatar'
const UseridKey = 'User-Userid'

const siteid = 'vant-siteid'
const yuzhong = 'vant-yuzhong'
const global_fanyi_object = 'vant-global_fanyi_object'


export function getToken() {
  return Lockr.get(TokenKey)
}

export function setToken(token) {
  return Lockr.set(TokenKey, token)
}

export function removeToken() {
  return Lockr.rm(TokenKey)
}

export function getUserName() {
  return Lockr.get(UserNameKey)
}

export function setUserName(name) {
  return Lockr.set(UserNameKey, name)
}

export function removeUserName() {
  return Lockr.rm(UserNameKey)
}

export function getUserid() {
  return Lockr.get(UseridKey)
}

export function setUserid(Userid) {
  return Lockr.set(UseridKey, Userid)
}

export function removeUserid() {
  return Lockr.rm(UseridKey)
}

export function getAvatar() {
  return Lockr.get(AvatarKey)
}

export function setAvatar(name) {
  return Lockr.set(AvatarKey, name)
}

export function removeAvatar() {
  return Lockr.rm(AvatarKey)
}



export function getsiteid() {
  return Lockr.get(siteid)
}

export function setsiteid(name) {
  return Lockr.set(siteid, name)
}

export function getyuzhong() {
  return Lockr.get(yuzhong)? Lockr.get(yuzhong):'zn'
}

export function setyuzhong(value) {
  return Lockr.set(yuzhong, value)
}

export function getglobal_fanyi_object() {
  return Lockr.get(global_fanyi_object)? Lockr.get(global_fanyi_object):{}
}

export function setglobal_fanyi_object(value) {
  return Lockr.set(global_fanyi_object, value)
}



