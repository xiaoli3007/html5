
import Lockr from 'lockr'


const TokenKey = 'User-Token'
const NameKey = 'User-Name'
const AvatarKey = 'User-Avatar'
const UseridKey = 'User-Userid'

const siteid = 'vant-siteid'


export function getToken() {
  return Lockr.get(TokenKey)
}

export function setToken(token) {
  return Lockr.set(TokenKey, token)
}

export function removeToken() {
  return Lockr.rm(TokenKey)
}

export function getName() {
  return Lockr.get(NameKey)
}

export function setName(name) {
  return Lockr.set(NameKey, name)
}

export function removeName() {
  return Lockr.rm(NameKey)
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

