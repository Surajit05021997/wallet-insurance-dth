import axios from 'axios'

async function getCustomerService() {
  try {
    const response = await axios.get('http://localhost:3001/customers');
    // console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getEmployeeService() {
  try {
    const response = await axios.get('http://localhost:3001/employees');
    // console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

function addCustomerService(customer) {
  try {
    axios.post('http://localhost:3001/customers', customer);
  } catch(error) {
    console.log(error);
  }
}

async function getCustomerDetailsService(username) {
  try {
    const response = await axios.get(`http://localhost:3001/customers?username=${username}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getPolicyDetailsWithMobNum(id) {
  try {
    const response = await axios.get(`http://localhost:3001/policies?mobileNum=${id}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getPolicyDetailsWithID(id) {
  try {
    const response = await axios.get(`http://localhost:3001/policies?policyId=${id}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function postLoginType(loginType) {
  try {
    const response = await axios.post(`http://localhost:3001/loginWith`, loginType)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getLoginType() {
  try {
    const response = await axios.get(`http://localhost:3001/loginWith`)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function deleteLoginType(id){
  try{
    const response = await axios.delete(`http://localhost:3001/loginWith/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function postSearchValue(searchVal) {
  try {
    const response = await axios.post(`http://localhost:3001/searchWith`, searchVal)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function getSearchValue() {
  try {
    const response = await axios.get(`http://localhost:3001/searchWith`)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function deleteSearchValue(id){
  try{
    const response = await axios.delete(`http://localhost:3001/searchWith/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function getRegisteredCards(mobileNum){
  try {
    const response = await axios.get(`http://localhost:3001/registeredCards?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getRegisteredCardWithId(id){
  try {
    const response = await axios.get(`http://localhost:3001/registeredCards/${id}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getLostWalletRecords(mobileNum){
  try {
    const response = await axios.get(`http://localhost:3001/lostWalletRecords?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getPolicies(){
  try{
    const response = await axios.get(`http://localhost:3001/policies`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getClaimsHistory(mobileNum){
  try {
    const response = await axios.get(`http://localhost:3001/claimsHistory?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getFamilyMembers(mobileNum){
  try {
    const response = await axios.get(`http://localhost:3001/familyMembers?familyHeadMobileNum=${mobileNum}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

async function deleteRegisteredCard(id){
  try{
    const response = await axios.delete(`http://localhost:3001/registeredCards/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function deleteFamilyMember(id){
  try{
    const response = await axios.delete(`http://localhost:3001/familyMembers/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateRegisteredCard(id , updatedRegisteredCard){
  try{
    const response = await axios.put(`http://localhost:3001/registeredCards/${id}`, updatedRegisteredCard)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateFamilyMember(id, updatedFamilyMember){
  try{
    const response = await axios.put(`http://localhost:3001/familyMembers/${id}`, updatedFamilyMember)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateNotifiedTimestampForClaim(id, updatedClaim){
  try {
    const response = await axios.put(`http://localhost:3001/claimsHistory/${id}`, updatedClaim);
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function addRegisteredCard(newCardToAdd) {
  try {
    const response = await axios.post(`http://localhost:3001/registeredCards`, newCardToAdd)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function addFamilyMember(newFamilyMember) {
  try {
    const response = await axios.post(`http://localhost:3001/familyMembers`, newFamilyMember)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function addLostWalletRecord(newLostWalletRecord) {
  try {
    const response = await axios.post(`http://localhost:3001/lostWalletRecords`, newLostWalletRecord)
    return response;
  } catch(error) {
    console.log(error);
  }
}

async function addClaim(newClaim) {
  try {
    const response = await axios.post(`http://localhost:3001/claimsHistory`, newClaim)
    return response;
  } catch(error) {
    console.log(error);
  }
}

function addPreCustomer(customer) {
  try {
    axios.post('http://localhost:3001/preCustomer', customer);
  } catch(error) {
    console.log(error);
  }
}

async function getPreCustomer() {
  try {
    const response = await axios.get('http://localhost:3001/preCustomer');
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function addPolicy(policy) {
  try {
    await axios.post('http://localhost:3001/policies', policy);
  } catch(error) {
    console.log(error);
  }
}

export { 
  getCustomerService,
  getEmployeeService, 
  addCustomerService, 
  getCustomerDetailsService, 
  getPolicyDetailsWithID,
  getPolicyDetailsWithMobNum,
  postLoginType,
  deleteLoginType,
  postSearchValue,
  getSearchValue,
  deleteSearchValue,
  getLoginType,
  getRegisteredCards,
  getRegisteredCardWithId,
  getLostWalletRecords, 
  getClaimsHistory, 
  getFamilyMembers, 
  getPolicies,
  addRegisteredCard,
  addFamilyMember,
  addLostWalletRecord,
  addClaim,
  updateRegisteredCard,
  updateFamilyMember,
  updateNotifiedTimestampForClaim,
  deleteRegisteredCard, 
  deleteFamilyMember,
  addPreCustomer,
  getPreCustomer,
  addPolicy
}