
import Lockr from 'lockr'


const TokenKey = 'Admin-Token'
const NameKey = 'Admin-Name'
const AvatarKey = 'Admin-Avatar'
const UseridKey = 'Admin-Userid'

const voicetypeKey = 'voicetype-c'
const autoplay_timeKey = 'autoplay_time-c'
const autoplay_repeatKey = 'autoplay_repeat-c'
const shiyi_isshowKey = 'shiyi_isshow-c'

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



export function getVoicetype() {
  return Lockr.get(voicetypeKey)
}

export function setVoicetype(name) {
  return Lockr.set(voicetypeKey, name)
}

export function getAutoplay_time() {
  return Lockr.get(autoplay_timeKey)
}

export function setAutoplay_time(name) {
  return Lockr.set(autoplay_timeKey, name)
}

export function getAutoplay_repeat() {
  return Lockr.get(autoplay_repeatKey)
}

export function setAutoplay_repeat(name) {
  return Lockr.set(autoplay_repeatKey, name)
}

export function getshiyi_isshow() {
  return Lockr.get(shiyi_isshowKey)
}

export function setshiyi_isshow(name) {
  return Lockr.set(shiyi_isshowKey, name)
}