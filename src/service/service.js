import axios from 'axios'

async function getCustomerService() {
  try {
    const response = await axios.get('/api/customers');
    // console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getEmployeeService() {
  try {
    const response = await axios.get('/api/employees');
    // console.log(response.data);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

function addCustomerService(customer) {
  try {
    axios.post('/api/customers', customer);
  } catch(error) {
    console.log(error);
  }
}

async function getCustomerDetailsService(username) {
  try {
    const response = await axios.get(`/api/customers?username=${username}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getPolicyDetailsWithMobNum(id) {
  try {
    const response = await axios.get(`/api/policies?mobileNum=${id}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getPolicyDetailsWithID(id) {
  try {
    const response = await axios.get(`/api/policies?policyId=${id}`);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function postLoginType(loginType) {
  try {
    const response = await axios.post(`/api/loginWith`, loginType)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function getLoginType() {
  try {
    const response = await axios.get(`/api/loginWith`)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function deleteLoginType(id){
  try{
    const response = await axios.delete(`/api/loginWith/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function postSearchValue(searchVal) {
  try {
    const response = await axios.post(`/api/searchWith`, searchVal)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function getSearchValue() {
  try {
    const response = await axios.get(`/api/searchWith`)
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function deleteSearchValue(id){
  try{
    const response = await axios.delete(`/api/searchWith/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function getRegisteredCards(mobileNum){
  try {
    const response = await axios.get(`/api/registeredCards?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getRegisteredCardWithId(id){
  try {
    const response = await axios.get(`/api/registeredCards/${id}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getLostWalletRecords(mobileNum){
  try {
    const response = await axios.get(`/api/lostWalletRecords?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getPolicies(){
  try{
    const response = await axios.get(`/api/policies`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getAllClaims(){
  try {
    const response = await axios.get(`/api/claimsHistory`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getClaimsHistory(mobileNum){
  try {
    const response = await axios.get(`/api/claimsHistory?mobileNum=${mobileNum}`);
    return response.data;
  } catch(error){
    console.log(error);
  }
}

async function getFamilyMembers(mobileNum){
  try {
    const response = await axios.get(`/api/familyMembers?familyHeadMobileNum=${mobileNum}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

async function deleteRegisteredCard(id){
  try{
    const response = await axios.delete(`/api/registeredCards/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function deleteFamilyMember(id){
  try{
    const response = await axios.delete(`/api/familyMembers/${id}`)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateRegisteredCard(id , updatedRegisteredCard){
  try{
    const response = await axios.put(`/api/registeredCards/${id}`, updatedRegisteredCard)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateFamilyMember(id, updatedFamilyMember){
  try{
    const response = await axios.put(`/api/familyMembers/${id}`, updatedFamilyMember)
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateNotifiedTimestampForClaim(id, updatedClaim){
  try {
    const response = await axios.put(`/api/claimsHistory/${id}`, updatedClaim);
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function updateClaimStatus(id, updatedClaim){
  try {
    const response = await axios.put(`/api/claimsHistory/${id}`, updatedClaim);
    return response.statusText;
  }catch(error){
    console.log(error);
  }
}

async function addRegisteredCard(newCardToAdd) {
  try {
    const response = await axios.post(`/api/registeredCards`, newCardToAdd)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function addFamilyMember(newFamilyMember) {
  try {
    const response = await axios.post(`/api/familyMembers`, newFamilyMember)
    return response.statusText;
  } catch(error) {
    console.log(error);
  }
}

async function addLostWalletRecord(newLostWalletRecord) {
  try {
    const response = await axios.post(`/api/lostWalletRecords`, newLostWalletRecord)
    return response;
  } catch(error) {
    console.log(error);
  }
}

async function addClaim(newClaim) {
  try {
    const response = await axios.post(`/api/claimsHistory`, newClaim)
    return response;
  } catch(error) {
    console.log(error);
  }
}

function addPreCustomer(customer) {
  try {
    axios.post('/api/preCustomer', customer);
  } catch(error) {
    console.log(error);
  }
}

async function getPreCustomer() {
  try {
    const response = await axios.get('/api/preCustomer');
    return response.data;
  } catch(error) {
    console.log(error);
  }
}

async function addPolicy(policy) {
  try {
    await axios.post('/api/policies', policy);
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
  getAllClaims,
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
  updateClaimStatus,
  deleteRegisteredCard, 
  deleteFamilyMember,
  addPreCustomer,
  getPreCustomer,
  addPolicy
}