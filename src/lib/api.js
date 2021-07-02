import axios from 'axios'
// import jwt from 'jsonwebtoken'
import { getToken } from './auth'
import { baseUrl } from '../config'
import { getUserId } from './auth'



function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getAllItems() {
  console.log(baseUrl)
  return axios.get(`${baseUrl}/items`)
}

export function getAllRecipes() {
  console.log(baseUrl)
  return axios.get(`${baseUrl}/recipes`)
}

export function register(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function getAllPersonalisedRecipes(){
  const userId = getUserId()
  return axios.get(`${baseUrl}/${userId}/recipes`, headers())
}

export function createInventoryItem(itemId, formdata) {
  const userId = getUserId()
  return axios.post(`${baseUrl}/${userId}/items/${itemId}`, formdata, headers())
}

export function toggleShareStatus(inventoryItemId, status) {
  const userId = getUserId()
  return axios.put(`${baseUrl}/${userId}/items/${inventoryItemId}`, { isShared: status }, headers())
}

export function deletePersonalisedItem(inventoryItemId) {
  const userId = getUserId()
  return axios.delete(`${baseUrl}/${userId}/items/${inventoryItemId}`, headers())
}

export function editPersonalisedItem(inventoryItemId, newQuantity) {
  const userId = getUserId()
  return axios.put(`${baseUrl}/${userId}/items/${inventoryItemId}`, newQuantity, headers())
}

export function getPersonalisedItem(inventoryItemId){
  const userId = getUserId()
  return axios.get(`${baseUrl}/${userId}/items/${inventoryItemId}`, headers())
}

export function login(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

export function getSharedInventoryItems() {
  return axios.get(`${baseUrl}/inventoryitemsmap`, headers())
}

export function getAllInventoryItems() {
  const userId = getUserId()
  return axios.get(`${baseUrl}/${userId}/items`, headers())
}

